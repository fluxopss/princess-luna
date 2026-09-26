/* Parent-only on-device voice studio. Recordings never leave this browser. */
const FamilyVoices = (() => {
  const LINES = [
    ['dad', 'Daddy', 'Daddy loves you, Luna. Daddy is always here.'],
    ['mom', 'Mommy', 'Mommy loves you, Luna. Mommy is always here.'],
    ['welcome', 'Snowman welcome', 'Hi Luna! Let’s build a snowman!'],
    ['finish', 'Celebration', 'You did it, Luna! Mommy and Daddy are always here!'],
    ['love', 'Always loved', 'We love you, Luna. Always and forever.'],
    ['encourage', 'Great job', 'Great job, Luna!'],
    ['mirror', 'Princess Mirror', 'Look at you, Princess Luna!'],
    ['goodnight', 'Moonlight hug', 'Mommy and Daddy love you, Luna. Always and forever.'],
  ];
  let media = null;
  let stream = null;
  let activeKey = null;
  let timer = 0;
  const panel = () => document.getElementById('voiceStudio');
  const status = () => document.getElementById('voiceStatus');
  const board = () => document.getElementById('voiceBoard');

  function setStatus(message) { status().textContent = message; }
  function refresh() {
    if (!board()) return;
    board().replaceChildren();
    LINES.forEach(([key, name, words]) => {
      const card = document.createElement('div');
      card.className = 'voice-card';
      const title = document.createElement('strong');
      title.textContent = name + (Speech.hasClip(key) ? '  •  Saved' : '  •  Not recorded');
      const quote = document.createElement('p');
      quote.textContent = 'Say: “' + words + '”';
      const actions = document.createElement('div');
      actions.className = 'voice-actions';
      const record = document.createElement('button');
      record.type = 'button';
      record.textContent = activeKey === key ? 'Stop & save' : 'Record';
      record.disabled = !!activeKey && activeKey !== key;
      record.addEventListener('click', () => activeKey === key ? finish() : recordClip(key));
      actions.appendChild(record);
      const restore = document.createElement('button');
      restore.type = 'button';
      restore.textContent = Speech.hasClip(key) ? 'Replace from backup' : 'Restore recording';
      const upload = document.createElement('input');
      upload.type = 'file';
      upload.accept = 'audio/*,.m4a,.mp3,.webm';
      upload.hidden = true;
      restore.addEventListener('click', () => upload.click());
      upload.addEventListener('change', async () => {
        const file = upload.files && upload.files[0];
        if (!file) return;
        if (file.size > 10000000 || !(/^audio\//.test(file.type) || /\.(m4a|mp3|webm|mp4)$/i.test(file.name))) {
          setStatus('Choose an audio backup smaller than 10 MB.');
          upload.value = '';
          return;
        }
        try {
          await Speech.save(key, file);
          setStatus(name + ' recording restored on this device. Tap Listen to check it.');
        } catch (err) { setStatus('Could not restore: ' + err.message); }
        upload.value = '';
      });
      actions.appendChild(restore);
      if (Speech.hasClip(key)) {
        const play = document.createElement('button');
        play.type = 'button';
        play.textContent = 'Listen';
        play.addEventListener('click', () => Speech.speak(null, words, { who: key === 'dad' || key === 'mom' ? key : 'luna', voiceKey: key }));
        const download = document.createElement('a');
        download.textContent = 'Back up';
        download.href = Speech.getUrl(key);
        download.download = 'luna-' + key + (Speech.getClip(key).type.includes('mp4') ? '.m4a' : Speech.getClip(key).type.includes('mpeg') ? '.mp3' : '.webm');
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Delete';
        remove.addEventListener('click', async () => {
          try { await Speech.remove(key); setStatus(name + ' recording deleted.'); }
          catch (err) { setStatus(err.message); }
        });
        actions.append(play, download, remove);
      }
      card.append(title, quote, actions, upload);
      board().append(card);
    });
  }
  function release() {
    clearTimeout(timer);
    if (stream) stream.getTracks().forEach(track => track.stop());
    stream = null;
    media = null;
    activeKey = null;
    refresh();
  }
  async function recordClip(key) {
    if (activeKey) return;
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setStatus('Microphone recording needs Safari over HTTPS. You can still play without voices.');
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const types = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'];
      const mimeType = types.find(type => MediaRecorder.isTypeSupported(type));
      media = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      activeKey = key;
      const pieces = [];
      media.ondataavailable = e => { if (e.data.size) pieces.push(e.data); };
      media.onstop = async () => {
        const blob = new Blob(pieces, { type: media && media.mimeType || mimeType || 'audio/mp4' });
        try {
          await Speech.save(key, blob);
          setStatus('Saved on this iPad. Tap Listen to check it, then Back up to keep a copy.');
        } catch (err) { setStatus('Not saved: ' + err.message); }
        finally { release(); }
      };
      media.onerror = () => { setStatus('Recording failed. Please try again.'); release(); };
      media.start();
      setStatus('Recording now. Speak warmly, then tap Stop & save. Maximum 15 seconds.');
      refresh();
      timer = setTimeout(finish, 15000);
    } catch (_) {
      setStatus('Microphone permission was not granted. Allow it in Safari settings, then try again.');
      release();
    }
  }
  function finish() {
    clearTimeout(timer);
    if (media && media.state === 'recording') media.stop();
  }
  function open() {
    Speech.stop();
    panel().hidden = false;
    refresh();
    setStatus('Recordings stay in this browser, not on a server. Back up each one after recording.');
  }
  function close() {
    if (activeKey) finish();
    panel().hidden = true;
    Speech.stop();
  }
  function init() {
    document.getElementById('closeStudio').addEventListener('click', close);
    document.getElementById('studioMute').addEventListener('click', e => {
      Speech.setMuted(!Speech.isMuted());
      e.currentTarget.textContent = Speech.isMuted() ? 'Unmute game' : 'Mute game';
    });
    document.getElementById('studioQuiet').addEventListener('click', e => {
      Sounds.setQuiet(!Sounds.isQuiet());
      e.currentTarget.textContent = Sounds.isQuiet() ? 'Quiet bedtime mode: on' : 'Quiet bedtime mode: off';
      e.currentTarget.setAttribute('aria-pressed', String(Sounds.isQuiet()));
      document.body.classList.toggle('quiet-mode', Sounds.isQuiet());
      setStatus(Sounds.isQuiet() ? 'Gentle sounds and stiller snow. Family voices stay on.' : 'Play sounds are back to normal.');
    });
    document.addEventListener('familyvoicesready', refresh);
    document.addEventListener('familyvoiceserror', e => setStatus('Recording storage unavailable: ' + e.detail));
    refresh();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  return { open, close };
})();
window.FamilyVoices = FamilyVoices;
