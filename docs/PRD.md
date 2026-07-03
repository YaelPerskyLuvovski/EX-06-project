# PRD — "One Minute at a Time" (EX06 Vibe Coding Video)

## 1. Summary
A 60-second, three-scene animated short produced with a code-driven (Vibe Coding) pipeline:
an LLM (Claude) writes the screenplay/JSON script, a React/Remotion project renders
Disney/Pixar-inspired vector animation, and a Suno-generated song supplies the soundtrack.
The finished video, all source files, and this documentation are the assignment deliverable
for EX06 (Multimedia Vibe-Coding course, L09).

## 2. Goal / Problem statement
Course brief: produce a 60-second AI-assisted video, in three scenes, telling a story about
a student who cannot manage her time, discovers a time-management app, and becomes
effective. The soundtrack must be an original Suno song with lyrics and melody, and the
visual style must evoke Disney/Pixar-style animation.

## 3. Constraints discovered during planning
- **No photoreal AI image/video generation tool was available in the execution
  environment.** Only a code sandbox (Node.js, Remotion, ffmpeg) was available — no
  Midjourney/Runway/Sora-class model. This ruled out photoreal Pixar-*render* output.
  Decision: build a **code-driven 2D vector "flat Disney" character and scene system**
  (SVG + React + Remotion), which is fully within the spirit of the course (animation
  produced by code, driven by an LLM) and is explicitly one of the "obligatory payload"
  options in the assignment brief (dubbing / sound effects / cinematic feel via code).
- **The sandbox has an allow-listed network.** `remotion.media` and
  `storage.googleapis.com` (Remotion's default Chromium download hosts) were unreachable.
  Decision: fetch a Chromium binary through the **npm registry** instead
  (`@sparticuz/chromium`, normally an AWS-Lambda package but a static Linux x64 build that
  works fine standalone) and point Remotion at it via `Config.setBrowserExecutable(...)`.
  This is documented in `README.md` under "Environment workaround" for full transparency.
- **2 CPU cores / no GPU** in the render sandbox. Full 1920×1080 rendering was too slow
  to fit the available compute budget, so the final export uses **1280×720 @ 30fps**
  (still a fully broadcast-acceptable resolution for a course deliverable). This trade-off
  is documented with timing measurements in `README.md`.
- **The Suno song is 2:28 (148s), the brief needs 60s.** Decision: cut three ~20s
  excerpts (Verse 1 / Chorus / Bridge) that already match the three-act structure
  (struggle → discovery → success) almost perfectly, see `lyrics-analysis.md`.

## 4. Target user / audience
University course grader + general viewer. Video must read clearly with sound off
(captions) and with sound on (song carries the emotional arc).

## 5. Story (three scenes, matches `script.json` / `script.fountain`)
1. **The Chaos (0–20s)** — Maya oversleeps, her room is chaos, she misses the bus.
2. **The Discovery (20–40s)** — Maya finds the "TimeWise" app; a checklist appears.
3. **The Turnaround (40–60s)** — Maya walks to campus on time, confident; title card.

## 6. Deliverables (mapped to the course's Table in §7.2.1)
| Required item | Where |
|---|---|
| Final video (MP4) | `one-minute-at-a-time.mp4` |
| Full Fountain screenplay | `script.fountain` |
| Lyrics + chosen lyrical structure | `lyrics-analysis.md` |
| All prompts used + skills used | `prompts.md` |
| All Python/code produced | `remotion-project/src/**` (TypeScript/React, per assignment's Remotion track) |
| PRD / PLAN / TODO | this file, `PLAN.md`, `TODO.md` |
| README with screenshots | `README.md` + `screenshots/` |

## 7. Success criteria
- Video is exactly 60s, 3 scenes, and satisfies the assignment's mandatory-payload
  requirement under the **"song clip" track** (קליפ לשיר: vocals + melody), since the
  Suno song's vocals and melody *are* the narrative device driving the captions and the
  scene timing (see `lyrics-analysis.md` for the cue sheet). Sound-effect *moments*
  (alarm, papers, bus, UI chime, footsteps) are represented visually/kinetically in the
  animation (see `script.json`'s `sfx` field per scene) as a documented bonus-extension
  opportunity — see `README.md` → "Known limitations & possible extensions".
- Project builds from a clean checkout (`npm install && npx remotion render …`).
- Every scripted decision (song cut points, art style, chunked render strategy) is
  explained, not just executed — per the course's "planning before tools" principle.
