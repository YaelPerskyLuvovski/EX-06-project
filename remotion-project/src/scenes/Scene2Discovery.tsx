import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {Character} from '../components/Character';
import {PhoneApp} from '../components/PhoneApp';
import {Sparkles} from '../components/Sparkles';
import {CaptionText} from '../components/CaptionText';
import {palette} from '../theme/palette';
import type {Mood} from '../components/Character';

export const Scene2Discovery: React.FC = () => {
  const frame = useCurrentFrame();

  const moodProgress: Mood = frame < 60 ? 'curious' : frame < 260 ? 'hopeful' : 'happy';

  const leanIn = interpolate(frame, [0, 40], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const breathe = Math.sin(frame / 24) * 6;

  const glowOpacity = interpolate(frame, [0, 30, 560, 600], [0, 0.55, 0.55, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBackground id="discoveryGrad" top={palette.bgDiscoveryTop} bottom={palette.bgDiscoveryBottom}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 68% 45%, rgba(142,107,255,${glowOpacity}) 0%, rgba(0,0,0,0) 60%)`}} />

      <AbsoluteFill>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080">
          <rect x={0} y={900} width={1920} height={180} fill="#191433" opacity={0.7} />

          <g transform={`translate(${560 + leanIn} ${700 + breathe})`}>
            <Character mood={moodProgress} armPose="holdPhoneUp" x={-150} y={-210} scale={1.25} />
          </g>

          <PhoneApp x={1230} y={560} scale={1.05} startFrame={10} />

          <Sparkles startFrame={30} />
        </svg>
      </AbsoluteFill>

      <CaptionText text="Every minute matters now. I finally learned the why and how." appearFrame={40} exitFrame={320} y={90} />
      <CaptionText text="One small change can light the way." appearFrame={340} exitFrame={580} y={90} />
    </SceneBackground>
  );
};
