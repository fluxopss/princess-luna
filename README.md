# Princess Luna's Snow Kingdom

A hand-built, iPad-first snow kingdom for Luna. She can dress up in the Princess Mirror, cast snow magic, decorate a living castle, collect keepsakes from the snowman, reindeer, snow, and learning worlds, and tap family photos for real parent recordings. There are no generated voices, ads, accounts, scores to lose, or networked AI conversations.

## Run locally

Open `index.html` in a browser for visual and interaction testing. The parent voice studio needs a secure browser context for microphone access; the live HTTPS site is the intended recording environment. Hold the top-right corner for two seconds to open parent controls. Clips are stored in that browser's IndexedDB, not uploaded. Download each clip using **Back up** and restore it later using **Restore recording**. A browser reset may erase local storage.

## Personal media

This public source repository intentionally excludes `assets/family/` and `assets/voice/`. The live VPS already has the family photos in its separate, untracked assets directory. Do not commit photos, recordings, backups, or secrets. The original non-personal illustrations, snowman pieces, UI art, and sound effects are included.

## Deployment

The live site is served at `https://flux.ceo/` by Nginx from `/var/www/luna-game` on the Flux VPS. Back up that directory before a release. Upload code and non-personal art only; preserve the existing `assets/family/` directory. Compare file checksums, verify the home screen and all five worlds, then test the parent studio and spoken messages on Luna's actual iPad. Keep a dated rollback copy on the server.

## Checks

- `node --check js/game.js`
- `node --check js/kingdom.js`
- `node --check js/speech.js`
- `node --check js/family-voices.js`
- `node --check js/sounds.js`

The actual iPad test remains the final release gate for microphone permission, saved voice playback, portrait/landscape touch behavior, and persistence after reopening the home-screen icon.
