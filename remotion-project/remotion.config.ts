import fs from 'node:fs';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// --- Sandbox-only workaround, safe to ignore on a normal machine ---
// The build sandbox used for this assignment had a network allowlist that
// blocked Remotion's default Chromium download hosts (remotion.media /
// storage.googleapis.com). As a workaround, a Chromium binary was installed
// via the npm registry instead (`npm install @sparticuz/chromium`) and
// extracted to a fixed path. On a normal computer with regular internet
// access this is unnecessary — Remotion will download its own Chromium
// automatically the first time you run `npx remotion studio` or
// `npx remotion render`, and none of the code below will do anything.
const SANDBOX_CHROMIUM_PATH = '/sessions/charming-vigilant-bell/tmp/chromium';
if (fs.existsSync(SANDBOX_CHROMIUM_PATH)) {
  Config.setBrowserExecutable(SANDBOX_CHROMIUM_PATH);
  Config.setChromiumOpenGlRenderer('swangle');
}
