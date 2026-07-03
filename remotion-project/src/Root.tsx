import React from 'react';
import {Composition} from 'remotion';
import {MainVideo} from './Video';
import {DebugSheet} from './DebugSheet';

export const FPS = 30;
export const DURATION_IN_FRAMES = 1800; // 60 seconds
export const WIDTH = 1280;
export const HEIGHT = 720;

export const RemotionRoot: React.FC = () => {
  return (
    <>
    <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="DebugSheet"
      component={DebugSheet}
      durationInFrames={30}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    </>
  );
};
