/* Princess Luna's Snow Kingdom. Hand-authored play, no generated dialogue. */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const INITIAL = { crown: 'ice', cape: 'blue', snowflakes: 0, friend: false, windows: [], worlds: [] };
  let state = { ...INITIAL };
  let db = null;
  let place = 'castle';
  let drawing = false;
  let lastDot = 0;
  let wandTimer = 0;
  let wandHeld = false;
  const places = { castle: 'Your castle is waiting, Luna!', mirror: 'Pick a crown, Luna!', stars: 'Your love lights up the sky.' };

  function announce(text) {
    $('#kingdomStatus').textContent = text;
    const screen = place === 'castle' ? '#castleMessage' : place === 'mirror' ? '#mirrorMessage' : '#starsMessage';
    $(screen).textContent = text;
    $('#said').textContent = text;
  }
  function persist() {
    if (!db) return;
    try { db.transaction('state', 'readwrite').objectStore('state').put(state, 'castle'); }
    catch (_) { /* Play continues if browser storage is unavailable. */ }
  }
  function load() {
    if (!window.indexedDB) return;
    try {
      const request = indexedDB.open('princess-luna-kingdom', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('state');
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction('state', 'readonly');
        const get = tx.objectStore('state').get('castle');
        get.onsuccess = () => {
          if (get.result && typeof get.result === 'object') {
            state = {
              ...INITIAL, ...get.result,
              windows: Array.isArray(get.result.windows) ? get.result.windows.filter(x => ['one', 'two', 'three'].includes(x)) : [],
              snowflakes: Math.max(0, Math.min(8, Number(get.result.snowflakes) || 0)),
              worlds: Array.isArray(get.result.worlds) ? get.result.worlds.filter(x => ['snowman', 'reindeer', 'snow', 'learn'].includes(x)) : [],
            };
            if (!['ice', 'gold', 'rose'].includes(state.crown)) state.crown = 'ice';
            if (!['blue', 'pink', 'violet'].includes(state.cape)) state.cape = 'blue';
            render();
          }
        };
      };
    } catch (_) { /* Session-only play is still available. */ }
  }
  function keepsakes() {
    return state.snowflakes + state.windows.length + (state.friend ? 1 : 0) + state.worlds.length + 1;
  }
  function render() {
    $('#mirrorPortrait').dataset.crown = state.crown;
    $('#mirrorPortrait').dataset.cape = state.cape;
    $('#castleScene').dataset.crown = state.crown;
    $('#keepsakeCount').textContent = String(keepsakes());
    $$('.wardrobe-pick[data-crown]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.crown === state.crown)));
    $$('.wardrobe-pick[data-cape]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cape === state.cape)));
    $$('.castle-window').forEach(b => b.classList.toggle('lit', state.windows.includes(b.dataset.window)));
    $('#castleScene').classList.toggle('lit', state.windows.length === 3);
    $('#castleFriend').classList.toggle('is-friend', state.friend);
    const trophies = $('#worldKeepsakes');
    trophies.replaceChildren();
    const art = { snowman: 'assets/characters/snowman-complete.png', reindeer: 'assets/characters/baby-reindeer.png', snow: 'assets/ui/snowflake.svg', learn: 'assets/ui/star-burst.svg' };
    state.worlds.forEach(kind => {
      const badge = document.createElement('span');
      badge.className = 'world-keepsake';
      badge.dataset.kind = kind;
      badge.setAttribute('aria-label', `${kind} world keepsake`);
      const picture = document.createElement('img');
      picture.src = art[kind]; picture.alt = '';
      badge.appendChild(picture);
      trophies.appendChild(badge);
    });
    const field = $('#constellation');
    field.replaceChildren();
    const n = Math.max(1, keepsakes());
    for (let i = 0; i < n; i++) {
      const star = document.createElement('span');
      star.className = 'constellation-star';
      star.style.left = `${8 + ((i * 37 + 9) % 83)}%`;
      star.style.top = `${23 + ((i * 29 + 13) % 66)}%`;
      field.appendChild(star);
    }
  }
  function show(next) {
    place = next;
    $$('.kingdom-panel').forEach(panel => { panel.hidden = panel.dataset.panel !== next; });
    $$('.kingdom-tab').forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.place === next)));
    announce(places[next]);
    Sounds.sparkle();
  }
  function open() {
    $('#homeScreen').hidden = true;
    $('#kingdomScreen').hidden = false;
    document.body.classList.add('princess-open');
    render();
    show('castle');
  }
  function home() {
    Speech.stop();
    $('#kingdomScreen').hidden = true;
    $('#homeScreen').hidden = false;
    document.body.classList.remove('princess-open');
    Sounds.tap();
  }
  function burst() {
    const layer = $('#mirrorSparkles');
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('span');
      dot.className = 'magic-dot';
      dot.style.left = `${10 + Math.random() * 80}%`;
      dot.style.top = `${10 + Math.random() * 70}%`;
      layer.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
    }
  }
  function snowMagic() {
    state.snowflakes = Math.min(8, state.snowflakes + 1);
    persist(); render(); burst(); Sounds.sparkle();
    announce('Your snowflake is in the castle, Princess Luna!');
  }
  function addDot(event) {
    const board = $('#magicCanvas');
    const bounds = board.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.className = 'magic-dot';
    dot.style.left = `${event.clientX - bounds.left - 8}px`;
    dot.style.top = `${event.clientY - bounds.top - 8}px`;
    board.appendChild(dot);
    setTimeout(() => dot.remove(), 950);
  }
  function init() {
    $('#goPrincess').addEventListener('click', open);
    $('#kingdomHome').addEventListener('click', home);
    $$('.kingdom-tab').forEach(tab => tab.addEventListener('click', () => show(tab.dataset.place)));
    $$('[data-go]').forEach(button => button.addEventListener('click', () => show(button.dataset.go)));
    $$('.wardrobe-pick[data-crown]').forEach(button => button.addEventListener('click', () => {
      state.crown = button.dataset.crown;
      persist(); render(); burst(); Sounds.place();
      announce('Look at you, Princess Luna!');
      Speech.speak(null, 'Look at you, Princess Luna!', { voiceKey: 'mirror' });
    }));
    $$('.wardrobe-pick[data-cape]').forEach(button => button.addEventListener('click', () => {
      state.cape = button.dataset.cape;
      persist(); render(); Sounds.place();
      announce(`${button.getAttribute('aria-label')} for Princess Luna!`);
    }));
    const wand = $('#wandButton');
    wand.addEventListener('pointerdown', () => {
      wandHeld = false;
      clearTimeout(wandTimer);
      wandTimer = setTimeout(() => {
        wandHeld = true;
        $('#castleScene').classList.add('lit');
        Sounds.sparkle(); burst();
        announce('You lit up the castle, Luna!');
      }, 650);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(event => wand.addEventListener(event, () => clearTimeout(wandTimer)));
    wand.addEventListener('click', () => {
      if (wandHeld) { wandHeld = false; return; }
      snowMagic();
    });
    const board = $('#magicCanvas');
    board.addEventListener('pointerdown', event => {
      drawing = true; lastDot = 0;
      board.setPointerCapture(event.pointerId);
      addDot(event);
    });
    board.addEventListener('pointermove', event => {
      if (!drawing || performance.now() - lastDot < 38) return;
      lastDot = performance.now(); addDot(event);
    });
    const finishTrail = () => { if (!drawing) return; drawing = false; snowMagic(); };
    board.addEventListener('pointerup', finishTrail);
    board.addEventListener('pointercancel', () => { drawing = false; });
    $$('.castle-window').forEach(button => button.addEventListener('click', () => {
      const key = button.dataset.window;
      state.windows = state.windows.includes(key) ? state.windows.filter(x => x !== key) : [...state.windows, key];
      persist(); render(); Sounds.sparkle();
      announce(state.windows.length === 3 ? 'All the castle windows glow for you!' : 'You made a window shine, Luna!');
    }));
    $('#castleFriend').addEventListener('click', () => {
      state.friend = true; persist(); render();
      const friend = $('#castleFriend');
      friend.classList.remove('nuzzle'); void friend.offsetWidth; friend.classList.add('nuzzle');
      Sounds.soft(); announce('Your reindeer friend loves a gentle pet!');
    });
    $('#castleSnowflake').addEventListener('click', snowMagic);
    $('#castleCrown').addEventListener('click', () => show('mirror'));
    $('#goodnightButton').addEventListener('click', () => {
      announce('Mommy and Daddy love you, Luna. Always and forever.');
      Speech.speak(null, 'Mommy and Daddy love you, Luna. Always and forever.', { voiceKey: 'goodnight' });
      burst();
    });
    $$('#kingdomScreen [data-who]').forEach(button => button.addEventListener('click', () => {
      announce(button.dataset.who === 'dad' ? 'Daddy loves you, Luna.' : 'Mommy loves you, Luna.');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !$('#kingdomScreen').hidden) home();
    });
    window.addEventListener('lunakeepsake', event => {
      const kind = event.detail && event.detail.kind;
      if (!['snowman', 'reindeer', 'snow', 'learn'].includes(kind) || state.worlds.includes(kind)) return;
      state.worlds.push(kind);
      persist(); render();
    });
    load(); render();
    window.LunaKingdom = { open, home, getState: () => ({ ...state, windows: [...state.windows] }) };
    window.render_game_to_text = () => JSON.stringify({
      screen: $('#kingdomScreen').hidden ? ($('#homeScreen').hidden ? 'other game screen' : 'home') : 'kingdom',
      place, crown: state.crown, cape: state.cape, snowflakes: state.snowflakes,
      litWindows: [...state.windows], reindeerFriend: state.friend, worldKeepsakes: [...state.worlds],
      controls: $('#kingdomScreen').hidden ? [] : $$('.kingdom-panel:not([hidden]) button').map(b => b.getAttribute('aria-label') || b.textContent.trim()),
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
