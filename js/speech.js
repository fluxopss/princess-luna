/* Real family voices only. No synthesized speech or stock voice fallback. */
const Speech = (() => {
  const DB = 'princess-luna-family-voices';
  const KEYS = ['mom', 'dad', 'welcome', 'finish', 'love', 'encourage', 'mirror', 'goodnight'];
  const clips = new Map();
  const urls = new Map();
  let muted = false;
  let current = null;
  let finishTimer = 0;
  let generation = 0;
  let database = null;

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('Private browser storage is unavailable.'));
      const request = indexedDB.open(DB, 1);
      request.onupgradeneeded = () => request.result.createObjectStore('clips');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  function transaction(method, key, value) {
    return new Promise((resolve, reject) => {
      if (!database) return reject(new Error('Private browser storage is unavailable.'));
      const tx = database.transaction('clips', 'readwrite');
      const request = method === 'put'
        ? tx.objectStore('clips').put(value, key)
        : method === 'delete'
          ? tx.objectStore('clips').delete(key)
          : tx.objectStore('clips').get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function init() {
    try {
      database = await openDatabase();
      await Promise.all(KEYS.map(async (key) => {
        const blob = await transaction('get', key);
        if (blob instanceof Blob) setClip(key, blob);
      }));
      document.dispatchEvent(new Event('familyvoicesready'));
    } catch (err) {
      document.dispatchEvent(new CustomEvent('familyvoiceserror', { detail: err.message }));
    }
  }
  function setClip(key, blob) {
    if (urls.has(key)) URL.revokeObjectURL(urls.get(key));
    clips.set(key, blob);
    urls.set(key, URL.createObjectURL(blob));
  }
  async function save(key, blob) {
    if (!KEYS.includes(key) || !blob.size) throw new Error('No recording to save.');
    await transaction('put', key, blob);
    stop();
    setClip(key, blob);
    document.dispatchEvent(new Event('familyvoicesready'));
  }
  async function remove(key) {
    if (!KEYS.includes(key)) return;
    await transaction('delete', key);
    stop();
    if (urls.has(key)) URL.revokeObjectURL(urls.get(key));
    urls.delete(key);
    clips.delete(key);
    document.dispatchEvent(new Event('familyvoicesready'));
  }
  function stop() {
    generation++;
    clearTimeout(finishTimer);
    if (current) { current.pause(); current.currentTime = 0; current = null; }
  }
  function setMuted(value) {
    muted = !!value;
    if (muted) stop();
    Sounds.setMuted(muted);
  }
  function resolveKey(path, text, who) {
    if (who === 'mom' || who === 'dad') return who;
    if (path && path.includes('01-welcome')) return 'welcome';
    if (path && path.includes('11-finish')) return 'finish';
    if (path && path.includes('09-great-job')) return 'encourage';
    if (/mommy and daddy.*love|we love you/i.test(text || '')) return 'love';
    return null;
  }
  function speak(path, caption, opts = {}) {
    stop();
    const seq = generation;
    const done = () => {
      if (seq === generation && opts.onEnded) opts.onEnded();
    };
    const key = opts.voiceKey || resolveKey(path, caption, opts.who);
    if (!muted && key && urls.has(key)) {
      const audio = new Audio(urls.get(key));
      current = audio;
      audio.onended = done;
      audio.onerror = () => { current = null; done(); };
      try {
        const play = audio.play();
        if (play && play.catch) play.catch(() => { current = null; done(); });
      } catch (_) { current = null; done(); }
    } else {
      // Keep game progression working even before parents record the lines.
      finishTimer = setTimeout(done, 350);
    }
  }
  function speakAs(who, text, opts = {}) {
    speak(null, text, { ...opts, who });
  }
  return {
    init, unlock: async () => {}, preload: () => {}, speak, speakAs, stop,
    setMuted, isMuted: () => muted, save, remove,
    getClip: (key) => clips.get(key), hasClip: (key) => clips.has(key),
    getUrl: (key) => urls.get(key), KEYS,
  };
})();
window.Speech = Speech;
