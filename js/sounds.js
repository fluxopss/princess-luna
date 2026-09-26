/* Kit SFX + voice playback — preload after first iPad tap */

const Sounds = (() => {
  const BASE = "assets/";
  const sfxPaths = {
    tap: "sfx/tap-pop.mp3",
    place: "sfx/place-chime.mp3",
    sparkle: "sfx/sparkle.mp3",
    whoosh: "sfx/snow-whoosh.mp3",
    soft: "sfx/try-again-soft.mp3",
    cheer: "sfx/celebrate-fanfare.mp3",
  };

  /** @type {Record<string, HTMLAudioElement>} */
  const cache = {};
  let muted = false;
  let quiet = false;
  let unlocked = false;

  function makeAudio(rel) {
    const a = new Audio(BASE + rel);
    a.preload = "auto";
    return a;
  }

  function preload() {
    Object.entries(sfxPaths).forEach(([key, path]) => {
      if (!cache[key]) cache[key] = makeAudio(path);
    });
  }

  async function unlock() {
    preload();
    unlocked = true;
    // Silent kick so iOS allows later plays
    try {
      const kick = cache.tap || makeAudio(sfxPaths.tap);
      kick.volume = 0.001;
      await kick.play();
      kick.pause();
      kick.currentTime = 0;
      kick.volume = 1;
    } catch (_) {
      /* ignore */
    }
  }

  function setMuted(value) {
    muted = !!value;
  }

  function setQuiet(value) { quiet = !!value; }
  function isQuiet() { return quiet; }

  function isMuted() {
    return muted;
  }

  function play(key, volume = 1) {
    if (!unlocked || muted || (quiet && key === 'cheer')) return;
    const src = cache[key] || (sfxPaths[key] ? makeAudio(sfxPaths[key]) : null);
    if (!src) return;
    cache[key] = src;
    try {
      const clip = src.cloneNode(true);
      clip.volume = volume * (quiet ? 0.25 : 1);
      clip.play().catch(() => {});
    } catch (_) {
      /* ignore */
    }
  }

  function tap() {
    play("tap", 0.85);
  }

  function place() {
    play("place", 0.9);
  }

  function sparkle() {
    play("sparkle", 0.75);
  }

  function whoosh() {
    play("whoosh", 0.8);
  }

  function cheer() {
    play("cheer", 0.95);
  }

  function soft() {
    play("soft", 0.7);
  }

  return {
    unlock,
    preload,
    setMuted,
    isMuted,
    setQuiet,
    isQuiet,
    tap,
    place,
    sparkle,
    whoosh,
    cheer,
    soft,
    play,
  };
})();

window.Sounds = Sounds;
