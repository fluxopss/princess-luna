# Luna's Snow Kit

Asset pack for Luna's snowman-building iPad game. Every file here is original, so nothing breaks if you ever share the game.

## What's inside
- backgrounds/: ice palace (portrait) and snowy forest (landscape)
- characters/: snow princess guide, finished snowman, baby reindeer (transparent PNGs)
- snowman-pieces/: big, middle and small snowballs, eyes, carrot nose, left and right stick arms, buttons, scarf, top hat (transparent PNGs, one piece per file) and the full sheet
- voice/: 11 warm, friendly voice lines (MP3) that say Luna's name, one per game step, plus "great job" and "try again"
- sfx/: tap pop, place chime, sparkle, whoosh, soft try-again, celebration fanfare
- ui/: snowflake and star SVGs for falling snow and tap bursts
- manifest.json: maps each game step to its piece, voice line and sound. Feed it straight to the game.

## About Elsa and Olaf
The image generator blocks official Disney characters, so the pack uses original stand-ins in the same style. If the game stays on Luna's iPad only, you can drop your own Elsa or Olaf images into characters/ using the same filenames and the game will pick them up without any code changes.

## Build notes
- Preload all audio after the first tap, because iPad Safari won't play sound until the screen is touched.
- Tap targets should be at least 120px and show one piece at a time.
- The guide should pulse or sparkle to show which piece to tap next.
