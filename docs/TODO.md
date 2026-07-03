# TODO

## Done
- [x] Read L09/EX06 brief in full, extract deliverable checklist
- [x] Analyze source song (lyrics tag + RMS energy contour) for section boundaries
- [x] Write `script.json` (3-scene structure, cue sheet, character/product brief)
- [x] Write `script.fountain` (full Fountain-format screenplay)
- [x] Cut + crossfade 60s soundtrack from Verse 1 / Chorus / Bridge
- [x] Scaffold Remotion project; work around sandbox's blocked Chromium download
- [x] Build `Character` component (6 moods × 6 arm poses, blink animation)
- [x] Build `ClockChaos`, `FloatingPapers`, `PhoneApp`, `Sparkles`, `CampusBackdrop`,
      `CaptionText`, `TimeWiseLogo` components
- [x] Compose `Scene1Chaos`, `Scene2Discovery`, `Scene3Success`
- [x] Debug-sheet visual QA pass; fix `panicUp` arm pose (hand was hidden behind head)
- [x] Fix overlapping captions (added `exitFrame` fade-out)
- [x] Render full 60s video in chunks; losslessly re-assemble; mux clean audio
- [x] Verify final MP4: exactly 1800 frames @ 30fps, 1280×720, 60.000s
- [x] Write PRD / PLAN / TODO / README / prompts log / lyrics analysis
- [x] Initialize git with staged, meaningful commit history

## Deliberately out of scope (documented, not forgotten)
- [ ] Photoreal Pixar-style rendering (no image-gen tool available in-sandbox)
- [ ] Discrete SFX audio layer (alarm beep, paper rustle, chime, footsteps) — currently
      represented visually; listed as a bonus extension in `README.md`
- [ ] 1080p export (rendered at 720p for sandbox CPU/time budget; see `README.md` for
      the timing measurements behind that call)

## If continuing this project (see README → "Extending this project")
- [ ] Swap `@sparticuz/chromium` workaround for a real network-allowlisted Chromium once
      running outside this sandbox
- [ ] Add a discrete SFX track (alarm, bus horn, UI chime, footsteps, high-five clap)
- [ ] Add a second color palette so the two Composition variants (Player preview vs.
      chunk-rendered file) can be diffed visually per commit
