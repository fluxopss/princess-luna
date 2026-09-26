/* Princess Luna's Elsa Game — tap-to-play for iPad */

(() => {
  const A = "assets/";

  const SCARF_LOOKS = [
    { filter: "", tts: "Red scarf, Luna!", snowman: "Ooh, cozy red!" },
    { filter: "look-purple", tts: "Purple scarf, Luna!", snowman: "Purple is pretty!" },
    { filter: "look-pink", tts: "Pink scarf, Luna!", snowman: "Pink and sparkly!" },
    { filter: "look-ice", tts: "Blue scarf, Luna!", snowman: "Ice blue! Brrr!" },
  ];

  const HAT_CHOICES = [
    {
      parts: ["hat"],
      preview: "snowman-pieces/top-hat.png",
      filter: "",
      tts: "Top hat, Luna!",
      line: "Put on the top hat!",
      snowman: "Fancy hat! Tip tip!",
    },
    {
      parts: ["bow"],
      preview: "ui/bow.svg",
      filter: "",
      tts: "Pretty bow, Luna!",
      line: "Put on the bow!",
      snowman: "A pretty bow for me!",
    },
  ];

  const STEPS = [
    {
      id: "big",
      parts: ["big"],
      preview: ["snowman-pieces/snowball-big.png"],
      voice: "voice/02-big-snowball.mp3",
      line: "Tap the big snowball!",
      alive: "squash",
    },
    {
      id: "middle",
      parts: ["middle"],
      preview: ["snowman-pieces/snowball-middle.png"],
      voice: "voice/03-middle-snowball.mp3",
      line: "Now the middle snowball!",
    },
    {
      id: "head",
      parts: ["head"],
      preview: ["snowman-pieces/snowball-small.png"],
      voice: "voice/04-small-snowball.mp3",
      line: "Tap the little head!",
    },
    {
      id: "eyes",
      parts: ["eyes", "eyes-2"],
      preview: ["snowman-pieces/eye-1.png", "snowman-pieces/eye-2.png"],
      voice: "voice/05-eyes.mp3",
      line: "Give him eyes!",
      alive: "eyes",
    },
    {
      id: "nose",
      parts: ["nose"],
      preview: ["snowman-pieces/carrot-nose.png"],
      voice: "voice/06-carrot-nose.mp3",
      line: "Carrot nose!",
      alive: "nose",
    },
    {
      id: "arms",
      parts: ["arms", "arms-r"],
      preview: [
        "snowman-pieces/stick-arm-left.png",
        "snowman-pieces/stick-arm-right.png",
      ],
      voice: "voice/07-stick-arms.mp3",
      line: "Stick arms!",
      alive: "arms",
    },
    {
      id: "buttons",
      parts: ["buttons"],
      preview: ["snowman-pieces/buttons.png"],
      voice: "voice/08-buttons.mp3",
      line: "Add the buttons!",
      alive: "buttons",
    },
    {
      id: "scarf",
      voice: null,
      line: "Pick a scarf!",
      tts: "Pick a scarf, Luna!",
      choices: [],
    },
    {
      id: "hat",
      voice: null,
      line: "Pick a hat!",
      tts: "Pick a hat, Luna!",
      choices: [],
    },
  ];

  const WELCOME = {
    voice: "voice/01-welcome.mp3",
    line: "Hi Luna! Let's build a snowman!",
  };

  const FINISH = {
    voice: "voice/11-finish.mp3",
    line: "You did it, Luna! Mommy and Daddy are always here!",
  };

  const LOVE_LINE = "Mommy and Daddy are always here, and they love you, Luna!";

  const GREAT_JOB = "voice/09-great-job.mp3";
  const TRY_AGAIN = "voice/10-try-again.mp3";

  const LEARN_COLORS = [
    { id: "red", label: "red", css: "#e85a5a", scarf: "" },
    { id: "purple", label: "purple", css: "#9b6bc4", scarf: "look-purple" },
    { id: "pink", label: "pink", css: "#f06aa4", scarf: "look-pink" },
    { id: "blue", label: "blue", css: "#5eb6e8", scarf: "look-ice" },
  ];

  const LEARN_LETTERS = [
    {
      letter: "L",
      decoys: ["S", "C", "R"],
      prompt: "Find the letter L for Luna!",
      win: "L is for Luna!",
    },
    {
      letter: "S",
      decoys: ["L", "C", "M"],
      prompt: "Find the letter S for snow!",
      win: "S is for snow!",
    },
    {
      letter: "C",
      decoys: ["L", "S", "R"],
      prompt: "Find the letter C for carrot!",
      win: "C is for carrot!",
    },
    {
      letter: "R",
      decoys: ["L", "S", "C"],
      prompt: "Find the letter R for reindeer!",
      win: "R is for reindeer!",
    },
  ];

  const COUNT_KINDS = [
    {
      id: "carrot",
      src: "ui/carrot.svg",
      word: "carrots",
      who: "reindeer",
      cheer: "Yummy counting!",
    },
    {
      id: "snow",
      src: "ui/snowflake.svg",
      word: "snowflakes",
      who: "luna",
      cheer: "Sparkly counting!",
    },
    {
      id: "star",
      src: "ui/star-burst.svg",
      word: "stars",
      who: "luna",
      cheer: "Twinkle counting!",
    },
  ];

  const SNOWMAN_LINES = [
    { who: "snowman", text: "Brrr! Hi Luna!" },
    { who: "snowman", text: "I love hugs!" },
    { who: "snowman", text: "Hee hee! Tickle me!" },
    { who: "snowman", text: "Mommy and Daddy love you!" },
    { who: "snowman", text: "Want to build with me?" },
    { who: "snowman", text: "Snow hugs forever!" },
    { who: "luna", text: "Aww, he likes you, Luna!" },
  ];

  const SNOWMAN_PART_LINES = {
    nose: [
      { who: "snowman", text: "Boop! My carrot nose!" },
      { who: "luna", text: "Boop the nose, Luna!" },
    ],
    hat: [
      { who: "snowman", text: "Tip my fancy hat!" },
      { who: "snowman", text: "How do I look?" },
    ],
    bow: [
      { who: "snowman", text: "My pretty bow!" },
      { who: "luna", text: "So cute, Luna!" },
    ],
    buttons: [
      { who: "snowman", text: "Click click! My buttons!" },
      { who: "snowman", text: "Three shiny buttons!" },
    ],
    scarf: [
      { who: "snowman", text: "So warm and cozy!" },
      { who: "luna", text: "Snuggly scarf, Luna!" },
    ],
    arms: [
      { who: "snowman", text: "Wave wave!" },
      { who: "snowman", text: "High five!" },
    ],
    "arms-r": [
      { who: "snowman", text: "Wiggle wiggle!" },
      { who: "snowman", text: "Hello, Luna!" },
    ],
    eyes: [
      { who: "snowman", text: "I see you, Luna!" },
      { who: "luna", text: "He can see you!" },
    ],
    "eyes-2": [
      { who: "snowman", text: "Peek-a-boo!" },
      { who: "snowman", text: "Blink blink!" },
    ],
    head: [
      { who: "snowman", text: "Pat my head!" },
      { who: "snowman", text: "Soft snow head!" },
    ],
    middle: [
      { who: "snowman", text: "Round and soft!" },
      { who: "luna", text: "Squish!" },
    ],
    big: [
      { who: "snowman", text: "Big snow tummy!" },
      { who: "snowman", text: "Hug my tummy!" },
    ],
  };

  const REINDEER_LINES = [
    "Mmm, carrots please!",
    "Nuzzle nuzzle! Hi Luna!",
    "I love you, Luna!",
    "Mommy and Daddy love you too!",
    "My tummy is happy!",
    "Want to play in the snow?",
    "Soft nose kisses!",
  ];

  const REINDEER_THANKS = [
    "Yum yum! Thank you, Luna!",
    "Crunchy carrot! More please!",
    "Delicious! You are kind!",
    "Nom nom! Best friend!",
  ];

  const SNOW_LINES = [
    { who: "luna", text: "Make it snow, Luna!" },
    { who: "luna", text: "Wow! Sparkly snow!" },
    { who: "luna", text: "Snow magic, Luna!" },
    { who: "luna", text: "Mommy and Daddy love snow days!" },
    { who: "luna", text: "Catch a snowflake!" },
    { who: "luna", text: "Brrr! Cozy and fun!" },
  ];

  const STAR_LINES = [
    { who: "luna", text: "You found a star, Luna!" },
    { who: "luna", text: "Sparkle star!" },
    { who: "luna", text: "Twinkle twinkle!" },
    { who: "luna", text: "Magic star for Luna!" },
  ];

  const MAGIC_LINES = [
    { who: "luna", text: "Snow magic! Whoosh!" },
    { who: "luna", text: "Sparkles everywhere!" },
    { who: "snowman", text: "Ooh, magic tickles!" },
    { who: "luna", text: "Princess power!" },
  ];

  const IDLE_CHAT = {
    build: [
      { who: "luna", text: "Tap the picture, Luna!" },
      { who: "snowman", text: "I am waiting!" },
      { who: "luna", text: "You can do it!" },
    ],
    feed: [
      { who: "reindeer", text: "Carrots, please!" },
      { who: "luna", text: "Tap a carrot, Luna!" },
      { who: "reindeer", text: "Hungry tummy!" },
    ],
    snow: [
      { who: "luna", text: "Tap the big snowflake, Luna!" },
      { who: "luna", text: "Make a blizzard!" },
      { who: "luna", text: "Draw sparkles with your finger!" },
    ],
  };

  const LUNA_PHOTOS = [
    { src: "assets/family/luna.jpg", pos: "center 22%" },
    { src: "assets/family/luna-smile.jpg", pos: "74% 28%" },
    { src: "assets/family/luna-wings.jpg", pos: "center 18%" },
  ];

  const YUMS = ["Yum!", "Crunch!", "Yummy carrot!", "Hee hee!", "Nom nom!"];

  const els = {
    startScreen: document.getElementById("startScreen"),
    homeScreen: document.getElementById("homeScreen"),
    gameScreen: document.getElementById("gameScreen"),
    playBtn: document.getElementById("playBtn"),
    heroLuna: document.getElementById("heroLuna"),
    lunaBtn: document.getElementById("lunaBtn"),
    bubbleText: document.getElementById("bubbleText"),
    bubblePic: document.getElementById("bubblePic"),
    loveRow: document.getElementById("loveRow"),
    pieceBtn: document.getElementById("pieceBtn"),
    piecePreview: document.getElementById("piecePreview"),
    choiceRow: document.getElementById("choiceRow"),
    partyBar: document.getElementById("partyBar"),
    hugBtn: document.getElementById("hugBtn"),
    againBtn: document.getElementById("againBtn"),
    moreBtn: document.getElementById("moreBtn"),
    snowMoreBtn: document.getElementById("snowMoreBtn"),
    snowmanBtn: document.getElementById("snowmanBtn"),
    snowmanStack: document.getElementById("snowmanStack"),
    reindeerBtn: document.getElementById("reindeerBtn"),
    feedLayer: document.getElementById("feedLayer"),
    feedDeerBtn: document.getElementById("feedDeerBtn"),
    carrotField: document.getElementById("carrotField"),
    snowLayer: document.getElementById("snowLayer"),
    snowBtn: document.getElementById("snowBtn"),
    snow: document.getElementById("snow"),
    burst: document.getElementById("burst"),
    said: document.getElementById("said"),
    parentZone: document.getElementById("parentZone"),
    parentToast: document.getElementById("parentToast"),
    goBuild: document.getElementById("goBuild"),
    goFeed: document.getElementById("goFeed"),
    goSnow: document.getElementById("goSnow"),
    goLearn: document.getElementById("goLearn"),
    starField: document.getElementById("starField"),
    starCount: document.getElementById("starCount"),
    magicBtn: document.getElementById("magicBtn"),
    tickleBtn: document.getElementById("tickleBtn"),
    crystalField: document.getElementById("crystalField"),
    treatField: document.getElementById("treatField"),
    worldTap: document.getElementById("worldTap"),
    learnLayer: document.getElementById("learnLayer"),
    learnPicker: document.getElementById("learnPicker"),
    learnPlay: document.getElementById("learnPlay"),
    learnStage: document.getElementById("learnStage"),
    learnChoices: document.getElementById("learnChoices"),
    learnMoreBtn: document.getElementById("learnMoreBtn"),
  };

  let mode = "start";
  let booting = false;
  let stepIndex = 0;
  let celebrating = false;
  let placing = false;
  let started = false;
  let idleTimer = 0;
  let toastTimer = 0;
  let heroTimer = 0;
  let heroIndex = 0;
  let snowTaps = 0;
  let snowmanTaps = 0;
  let carrotsLeft = 0;
  let yumIndex = 0;
  let returnMode = "build";
  let stars = 0;
  let starSpawnTimer = 0;
  let deerPets = 0;
  let magicIndex = 0;
  let partTapIndex = 0;
  let lastSpeakAt = 0;
  let learnActivity = null;
  let learnCorrect = 0;
  let learnAnswer = null;
  let learnBusy = false;
  let learnPrompt = "";


  function shuffled(list) {
    return [...list].sort(() => Math.random() - 0.5);
  }

  function rollAccessories() {
    const looks = shuffled(SCARF_LOOKS).slice(0, 2);
    const scarf = STEPS.find((s) => s.id === "scarf");
    scarf.choices = looks.map((look) => ({
      parts: ["scarf"],
      preview: "snowman-pieces/scarf.png",
      filter: look.filter,
      tts: look.tts,
      line: look.tts,
      snowman: look.snowman,
    }));
    const hat = STEPS.find((s) => s.id === "hat");
    hat.choices = shuffled(HAT_CHOICES).map((choice) => ({ ...choice }));
  }

  function img(src) {
    const el = document.createElement("img");
    el.src = A + src;
    el.alt = "";
    el.draggable = false;
    return el;
  }

  function say(voiceRel, text, opts) {
    if (els.said && text) els.said.textContent = text;
    lastSpeakAt = Date.now();
    Speech.speak(voiceRel, text, opts);
  }

  function sayWho(who, text, opts) {
    say(null, text, { ...(opts || {}), who });
  }

  function loveLine(who) {
    if (who === "mom") return "Mommy loves you, Luna. Mommy is always here.";
    if (who === "dad") return "Daddy loves you, Luna. Daddy is always here.";
    return LOVE_LINE;
  }

  function updateStarHud() {
    if (!els.starCount) return;
    const hud = els.starCount.parentElement;
    els.starCount.textContent = String(stars);
    if (hud) hud.hidden = mode === "start" || stars <= 0;
  }

  function addStar(n) {
    stars += n || 1;
    updateStarHud();
    const hud = els.starCount && els.starCount.parentElement;
    if (hud) pulse(hud, "star-pop");
  }

  function setPreview(paths) {
    els.piecePreview.innerHTML = "";
    els.bubblePic.innerHTML = "";
    (paths || []).forEach((p) => {
      els.piecePreview.appendChild(img(p));
      els.bubblePic.appendChild(img(p));
    });
  }

  function setBubblePhoto(src, pos) {
    els.bubblePic.innerHTML = "";
    const photo = document.createElement("img");
    photo.src = src;
    photo.alt = "";
    photo.className = "bubble-face";
    photo.style.objectPosition = pos || "center 12%";
    els.bubblePic.appendChild(photo);
  }

  function showParts(keys, animate) {
    keys.forEach((key) => {
      const part = els.snowmanStack.querySelector(`[data-part="${key}"]`);
      if (!part) return;
      part.hidden = false;
      if (animate) {
        part.classList.remove("placing");
        void part.offsetWidth;
        part.classList.add("placing");
      }
    });
  }

  function clearLooks() {
    els.snowmanStack.querySelectorAll(".part").forEach((part) => {
      part.classList.remove(
        "placing",
        "boop",
        "look-purple",
        "look-pink",
        "look-ice",
      );
    });
  }

  function resetParts() {
    els.snowmanStack.querySelectorAll(".part").forEach((part) => {
      part.hidden = true;
    });
    clearLooks();
    els.snowmanStack.hidden = false;
    els.reindeerBtn.hidden = true;
    els.snowmanBtn.classList.remove("waving", "giggle", "has-eyes");
    els.loveRow.hidden = true;
  }

  function speakStep(step) {
    if (!step) return;
    if (step.voice) say(step.voice, step.line, { who: "luna" });
    else sayWho("luna", step.tts || step.line);
  }

  function clearIdle() {
    clearTimeout(idleTimer);
  }

  function clearStars() {
    clearTimeout(starSpawnTimer);
    if (els.starField) els.starField.innerHTML = "";
    if (els.crystalField) els.crystalField.innerHTML = "";
    if (els.treatField) els.treatField.innerHTML = "";
  }

  function armIdle() {
    clearIdle();
    idleTimer = setTimeout(onIdle, 7000);
  }

  function onIdle() {
    if (mode === "build" && !celebrating && !placing) {
      els.pieceBtn.classList.add("needs-help");
      els.choiceRow.classList.add("needs-help");
      if (Date.now() - lastSpeakAt > 2500) {
        const chat = IDLE_CHAT.build[Math.floor(Math.random() * IDLE_CHAT.build.length)];
        if (Math.random() > 0.45) sayWho(chat.who, chat.text);
        else speakStep(STEPS[stepIndex]);
      } else {
        speakStep(STEPS[stepIndex]);
      }
      armIdle();
      return;
    }
    if (mode === "feed" && !celebrating && carrotsLeft > 0) {
      const chat = IDLE_CHAT.feed[Math.floor(Math.random() * IDLE_CHAT.feed.length)];
      sayWho(chat.who, chat.text);
      pulse(els.feedDeerBtn, "hop");
      armIdle();
      return;
    }
    if (mode === "snow") {
      els.snowBtn.classList.add("needs-help");
      const chat = IDLE_CHAT.snow[Math.floor(Math.random() * IDLE_CHAT.snow.length)];
      sayWho(chat.who, chat.text);
      armIdle();
      return;
    }
    if (mode === "learn" && !celebrating && !learnBusy) {
      if (learnActivity && learnPrompt) sayWho("luna", learnPrompt);
      else sayWho("luna", "Pick Count, Colors, or Letters, Luna!");
      armIdle();
    }
  }

  function hidePlayControls() {
    els.pieceBtn.hidden = true;
    els.choiceRow.hidden = true;
    els.partyBar.hidden = true;
    els.snowMoreBtn.hidden = true;
    if (els.learnMoreBtn) els.learnMoreBtn.hidden = true;
    if (els.magicBtn) els.magicBtn.hidden = true;
    if (els.tickleBtn) els.tickleBtn.hidden = true;
    els.choiceRow.classList.remove("needs-help");
    els.pieceBtn.classList.remove("needs-help");
    els.snowBtn.classList.remove("needs-help");
  }

  function showModeLayers() {
    els.snowmanBtn.hidden = mode !== "build";
    els.feedLayer.hidden = mode !== "feed";
    els.snowLayer.hidden = mode !== "snow";
    if (els.learnLayer) els.learnLayer.hidden = mode !== "learn";
    if (mode !== "build") els.reindeerBtn.hidden = true;
    document.body.dataset.mode = mode;
  }

  function openGame() {
    els.startScreen.hidden = true;
    els.homeScreen.hidden = true;
    els.gameScreen.hidden = false;
    updateStarHud();
  }

  function showHome() {
    mode = "home";
    celebrating = false;
    placing = false;
    document.body.classList.remove("celebrating");
    clearIdle();
    clearStars();
    els.startScreen.hidden = true;
    els.homeScreen.hidden = false;
    els.gameScreen.hidden = true;
    stopHero();
    sayWho(
      "luna",
      "Hi Luna! Mommy and Daddy are always here. They love you! Tap a picture!",
    );
    scheduleStarSpawn();
  }

  function showStep() {
    celebrating = false;
    placing = false;
    document.body.classList.remove("celebrating");
    hidePlayControls();
    els.loveRow.hidden = true;
    els.reindeerBtn.hidden = true;
    showModeLayers();
    if (els.magicBtn) els.magicBtn.hidden = false;

    const step = STEPS[stepIndex];
    if (!step) return;

    if (step.choices && step.choices.length) {
      setPreview(step.choices.map((c) => c.preview));
      fillChoices(step);
      els.choiceRow.hidden = false;
    } else {
      setPreview(step.preview);
      els.pieceBtn.hidden = false;
    }

    els.bubbleText.textContent = step.line;
    speakStep(step);
    Sounds.sparkle();
    armIdle();
    scheduleStarSpawn();
  }

  function fillChoices(step) {
    els.choiceRow.innerHTML = "";
    step.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "piece-btn choice-btn";
      btn.setAttribute("aria-label", choice.line || choice.tts);
      const preview = img(choice.preview);
      if (choice.filter) preview.classList.add(choice.filter);
      btn.appendChild(preview);
      btn.addEventListener("click", (e) => placeCurrentPiece(e, choice));
      els.choiceRow.appendChild(btn);
    });
  }

  function partySnow(intense, hearts) {
    const count = intense ? 36 : 16;
    els.snow.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const flake = document.createElement("span");
      flake.className = "snowflake" + (intense ? " party" : "");
      if (hearts && i % 2 === 0) flake.classList.add("heart");
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDuration = `${2.4 + Math.random() * 4}s`;
      flake.style.animationDelay = `${Math.random() * 2.5}s`;
      const size = intense ? 20 + Math.random() * 18 : 14 + Math.random() * 12;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      els.snow.appendChild(flake);
    }
  }

  function showBurst(clientX, clientY) {
    const b = els.burst;
    b.classList.remove("show");
    b.style.left = `${clientX}px`;
    b.style.top = `${clientY}px`;
    void b.offsetWidth;
    b.classList.add("show");
  }

  function floatHearts(clientX, clientY) {
    const x = clientX || window.innerWidth / 2;
    const y = clientY || window.innerHeight / 2;
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("span");
      heart.className = "float-heart";
      heart.textContent = "💕";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 140}px`);
      heart.style.setProperty("--dy", `${-80 - Math.random() * 80}px`);
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  }

  function floatEmoji(clientX, clientY, emoji) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = emoji;
    heart.style.left = `${clientX}px`;
    heart.style.top = `${clientY}px`;
    heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 100}px`);
    heart.style.setProperty("--dy", `${-70 - Math.random() * 60}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }

  function wakeSnowman(step, choice) {
    const alive = step && step.alive;
    window.setTimeout(() => {
      if (alive === "eyes") els.snowmanBtn.classList.add("has-eyes");
      if (alive === "nose") {
        const nose = els.snowmanStack.querySelector('[data-part="nose"]');
        if (nose) {
          nose.classList.remove("boop");
          void nose.offsetWidth;
          nose.classList.add("boop");
        }
      }
      if (alive === "arms") {
        els.snowmanBtn.classList.remove("waving");
        void els.snowmanBtn.offsetWidth;
        els.snowmanBtn.classList.add("waving");
        window.setTimeout(
          () => els.snowmanBtn.classList.remove("waving"),
          1400,
        );
      }
      if (alive === "buttons") {
        const buttons = els.snowmanStack.querySelector('[data-part="buttons"]');
        if (buttons) {
          buttons.classList.remove("boop");
          void buttons.offsetWidth;
          buttons.classList.add("boop");
        }
      }
      if (choice && choice.filter) {
        const scarf = els.snowmanStack.querySelector('[data-part="scarf"]');
        if (scarf) {
          scarf.classList.remove("look-purple", "look-pink", "look-ice");
          scarf.classList.add(choice.filter);
        }
      }
    }, 480);
  }

  function celebrate() {
    window.dispatchEvent(new CustomEvent('lunakeepsake', { detail: { kind: 'snowman' } }));
    celebrating = true;
    returnMode = "build";
    document.body.classList.add("celebrating");
    hidePlayControls();
    els.partyBar.hidden = false;
    if (els.tickleBtn) els.tickleBtn.hidden = false;
    if (els.magicBtn) els.magicBtn.hidden = false;
    els.reindeerBtn.hidden = false;
    els.loveRow.hidden = false;
    setBubblePhoto("assets/family/luna-smile.jpg", "74% 28%");
    els.bubbleText.textContent = FINISH.line;
    say(FINISH.voice, FINISH.line, {
      who: "luna",
      onEnded: () => {
        if (celebrating && mode === "build") {
          sayWho("snowman", "Yay Luna! I am alive!", {
            onEnded: () => {
              if (celebrating && mode === "build") sayWho("luna", LOVE_LINE);
            },
          });
        }
      },
    });
    Sounds.cheer();
    els.snowmanBtn.classList.add("waving");
    partySnow(true, true);
    addStar(2);
    window.setTimeout(() => els.snowmanBtn.classList.remove("waving"), 1600);
    clearIdle();
    scheduleStarSpawn();
  }

  function placeCurrentPiece(evt, choice) {
    if (mode !== "build" || celebrating || placing) return;
    const step = STEPS[stepIndex];
    if (!step) return;

    placing = true;
    clearIdle();
    els.pieceBtn.classList.remove("needs-help");
    els.choiceRow.classList.remove("needs-help");
    Sounds.tap();
    Sounds.whoosh();
    if (evt && evt.clientX) showBurst(evt.clientX, evt.clientY);

    const parts = choice ? choice.parts : step.parts;
    showParts(parts, true);
    wakeSnowman(step, choice);
    Sounds.place();
    Speech.stop();

    const isLast = stepIndex >= STEPS.length - 1;
    if (!isLast) {
      window.setTimeout(() => {
        say(GREAT_JOB, "Great job, Luna!", {
          who: "luna",
          onEnded: () => {
            if (choice && choice.snowman && mode === "build" && placing === false) {
              /* after advance */
            }
          },
        });
        if (choice && choice.snowman) {
          window.setTimeout(() => {
            if (mode === "build") sayWho("snowman", choice.snowman);
          }, 1600);
        } else if (step.alive === "eyes") {
          window.setTimeout(() => {
            if (mode === "build") sayWho("snowman", "I can see you, Luna!");
          }, 1600);
        } else if (step.alive === "arms") {
          window.setTimeout(() => {
            if (mode === "build") sayWho("snowman", "I can wave now!");
          }, 1600);
        }
      }, 280);
    }

    window.setTimeout(
      () => {
        placing = false;
        stepIndex += 1;
        if (stepIndex >= STEPS.length) celebrate();
        else showStep();
      },
      isLast ? 550 : choice && choice.snowman ? 2400 : 1700,
    );
  }

  function startBuild(withWelcome) {
    mode = "build";
    returnMode = "build";
    celebrating = false;
    placing = false;
    stepIndex = 0;
    snowmanTaps = 0;
    document.body.classList.remove("celebrating");
    rollAccessories();
    resetParts();
    hidePlayControls();
    openGame();
    showModeLayers();
    partySnow(false, false);
    els.loveRow.hidden = true;
    clearStars();

    if (!withWelcome) {
      showStep();
      return;
    }

    setBubblePhoto("assets/family/luna.jpg");
    els.bubbleText.textContent = WELCOME.line;
    let advanced = false;
    const goFirst = () => {
      if (advanced || mode !== "build" || celebrating) return;
      advanced = true;
      showStep();
    };
    say(WELCOME.voice, WELCOME.line, { who: "luna", onEnded: goFirst });
    window.setTimeout(goFirst, 6000);
  }

  function startFeed() {
    mode = "feed";
    returnMode = "feed";
    celebrating = false;
    placing = false;
    yumIndex = 0;
    deerPets = 0;
    document.body.classList.remove("celebrating");
    hidePlayControls();
    openGame();
    showModeLayers();
    els.loveRow.hidden = true;
    els.bubbleText.textContent = "Tap the carrots!";
    setPreview(["snowman-pieces/carrot-nose.png"]);
    sayWho("luna", "Tap the carrots, Luna!", {
      onEnded: () => {
        if (mode === "feed") sayWho("reindeer", "Mmm, carrots please!");
      },
    });
    spawnCarrots();
    spawnTreats();
    armIdle();
    scheduleStarSpawn();
  }

  function spawnCarrots() {
    els.carrotField.innerHTML = "";
    carrotsLeft = 6;
    for (let i = 0; i < 6; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "carrot";
      btn.style.left = `${4 + (i % 3) * 32}%`;
      btn.style.animationDelay = `${i * 0.85}s`;
      btn.style.animationDuration = `${6.8 + (i % 3) * 0.4}s`;
      if (i >= 3) btn.classList.add("carrot-late");
      btn.setAttribute("aria-label", "Carrot");
      const carrot = img("ui/carrot.svg");
      btn.appendChild(carrot);
      btn.addEventListener("click", () => eatCarrot(btn));
      els.carrotField.appendChild(btn);
    }
  }

  function spawnTreats() {
    if (!els.treatField) return;
    els.treatField.innerHTML = "";
    const berry = document.createElement("button");
    berry.type = "button";
    berry.className = "treat-berry";
    berry.setAttribute("aria-label", "Magic berry");
    berry.style.left = `${20 + Math.random() * 55}%`;
    berry.style.top = `${35 + Math.random() * 25}%`;
    berry.textContent = "🫐";
    berry.addEventListener("click", (e) => {
      if (berry.classList.contains("eaten")) return;
      berry.classList.add("eaten");
      Sounds.sparkle();
      showBurst(e.clientX, e.clientY);
      floatEmoji(e.clientX, e.clientY, "✨");
      pulse(els.feedDeerBtn, "hop");
      addStar(1);
      sayWho("reindeer", "Sweet berry! Thank you, Luna!");
      els.bubbleText.textContent = "Sweet berry!";
    });
    els.treatField.appendChild(berry);
  }

  function eatCarrot(btn) {
    if (celebrating || btn.classList.contains("eaten")) return;
    btn.classList.add("eaten");
    carrotsLeft -= 1;
    Sounds.tap();
    Sounds.place();
    pulse(els.feedDeerBtn, "hop");
    showBurst(
      btn.getBoundingClientRect().left + 40,
      btn.getBoundingClientRect().top + 40,
    );
    if (carrotsLeft <= 0) {
      window.setTimeout(finishFeed, 350);
      return;
    }
    const thanks = REINDEER_THANKS[yumIndex % REINDEER_THANKS.length];
    sayWho("reindeer", thanks);
    els.bubbleText.textContent = thanks;
    yumIndex += 1;
    armIdle();
  }

  function finishFeed() {
    window.dispatchEvent(new CustomEvent('lunakeepsake', { detail: { kind: 'reindeer' } }));
    celebrating = true;
    clearIdle();
    document.body.classList.add("celebrating");
    hidePlayControls();
    els.partyBar.hidden = false;
    els.loveRow.hidden = false;
    setBubblePhoto("assets/family/luna.jpg");
    els.bubbleText.textContent =
      "Yum! Great job, Luna! Mommy and Daddy love you!";
    say(GREAT_JOB, "Great job, Luna!", {
      who: "luna",
      onEnded: () => {
        if (celebrating && mode === "feed")
          sayWho("reindeer", "Full tummy! Mommy and Daddy love you, Luna!");
      },
    });
    Sounds.cheer();
    partySnow(true, true);
    pulse(els.feedDeerBtn, "hop");
    addStar(2);
    scheduleStarSpawn();
  }

  function startSnow() {
    mode = "snow";
    returnMode = "snow";
    celebrating = false;
    snowTaps = 0;
    document.body.classList.remove("celebrating");
    hidePlayControls();
    els.snowMoreBtn.hidden = false;
    if (els.magicBtn) els.magicBtn.hidden = false;
    openGame();
    showModeLayers();
    els.loveRow.hidden = true;
    els.bubbleText.textContent = "Tap the big snowflake!";
    setBubblePhoto("assets/family/luna.jpg", "center 12%");
    sayWho("luna", "Make it snow, Luna!");
    partySnow(false, false);
    spawnCrystals();
    armIdle();
    scheduleStarSpawn();
  }

  function spawnCrystals() {
    if (!els.crystalField) return;
    els.crystalField.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const crystal = document.createElement("button");
      crystal.type = "button";
      crystal.className = "ice-crystal";
      crystal.setAttribute("aria-label", "Ice crystal");
      crystal.style.left = `${12 + i * 30 + Math.random() * 8}%`;
      crystal.style.top = `${20 + (i % 2) * 28 + Math.random() * 10}%`;
      crystal.style.animationDelay = `${i * 0.4}s`;
      crystal.textContent = "💎";
      crystal.addEventListener("click", (e) => {
        if (crystal.classList.contains("caught")) return;
        crystal.classList.add("caught");
        Sounds.sparkle();
        showBurst(e.clientX, e.clientY);
        floatEmoji(e.clientX, e.clientY, "❄️");
        addStar(1);
        sayWho("luna", "Ice crystal! So sparkly, Luna!");
        els.bubbleText.textContent = "Ice crystal!";
        if (els.crystalField.querySelectorAll(".ice-crystal:not(.caught)").length === 0) {
          window.setTimeout(() => {
            if (mode === "snow") spawnCrystals();
          }, 1800);
        }
      });
      els.crystalField.appendChild(crystal);
    }
  }

  function makeSnow(evt) {
    if (mode !== "snow") return;
    snowTaps += 1;
    els.snowBtn.classList.remove("needs-help");
    Sounds.tap();
    Sounds.whoosh();
    if (evt && evt.clientX) showBurst(evt.clientX, evt.clientY);
    const fluffy = Math.min(48, 12 + snowTaps * 5);
    els.snow.innerHTML = "";
    for (let i = 0; i < fluffy; i++) {
      const flake = document.createElement("span");
      flake.className = "snowflake party";
      if (snowTaps >= 3 && i % 2 === 0) flake.classList.add("heart");
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDuration = `${1.8 + Math.random() * 3}s`;
      flake.style.animationDelay = `${Math.random() * 1.4}s`;
      const size = 16 + Math.random() * (10 + snowTaps * 2);
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      els.snow.appendChild(flake);
    }
    pulse(els.snowBtn, "pressed");
    const line = SNOW_LINES[snowTaps % SNOW_LINES.length];
    if (snowTaps === 1 || snowTaps % 2 === 0) {
      sayWho(line.who, line.text);
      els.bubbleText.textContent = line.text;
    }
    if (snowTaps === 5) {
      window.dispatchEvent(new CustomEvent('lunakeepsake', { detail: { kind: 'snow' } }));
      addStar(1);
      sayWho("luna", "Blizzard party, Luna!");
    }
    armIdle();
  }

  function addSparkle(x, y) {
    const dot = document.createElement("span");
    dot.className = "finger-spark";
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    document.body.appendChild(dot);
    window.setTimeout(() => dot.remove(), 700);
  }

  function pulse(el, className) {
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }

  function playAgain() {
    Sounds.tap();
    clearStars();
    if (returnMode === "feed") {
      startFeed();
      return;
    }
    if (returnMode === "snow") {
      startSnow();
      return;
    }
    if (returnMode === "learn") {
      startLearn();
      return;
    }
    startBuild(false);
  }

  function startLearn() {
    mode = "learn";
    returnMode = "learn";
    celebrating = false;
    placing = false;
    learnActivity = null;
    learnCorrect = 0;
    learnAnswer = null;
    learnBusy = false;
    learnPrompt = "";
    document.body.classList.remove("celebrating");
    hidePlayControls();
    openGame();
    showModeLayers();
    els.loveRow.hidden = true;
    if (els.learnMoreBtn) els.learnMoreBtn.hidden = false;
    if (els.learnPicker) els.learnPicker.hidden = false;
    if (els.learnPlay) els.learnPlay.hidden = true;
    if (els.learnStage) els.learnStage.innerHTML = "";
    if (els.learnChoices) els.learnChoices.innerHTML = "";
    setBubblePhoto("assets/family/luna.jpg", "center 22%");
    els.bubbleText.textContent = "Let's learn, Luna!";
    sayWho("luna", "Let's learn, Luna! Pick Count, Colors, or Letters!");
    armIdle();
    scheduleStarSpawn();
  }

  function pickLearnActivity(kind) {
    if (mode !== "learn" || celebrating) return;
    Sounds.tap();
    Sounds.sparkle();
    learnActivity = kind;
    learnCorrect = 0;
    learnBusy = false;
    if (els.learnPicker) els.learnPicker.hidden = true;
    if (els.learnPlay) els.learnPlay.hidden = false;
    showLearnRound();
  }

  function showLearnRound() {
    if (!learnActivity || mode !== "learn") return;
    learnBusy = false;
    if (learnActivity === "count") showCountRound();
    else if (learnActivity === "colors") showColorRound();
    else showLetterRound();
    armIdle();
  }

  function fillLearnChoices(options, onPick) {
    els.learnChoices.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "learn-choice" + (opt.color ? " color-choice" : "");
      btn.setAttribute("aria-label", opt.label);
      if (opt.color) {
        btn.style.background = opt.color;
      } else {
        btn.textContent = opt.label;
      }
      btn.addEventListener("click", (e) => onPick(opt, btn, e));
      els.learnChoices.appendChild(btn);
    });
  }

  function showCountRound() {
    const kind = COUNT_KINDS[Math.floor(Math.random() * COUNT_KINDS.length)];
    const answer = 2 + Math.floor(Math.random() * 4);
    learnAnswer = String(answer);
    learnPrompt = `How many ${kind.word}, Luna?`;
    els.learnStage.innerHTML = "";
    for (let i = 0; i < answer; i++) {
      const token = document.createElement("div");
      token.className = "learn-token";
      token.appendChild(img(kind.src));
      token.style.animationDelay = `${i * 0.06}s`;
      els.learnStage.appendChild(token);
    }
    els.bubbleText.textContent = learnPrompt;
    setPreview([kind.src]);
    sayWho("luna", learnPrompt, {
      onEnded: () => {
        if (mode === "learn" && learnActivity === "count")
          sayWho(kind.who, `Count the ${kind.word}!`);
      },
    });
    const nums = new Set([answer]);
    while (nums.size < 3) nums.add(1 + Math.floor(Math.random() * 5));
    fillLearnChoices(
      shuffled([...nums]).map((n) => ({ value: String(n), label: String(n) })),
      (opt, btn, e) => gradeLearn(opt.value, btn, e, kind.cheer),
    );
  }

  function showColorRound() {
    const target = LEARN_COLORS[Math.floor(Math.random() * LEARN_COLORS.length)];
    const choices = shuffled(LEARN_COLORS).slice(0, 3);
    if (!choices.find((c) => c.id === target.id)) choices[0] = target;
    learnAnswer = target.id;
    learnPrompt = `Tap the ${target.label} scarf, Luna!`;
    els.learnStage.innerHTML = "";
    const scarf = document.createElement("div");
    scarf.className = "learn-token scarf-swatch";
    scarf.style.background = `radial-gradient(circle at 35% 30%, #fff, ${target.css})`;
    const pic = img("snowman-pieces/scarf.png");
    if (target.scarf) pic.classList.add(target.scarf);
    scarf.appendChild(pic);
    els.learnStage.appendChild(scarf);
    els.bubbleText.textContent = learnPrompt;
    setPreview(["snowman-pieces/scarf.png"]);
    sayWho("luna", learnPrompt, {
      onEnded: () => {
        if (mode === "learn" && learnActivity === "colors")
          sayWho("snowman", `I like ${target.label}!`);
      },
    });
    fillLearnChoices(
      shuffled(choices).map((c) => ({
        value: c.id,
        label: c.label,
        color: c.css,
      })),
      (opt, btn, e) => gradeLearn(opt.value, btn, e, `${opt.label}! Great looking!`),
    );
  }

  function showLetterRound() {
    const item = LEARN_LETTERS[Math.floor(Math.random() * LEARN_LETTERS.length)];
    const letters = shuffled([item.letter, ...shuffled(item.decoys).slice(0, 2)]);
    learnAnswer = item.letter;
    learnPrompt = item.prompt;
    els.learnStage.innerHTML = "";
    const big = document.createElement("div");
    big.className = "learn-token letter-big";
    big.textContent = "?";
    els.learnStage.appendChild(big);
    els.bubbleText.textContent = learnPrompt;
    setBubblePhoto("assets/family/luna-smile.jpg", "74% 28%");
    sayWho("luna", learnPrompt);
    fillLearnChoices(
      letters.map((L) => ({ value: L, label: L })),
      (opt, btn, e) => {
        if (opt.value === item.letter) big.textContent = item.letter;
        gradeLearn(opt.value, btn, e, item.win);
      },
    );
  }

  function gradeLearn(value, btn, evt, winLine) {
    if (learnBusy || celebrating || mode !== "learn") return;
    learnBusy = true;
    clearIdle();
    Sounds.tap();
    if (evt && evt.clientX) showBurst(evt.clientX, evt.clientY);
    if (String(value) === String(learnAnswer)) {
      pulse(btn, "correct-pop");
      Sounds.place();
      Sounds.sparkle();
      addStar(1);
      learnCorrect += 1;
      const done = learnCorrect >= 3;
      say(GREAT_JOB, "Great job, Luna!", {
        who: "luna",
        onEnded: () => {
          if (mode !== "learn") return;
          sayWho("luna", winLine || "You learned it, Luna!", {
            onEnded: () => {
              if (mode !== "learn") return;
              if (done) finishLearn();
              else {
                learnBusy = false;
                window.setTimeout(showLearnRound, 450);
              }
            },
          });
        },
      });
      return;
    }
    pulse(btn, "wrong-shake");
    Sounds.soft();
    learnBusy = false;
    say(TRY_AGAIN, "Try again, Luna!", {
      who: "luna",
      onEnded: () => {
        if (mode === "learn" && !celebrating) {
          sayWho("luna", learnPrompt || "You can do it, Luna!");
          armIdle();
        }
      },
    });
  }

  function finishLearn() {
    window.dispatchEvent(new CustomEvent('lunakeepsake', { detail: { kind: 'learn' } }));
    celebrating = true;
    learnBusy = true;
    clearIdle();
    document.body.classList.add("celebrating");
    hidePlayControls();
    els.partyBar.hidden = false;
    if (els.learnMoreBtn) els.learnMoreBtn.hidden = true;
    els.loveRow.hidden = false;
    setBubblePhoto("assets/family/luna-wings.jpg", "center 18%");
    const line = "You learned so much, Luna! Mommy and Daddy are proud!";
    els.bubbleText.textContent = line;
    say(GREAT_JOB, "Great job, Luna!", {
      who: "luna",
      onEnded: () => {
        if (celebrating && mode === "learn") sayWho("luna", line);
      },
    });
    Sounds.cheer();
    partySnow(true, true);
    addStar(2);
    scheduleStarSpawn();
  }


  function hug(evt) {
    Sounds.sparkle();
    floatHearts(evt && evt.clientX, evt && evt.clientY);
    pulse(els.snowmanBtn, "giggle");
    pulse(els.feedDeerBtn, "hop");
    if (!els.reindeerBtn.hidden) pulse(els.reindeerBtn, "hop");
    if (mode === "build") {
      sayWho("snowman", "Warm snow hug!", {
        onEnded: () => {
          if (mode === "build")
            sayWho("luna", "We love you, Luna! Mommy and Daddy are always here!");
        },
      });
    } else if (mode === "feed") {
      sayWho("reindeer", "Soft hug! Nuzzle nuzzle!", {
        onEnded: () => {
          if (mode === "feed")
            sayWho("luna", "We love you, Luna! Mommy and Daddy are always here!");
        },
      });
    } else {
      sayWho("luna", "We love you, Luna! Mommy and Daddy are always here!");
    }
    if (mode === "build" || mode === "feed") {
      els.bubbleText.textContent = "We love you, Luna!";
    }
  }

  function tickleSnowman(evt) {
    if (mode !== "build") return;
    Sounds.tap();
    pulse(els.snowmanBtn, "giggle");
    els.snowmanBtn.classList.add("waving");
    window.setTimeout(() => els.snowmanBtn.classList.remove("waving"), 1400);
    if (evt && evt.clientX) {
      showBurst(evt.clientX, evt.clientY);
      floatEmoji(evt.clientX, evt.clientY, "😄");
    }
    sayWho("snowman", "Hee hee hee! That tickles, Luna!");
    els.bubbleText.textContent = "Hee hee! That tickles!";
  }

  function castMagic(evt) {
    Sounds.whoosh();
    Sounds.sparkle();
    if (evt && evt.clientX) {
      showBurst(evt.clientX, evt.clientY);
      for (let i = 0; i < 6; i++) {
        window.setTimeout(
          () =>
            addSparkle(
              (evt.clientX || window.innerWidth / 2) + (Math.random() - 0.5) * 120,
              (evt.clientY || window.innerHeight / 2) + (Math.random() - 0.5) * 120,
            ),
          i * 60,
        );
      }
    }
    partySnow(true, magicIndex % 2 === 0);
    const line = MAGIC_LINES[magicIndex % MAGIC_LINES.length];
    magicIndex += 1;
    sayWho(line.who, line.text);
    els.bubbleText.textContent = line.text;
    if (mode === "build") {
      pulse(els.snowmanBtn, "giggle");
      if (els.snowmanBtn.classList.contains("has-eyes") || celebrating) {
        els.snowmanBtn.classList.add("waving");
        window.setTimeout(() => els.snowmanBtn.classList.remove("waving"), 1200);
      }
    }
    if (mode === "feed") pulse(els.feedDeerBtn, "hop");
    if (mode === "snow") pulse(els.snowBtn, "pressed");
    if (magicIndex % 3 === 0) addStar(1);
  }

  function tapSnowman(evt) {
    if (evt && evt.target && evt.target.closest && evt.target.closest("[data-part]")) {
      const part = evt.target.closest("[data-part]");
      if (!part.hidden) {
        tapSnowmanPart(part.getAttribute("data-part"), evt);
        return;
      }
    }
    snowmanTaps += 1;
    pulse(els.snowmanBtn, "giggle");
    if (els.snowmanBtn.classList.contains("has-eyes") || celebrating) {
      els.snowmanBtn.classList.add("waving");
      window.setTimeout(() => els.snowmanBtn.classList.remove("waving"), 1200);
    }
    Sounds.sparkle();
    if (evt && evt.clientX) showBurst(evt.clientX, evt.clientY);
    if (celebrating) {
      sayWho("snowman", "We love you, Luna! Mommy and Daddy are always here!");
    } else {
      const line = SNOWMAN_LINES[snowmanTaps % SNOWMAN_LINES.length];
      sayWho(line.who, line.text);
      els.bubbleText.textContent = line.text;
    }
    if (!celebrating && !placing) armIdle();
  }

  function tapSnowmanPart(partKey, evt) {
    const lines = SNOWMAN_PART_LINES[partKey];
    if (!lines || !lines.length) {
      tapSnowman(evt);
      return;
    }
    Sounds.sparkle();
    pulse(els.snowmanBtn, "giggle");
    if (evt && evt.clientX) showBurst(evt.clientX, evt.clientY);
    const part = els.snowmanStack.querySelector(`[data-part="${partKey}"]`);
    if (part) {
      part.classList.remove("boop");
      void part.offsetWidth;
      part.classList.add("boop");
    }
    if (partKey === "arms" || partKey === "arms-r") {
      els.snowmanBtn.classList.add("waving");
      window.setTimeout(() => els.snowmanBtn.classList.remove("waving"), 1200);
    }
    const line = lines[partTapIndex % lines.length];
    partTapIndex += 1;
    sayWho(line.who, line.text);
    els.bubbleText.textContent = line.text;
    if (!celebrating && !placing) armIdle();
  }

  function tapReindeer(evt) {
    Sounds.sparkle();
    pulse(els.reindeerBtn, "hop");
    pulse(els.feedDeerBtn, "hop");
    if (evt && evt.clientX) {
      showBurst(evt.clientX, evt.clientY);
      floatEmoji(evt.clientX, evt.clientY, "🦌");
    }
    deerPets += 1;
    const line = REINDEER_LINES[deerPets % REINDEER_LINES.length];
    sayWho("reindeer", line);
    els.bubbleText.textContent = line;
    if (deerPets % 4 === 0) {
      addStar(1);
      floatHearts(evt && evt.clientX, evt && evt.clientY);
    }
  }

  function sayLove(who, evt) {
    Sounds.sparkle();
    if (evt && evt.clientX) {
      floatHearts(evt.clientX, evt.clientY);
      showBurst(evt.clientX, evt.clientY);
    } else {
      floatHearts();
    }
    const line = loveLine(who);
    const voiceWho = who === "mom" ? "mom" : who === "dad" ? "dad" : "luna";
    const resume =
      mode === "build" && !celebrating && !placing ? STEPS[stepIndex] : null;
    sayWho(voiceWho, line, {
      onEnded: () => {
        if (
          resume &&
          mode === "build" &&
          !celebrating &&
          STEPS[stepIndex] === resume
        ) {
          speakStep(resume);
        }
      },
    });
    if (mode === "build" || mode === "feed" || mode === "snow" || mode === "home") {
      els.bubbleText.textContent = line;
    }
  }

  function showHero(index) {
    const photo = LUNA_PHOTOS[index % LUNA_PHOTOS.length];
    els.heroLuna.src = photo.src;
    els.heroLuna.style.objectPosition = photo.pos;
  }

  function startHero() {
    stopHero();
    heroTimer = window.setInterval(() => {
      heroIndex = (heroIndex + 1) % LUNA_PHOTOS.length;
      showHero(heroIndex);
    }, 4000);
  }

  function stopHero() {
    clearInterval(heroTimer);
  }

  function pickHero(src, pos) {
    stopHero();
    els.heroLuna.src = src;
    els.heroLuna.style.objectPosition = pos || "center 12%";
  }

  function toggleMute() {
    const next = !Speech.isMuted();
    Speech.setMuted(next);
    els.parentToast.hidden = false;
    els.parentToast.textContent = next ? "Voice off" : "Voice on";
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      els.parentToast.hidden = true;
    }, 1600);
    Sounds.setMuted(false);
    Sounds.tap();
    Sounds.setMuted(next);
  }

  function repeatGuide() {
    Sounds.sparkle();
    pulse(els.lunaBtn, "luna-bounce");
    if (mode === "home" || mode === "start") {
      sayWho("luna", LOVE_LINE);
      return;
    }
    if (celebrating) {
      say(FINISH.voice, FINISH.line, {
        who: "luna",
        onEnded: () => {
          if (celebrating) sayWho("luna", LOVE_LINE);
        },
      });
      return;
    }
    if (mode === "feed") {
      sayWho("luna", "Tap the carrots, Luna!", {
        onEnded: () => {
          if (mode === "feed") sayWho("reindeer", "I am hungry!");
        },
      });
      return;
    }
    if (mode === "snow") {
      sayWho("luna", "Make it snow, Luna!");
      return;
    }
    if (mode === "learn") {
      if (celebrating) {
        sayWho("luna", "You learned so much, Luna!");
        return;
      }
      if (learnActivity && learnPrompt) sayWho("luna", learnPrompt);
      else sayWho("luna", "Pick Count, Colors, or Letters, Luna!");
      return;
    }
    speakStep(STEPS[stepIndex]);
  }

  function scheduleStarSpawn() {
    clearTimeout(starSpawnTimer);
    if (mode === "start") return;
    starSpawnTimer = window.setTimeout(() => {
      spawnFloatingStar();
      scheduleStarSpawn();
    }, 4500 + Math.random() * 3500);
  }

  function spawnFloatingStar() {
    if (!els.starField) return;
    if (mode === "start") return;
    const star = document.createElement("button");
    star.type = "button";
    star.className = "float-star";
    star.setAttribute("aria-label", "Star");
    star.style.left = `${10 + Math.random() * 75}%`;
    star.style.top = `${18 + Math.random() * 50}%`;
    star.innerHTML = `<img src="${A}ui/star-burst.svg" alt="" />`;
    const collect = (e) => {
      e.stopPropagation();
      if (star.classList.contains("caught")) return;
      star.classList.add("caught");
      Sounds.sparkle();
      showBurst(e.clientX, e.clientY);
      floatEmoji(e.clientX, e.clientY, "⭐");
      addStar(1);
      const line = STAR_LINES[stars % STAR_LINES.length];
      sayWho(line.who, line.text);
      if (els.bubbleText && mode !== "home") els.bubbleText.textContent = line.text;
      window.setTimeout(() => star.remove(), 400);
    };
    star.addEventListener("click", collect);
    els.starField.appendChild(star);
    window.setTimeout(() => {
      if (!star.classList.contains("caught")) star.remove();
    }, 7000);
  }

  async function begin() {
    if (started || booting) return;
    booting = true;
    await Sounds.unlock();
    Speech.preload([
      WELCOME.voice,
      FINISH.voice,
      GREAT_JOB,
      TRY_AGAIN,
      ...STEPS.map((s) => s.voice).filter(Boolean),
    ]);
    await Speech.unlock();
    started = true;
    showHome();
  }

  function bindParentZone() {
    let holdId = 0;
    const cancel = () => clearTimeout(holdId);
    els.parentZone.addEventListener("pointerdown", () => {
      cancel();
      holdId = window.setTimeout(() => FamilyVoices.open(), 2000);
    });
    els.parentZone.addEventListener("pointerup", cancel);
    els.parentZone.addEventListener("pointercancel", cancel);
    els.parentZone.addEventListener("pointerleave", cancel);
  }

  function bindLoveButtons() {
    document.querySelectorAll("[data-who]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const who = btn.getAttribute("data-who");
        if (who === "luna" && btn.dataset.src) {
          pickHero(btn.dataset.src, btn.dataset.pos);
          sayWho("luna", "Hi! It is me, Luna!");
          return;
        }
        sayLove(who, e);
      });
    });
  }

  function bind() {
    els.playBtn.addEventListener("click", () => {
      Sounds.tap();
      if (!started) begin();
      else showHome();
    });

    els.goBuild.addEventListener("click", () => {
      Sounds.tap();
      startBuild(true);
    });
    els.goFeed.addEventListener("click", () => {
      Sounds.tap();
      startFeed();
    });
    els.goSnow.addEventListener("click", () => {
      Sounds.tap();
      startSnow();
    });
    if (els.goLearn) {
      els.goLearn.addEventListener("click", () => {
        Sounds.tap();
        startLearn();
      });
    }

    document.querySelectorAll("[data-learn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pickLearnActivity(btn.getAttribute("data-learn"));
      });
    });

    els.pieceBtn.addEventListener("click", (e) => placeCurrentPiece(e));
    els.againBtn.addEventListener("click", playAgain);
    els.hugBtn.addEventListener("click", hug);
    if (els.tickleBtn) els.tickleBtn.addEventListener("click", tickleSnowman);
    if (els.magicBtn) els.magicBtn.addEventListener("click", castMagic);
    els.moreBtn.addEventListener("click", () => {
      Sounds.tap();
      showHome();
    });
    els.snowMoreBtn.addEventListener("click", () => {
      Sounds.tap();
      showHome();
    });
    if (els.learnMoreBtn) {
      els.learnMoreBtn.addEventListener("click", () => {
        Sounds.tap();
        showHome();
      });
    }
    els.snowBtn.addEventListener("click", makeSnow);
    els.snowmanBtn.addEventListener("click", tapSnowman);
    els.reindeerBtn.addEventListener("click", tapReindeer);
    els.feedDeerBtn.addEventListener("click", tapReindeer);
    els.lunaBtn.addEventListener("click", repeatGuide);

    els.gameScreen.addEventListener("pointermove", (e) => {
      if (mode !== "snow" || !e.buttons) return;
      if (e.target.closest(".piece-bar, .luna-btn, .love-strip, .parent-zone, .magic-btn"))
        return;
      addSparkle(e.clientX, e.clientY);
    });

    if (els.worldTap) {
      els.worldTap.addEventListener("click", (e) => {
        if (e.target !== els.worldTap) return;
        if (mode !== "build" && mode !== "feed" && mode !== "snow") return;
        Sounds.soft();
        addSparkle(e.clientX, e.clientY);
        floatEmoji(e.clientX, e.clientY, "✨");
        if (Math.random() > 0.65) {
          sayWho("luna", "Sparkles for Luna!");
        }
      });
    }

    bindParentZone();
    bindLoveButtons();

    document.addEventListener(
      "touchmove",
      (e) => {
        if (e.target.closest("button")) return;
        e.preventDefault();
      },
      { passive: false },
    );
  }

  function init() {
    Speech.init();
    rollAccessories();
    partySnow(false, false);
    showHero(0);
    startHero();
    updateStarHud();
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
