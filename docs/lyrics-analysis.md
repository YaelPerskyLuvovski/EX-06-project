# Music & Lyrics — "One Minute at a Time" (Suno)

## 1. Source
- Generated with **Suno**, uploaded by the student as `One Minute at a Time.mp3`.
- Full length: **2:28 (147.9s)**. Embedded ID3 tag `lyrics-eng` contains the full lyric
  sheet with section labels (`[Verse 1]`, `[Chorus]`, `[Bridge]`, `[Chorus]`).

## 2. Lyric structure (per the course's §3.1 model: Verse → Pre-Chorus → Chorus → Bridge)
```
[Verse 1]      "Another morning, running late…"          — the problem (struggle)
[Chorus]       "Every minute matters now…"                — the turning point / hook
[Bridge]       "One decision changed it all…"             — the resolution, title drop
[Chorus]       (repeat)
```
This is a textbook pop structure, and it already matches the assignment's required
3-scene arc (struggle → discovery → success) almost exactly — which is why the video's
scenes are cut directly from Verse 1 / Chorus / Bridge rather than written to force-fit
an unrelated structure onto the song.

## 3. Locating section boundaries programmatically
The mp3 has no silence between sections (checked with `ffmpeg silencedetect`, no gaps
found beyond the intro/outro), so section boundaries were found from the **RMS energy
contour** (0.25s windows, decoded to mono 22.05kHz PCM with `ffmpeg`/`numpy`):

| Section | Approx. time range | Energy signature |
|---|---|---|
| Verse 1 | 2.0s – 35.5s | Low/medium (~0.10–0.15 RMS) |
| Chorus 1 | 35.75s – ~77s | High plateau (~0.21–0.25 RMS), sharp onset at 35.75s |
| Bridge | ~78.5s – ~99s | Drops back down (~0.09–0.15 RMS) |
| Chorus 2 (repeat) | ~99.25s – ~141s | High plateau again |
| Outro | 141s – 147.9s | Fade to silence |

This matches the ID3 lyric-section order exactly, confirming the cut points below.

## 4. Why a slant-rhyme, conversational lyric works here (course §3.1.1)
The lyrics favor plosive/fricative-matched near-rhymes over exact rhymes (e.g.
*late/plate* is an exact rhyme, but *chance/circumstance* and *now/how* lean on
assonance + a shared final consonant class rather than a forced perfect rhyme). Per the
course material, this keeps a pop lyric feeling conversational and "spoken" rather than
sing-song, which suits a video about ordinary student life rather than a fantasy story.

## 5. Cue sheet used for the video (60s total, 3 × 20s)
| Scene | Video time | Song source | Lyric excerpt used as caption |
|---|---|---|---|
| 1 — Chaos | 0:00–0:20 | Verse 1, 2.0s–22.0s | "Another morning, running late. Too many dreams, too much on my plate." / "Missed the bus. Missed another chance." |
| 2 — Discovery | 0:20–0:40 | Chorus, 35.75s–55.75s | "Every minute matters now. I finally learned the why and how." / "One small change can light the way." |
| 3 — Turnaround | 0:40–1:00 | Bridge, 78.5s–98.5s | "One decision changed it all. Now I rise instead of fall." / "The future starts with what I choose." |

Each cut is exactly 20s, sliced with `ffmpeg -ss … -t 20`, then joined with 0.4s
equal-power crossfades (`acrossfade=c1=tri:c2=tri`) so there are no hard cuts in the
music — final soundtrack is 59.2s (three 20s clips minus two 0.4s crossfade overlaps),
which is intentionally a hair shorter than the 60s picture: the video's final ~0.8s is a
quiet beat under the title card, which reads as a deliberate landing rather than an
abrupt cutoff.

## 6. Which "mandatory payload" category this satisfies
The assignment requires either (a) a narrative film with emotional score + voice dubbing
+ sound effects, **or** (b) a song clip ("קליפ לשיר") with vocals + melody. This project
is submitted under **category (b)**: the Suno song's vocals and melody are the spine of
the video — the captions are literally the sung lyrics, and the three scenes are cut to
the song's own structure rather than the other way around.
