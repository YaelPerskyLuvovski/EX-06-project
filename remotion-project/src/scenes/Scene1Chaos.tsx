import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {Character} from '../components/Character';
import {ClockChaos} from '../components/ClockChaos';
import {FloatingPapers} from '../components/FloatingPapers';
import {CaptionText} from '../components/CaptionText';
import {palette} from '../theme/palette';

export const Scene1Chaos: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 18], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const wobble = Math.sin(frame / 4.5) * 2.4;
  const shakeX = Math.sin(frame / 3.1) * 4;

  // bus sliding away through the "window"
  const busX = interpolate(frame, [260, 420], [0, 520], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const busOpacity = interpolate(frame, [260, 290, 400, 430], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // final collapse
  const collapseTilt = interpolate(frame, [480, 560], [0, 12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const collapseY = interpolate(frame, [480, 560], [0, 60], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneBackground id="chaosGrad" top={palette.bgChaosTop} bottom={palette.bgChaosBottom}>
      <AbsoluteFill>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080">
          {/* desk */}
          <rect x={0} y={880} width={1920} height={200} fill="#2C2450" opacity={0.8} />
          <rect x={0} y={860} width={1920} height={30} fill="#352a63" />

          {/* window with bus, upper-right */}
          <g transform="translate(1430 120)">
            <rect x={0} y={0} width={420} height={260} rx={20} fill="#BFE3F2" opacity={0.9} />
            <rect x={0} y={0} width={420} height={260} rx={20} fill="none" stroke="#2C2450" strokeWidth={14} />
            <line x1={210} y1={0} x2={210} y2={260} stroke="#2C2450" strokeWidth={10} />
            <line x1={0} y1={130} x2={420} y2={130} stroke="#2C2450" strokeWidth={10} />
            <g transform={`translate(${busX} 160)`} opacity={busOpacity}>
              <rect x={0} y={0} width={140} height={60} rx={14} fill="#F2C230" />
              <rect x={14} y={12} width={40} height={26} rx={4} fill="#BFE3F2" />
              <rect x={64} y={12} width={40} height={26} rx={4} fill="#BFE3F2" />
              <circle cx={30} cy={64} r={12} fill="#2C2450" />
              <circle cx={110} cy={64} r={12} fill="#2C2450" />
            </g>
          </g>

          <ClockChaos x={280} y={220} scale={1.05} />

          <FloatingPapers />

          <g transform={`translate(${960 + shakeX} ${640 + collapseY + entrance}) rotate(${wobble + collapseTilt})`} opacity={entranceOpacity}>
            <Character
              mood={frame > 470 ? 'stressed' : 'panic'}
              armPose={frame > 470 ? 'down' : 'panicUp'}
              x={-150}
              y={-210}
              scale={1.35}
            />
          </g>
        </svg>
      </AbsoluteFill>

      <CaptionText
        text="Another morning, running late. Too many dreams, too much on my plate."
        appearFrame={40}
        exitFrame={280}
        y={850}
      />
      <CaptionText text="Missed the bus. Missed another chance." appearFrame={300} exitFrame={580} y={850} />
    </SceneBackground>
  );
};
