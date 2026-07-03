# PLAN — Execution order

Following the course's core Vibe Coding principle ("script/JSON before tools"), work was
done in this order:

1. **Read the assignment brief + lesson PDF (L09/EX06) in full** before touching any tool,
   to extract the exact deliverable list and grading rubric (§7.2.1 / Table 5).
2. **Analyze the Suno source song** (`One Minute at a Time.mp3`, 2:28) programmatically
   (`ffprobe` for embedded lyrics tag, RMS energy contour in 0.25s windows) to locate
   the Verse 1 / Chorus / Bridge / Chorus boundaries *before* deciding how to cut it to
   60 seconds — see `lyrics-analysis.md`.
3. **Write `script.json` and `script.fountain`** — the three-scene story, cue sheet,
   character + product design brief — before any project scaffolding existed. This
   mirrors the book's §7.1.1 instruction: "the transcript and JSON files must be written
   *before* installing tools or opening a project."
4. **Cut and crossfade the 60-second soundtrack** from the three chosen song sections.
5. **Scaffold the Remotion project** (package.json, tsconfig, `remotion.config.ts`) and
   resolve the sandbox's Chromium-download restriction (see `README.md`).
6. **Build the component library** (`Character`, `PhoneApp`, `ClockChaos`,
   `FloatingPapers`, `Sparkles`, `CampusBackdrop`, `CaptionText`) as reusable, prop-driven
   pieces, then compose the three `scenes/*.tsx` from them.
7. **Visually test in isolation** — a temporary `DebugSheet` composition renders every
   mood/pose combination on one sheet so problems (e.g. an arm hidden behind the head)
   are caught with a single still render instead of scrubbing the full 60s timeline.
   This iteration is preserved in `screenshots/pose-sheet-v1-before-fix.png` vs.
   `pose-sheet-final.png` as the required "development results / comparison of attempts."
8. **Render in frame-range chunks** (dictated by the sandbox's per-command time limit,
   not a creative decision) and losslessly re-assemble with `ffmpeg -filter_complex
   concat`, then mux the clean, un-concatenated soundtrack back on top to avoid any
   audio-boundary artifacts from chunked encoding.
9. **Write the documentation set** (this file, `PRD.md`, `TODO.md`, `README.md`,
   `prompts.md`) last, once the artifact and the decisions behind it were final.
10. **Initialize git with meaningful, staged commits** replaying steps 3–9 so the
    history itself documents the build order (see `README.md` → "Git history").

## Non-goals
- Photoreal AI-generated frames (no such tool was reachable in-sandbox — documented,
  not silently skipped).
- Perfect lip-sync (the character is a stylized flat-vector design; mouths change per
  emotional beat, not per phoneme).
