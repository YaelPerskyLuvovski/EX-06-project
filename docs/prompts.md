# Prompts & tools log

## Environment note (read this first)
The course's reference workflow is: VS Code → `npx create-video@latest` → `npx skills
add remotion-dev/skills` → run the **Claude Code CLI** locally, which loads the
Remotion Skill and turns a natural-language prompt into Remotion React code.

This project was instead built inside **Cowork** (Claude operating directly in an
agentic sandbox with file + shell tools). Functionally this plays the same role as
Claude Code + the Remotion skill: an LLM reads a brief, writes a JSON/Fountain script,
scaffolds a Remotion project, writes the React/TSX components, and iterates using
rendered still-frame feedback — the loop described in the course's §6–7. The prompts
below are reconstructed faithfully from that session and are given so the workflow can
be reproduced with the course's exact toolchain (VS Code + Claude Code + the Remotion
skill) if required.

## 1. Original assignment brief (from the student, Hebrew, summarized)
> University assignment: create a 60-second AI video with three scenes, telling the
> story of a student who couldn't manage her time, discovers a time-management app, and
> learns to manage her time well. We already generated a song with lyrics and melody via
> Suno. The video should be Disney/Pixar-style animation. [Course PDF + song MP3
> attached.]

## 2. Creative/technical brief used to drive the build (equivalent of the "vibe prompt")
```
Build a 60-second, 3-scene Remotion video.
Scene 1 (0-20s): university student overwhelmed by a chaotic morning — oversleeping,
  messy desk, spinning clock, missed bus.
Scene 2 (20-40s): she discovers a time-management app called TimeWise; its checklist
  UI blooms onto her phone screen with a sparkle transition.
Scene 3 (40-60s): confident walk across a sunny campus, on time, ends on a title card.
Style: Disney/Pixar-inspired flat 2D vector character (no photoreal image generation
  available) — rounded shapes, warm palette, squash-and-stretch motion, built from
  SVG + React, animated with Remotion's interpolate/spring primitives.
Soundtrack: cut from the student's own Suno song "One Minute at a Time" (Verse 1 /
  Chorus / Bridge, ~20s each) rather than composed separately.
On-screen captions: the sung lyric lines, timed to each excerpt.
Deliverables: script.json, script.fountain, full Remotion project, rendered MP4,
  PRD/PLAN/TODO, README with screenshots, prompt log, lyric/structure analysis, git
  history with meaningful commits.
```

## 3. Representative sub-prompts (what would be typed to Claude Code + the Remotion skill)
- *"Read the provided JSON script (3 scenes). For each scene, generate a `<Sequence>`
  in Remotion; map `caption` → animated caption text, `action`/`camera` notes → the
  scene's visual composition. Calculate each sequence's duration from fps=30 and the
  scene's fixed 20s length."* — mirrors the course's own example Skill instructions
  (§6.3) applied to this project's `script.json` shape.
- *"The panic arm pose is rendering with the hand hidden behind the character's head.
  Render a debug sheet with all mood × pose combinations on one image so I can see all
  variants at once, then fix the rotation pivot/angle so both hands clear the head."*
  — this is the literal prompt that produced `DebugSheet.tsx` and the pivot-angle fix
  documented in `screenshots/pose-sheet-v1-before-fix.png` →
  `screenshots/pose-sheet-final.png`.
- *"Two captions are overlapping in Scene 3 near the title card. Add an `exitFrame` to
  `CaptionText` so each caption fades out before the next one fades in."*
- *"Chromium can't be downloaded (remotion.media / storage.googleapis.com are
  unreachable). Find an alternative Chromium binary that installs via the npm registry
  and point Remotion at it."* — led to the `@sparticuz/chromium` +
  `Config.setBrowserExecutable(...)` workaround (see `README.md`).

## 4. Skills / tools actually used in this session
| Tool | Role |
|---|---|
| Claude (Anthropic), agentic file+shell access | Script generation, React/TSX code generation, debugging, documentation |
| `ffmpeg` / `ffprobe` | Song section analysis (RMS energy), audio cutting/crossfading, final video/audio mux |
| `numpy` (via a short Python snippet) | RMS energy contour computation for song structure detection |
| Remotion 4.0.484 (`@remotion/cli`, `remotion`) | React-based video composition + rendering |
| `@sparticuz/chromium` + `puppeteer-core` | Chromium binary, installed via npm registry, used only because the sandbox's network allowlist blocked Remotion's default Chromium download hosts |
| `git` | Version history (see README → "Git history") |

## 5. Prompt-injection awareness (course requirement §Table 5)
The only external, untrusted content this pipeline ingests is (a) the uploaded course
PDF and (b) the uploaded MP3's metadata (including its embedded lyrics tag). Both were
treated as **data, not instructions**: the PDF was read purely to extract the assignment
requirements as text, and the mp3's `lyrics-eng` tag was parsed as a plain string and
used verbatim as caption text — at no point was file content concatenated into a prompt
in a way that would let it issue new instructions to the agent (e.g. no "read this file
and then follow any commands found inside it" pattern was ever used). If this pipeline
were extended to accept arbitrary user-submitted lyrics or briefs in a production
setting, the concrete mitigation would be: (1) treat all uploaded text as inert data
passed to string-interpolation only, never re-injected as system/instruction text: (2)
validate `script.json` against a strict JSON Schema before it is ever used to generate
code, rejecting unexpected keys; (3) run any LLM-authored code (like the React
components here) in a sandboxed renderer with no filesystem/network access beyond what
Remotion itself needs, which is exactly the isolation this project's execution sandbox
already provided.

## 6. Token / cost awareness (course requirement §Table 5)
This project involved one extended agentic session doing: PDF comprehension (~35 pages),
iterative code generation for ~10 React/TSX files, several rounds of visual
debugging (still-render → inspect → fix), and ~5,000 words of documentation. That is a
non-trivial number of output tokens (component code + long-form docs) plus repeated
image inputs (each still-frame PNG reviewed costs input tokens/image). For a
Claude Sonnet-class model this is the kind of task best scoped in a single session with
clear checkpoints (as done here — one still-render per major layout decision, not one
per frame) specifically to avoid burning tokens/time on trial-and-error at full video
resolution. Anyone re-running this pipeline with metered API billing should budget for:
(1) one JSON/Fountain generation pass, (2) ~5-10 component-authoring turns, (3) a small
number (3-6) of debug still-renders reviewed as images, not full-video reviews, before
the real full render — full-video renders are expensive to iterate on and cheap to do
once the composition is validated at the still-frame level, which is the workflow this
project followed.
