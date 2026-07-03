import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Scene1Chaos} from './scenes/Scene1Chaos';
import {Scene2Discovery} from './scenes/Scene2Discovery';
import {Scene3Success} from './scenes/Scene3Success';

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{fontFamily: 'Poppins, Arial, sans-serif'}}>
      <Audio src={staticFile('soundtrack.mp3')} />

      <Sequence from={0} durationInFrames={600} name="Scene 1 - The Chaos">
        <Scene1Chaos />
      </Sequence>

      <Sequence from={600} durationInFrames={600} name="Scene 2 - The Discovery">
        <Scene2Discovery />
      </Sequence>

      <Sequence from={1200} durationInFrames={600} name="Scene 3 - The Turnaround">
        <Scene3Success />
      </Sequence>
    </AbsoluteFill>
  );
};
