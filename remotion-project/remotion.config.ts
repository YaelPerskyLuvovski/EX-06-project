import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Sandbox has no network access to remotion.media / storage.googleapis.com,
// so we use a Chromium binary fetched via the npm registry instead
// (@sparticuz/chromium) and point Remotion at it directly.
Config.setBrowserExecutable('/sessions/charming-vigilant-bell/tmp/chromium');
Config.setChromiumOpenGlRenderer('swangle');
