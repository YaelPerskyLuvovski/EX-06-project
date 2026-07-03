import React from 'react';
import {useCurrentFrame} from 'remotion';
import {palette} from '../theme/palette';

export type Mood = 'panic' | 'stressed' | 'curious' | 'hopeful' | 'happy' | 'confident';
export type ArmPose = 'down' | 'panicUp' | 'holdPhoneUp' | 'wave' | 'hipHands' | 'walkSwing';

const eyebrowPaths: Record<Mood, {left: string; right: string}> = {
  panic: {
    left: 'M 105 95 Q 120 78 140 92',
    right: 'M 160 92 Q 180 78 195 95',
  },
  stressed: {
    left: 'M 103 92 Q 122 82 138 95',
    right: 'M 162 95 Q 178 82 197 92',
  },
  curious: {
    left: 'M 103 96 Q 120 88 138 94',
    right: 'M 162 90 Q 180 80 197 90',
  },
  hopeful: {
    left: 'M 103 92 Q 120 84 138 90',
    right: 'M 162 90 Q 180 84 197 92',
  },
  happy: {
    left: 'M 103 90 Q 120 82 138 88',
    right: 'M 162 88 Q 180 82 197 90',
  },
  confident: {
    left: 'M 100 90 Q 120 84 140 88',
    right: 'M 160 88 Q 180 84 200 90',
  },
};

const mouthPaths: Record<Mood, string> = {
  panic: 'M 128 158 Q 150 148 172 158 Q 150 172 128 158 Z',
  stressed: 'M 130 162 Q 150 154 170 162',
  curious: 'M 132 160 Q 150 168 168 160',
  hopeful: 'M 128 158 Q 150 176 172 158',
  happy: 'M 122 155 Q 150 188 178 155 Q 150 172 122 155 Z',
  confident: 'M 124 158 Q 150 180 176 158 Q 150 170 124 158 Z',
};

export const Character: React.FC<{
  mood: Mood;
  armPose: ArmPose;
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  flip?: boolean;
  walkPhase?: number; // 0..1 for leg/arm swing
}> = ({mood, armPose, x, y, scale = 1, rotate = 0, flip = false, walkPhase = 0}) => {
  const frame = useCurrentFrame();
  const blinkCycle = frame % 90;
  const isBlinking = blinkCycle > 85;
  const eyeScaleY = isBlinking ? 0.1 : 1;

  const legSwing = Math.sin(walkPhase * Math.PI * 2) * 22;

  const armTransform = (() => {
    switch (armPose) {
      case 'panicUp':
        return {left: 'rotate(140 96 205)', right: 'rotate(-140 204 205)'};
      case 'holdPhoneUp':
        return {left: 'rotate(-95 96 210)', right: 'rotate(10 204 210)'};
      case 'wave':
        return {left: 'rotate(10 96 210)', right: 'rotate(-140 204 210)'};
      case 'hipHands':
        return {left: 'rotate(-25 96 210)', right: 'rotate(25 204 210)'};
      case 'walkSwing':
        return {
          left: `rotate(${legSwing} 96 210)`,
          right: `rotate(${-legSwing} 204 210)`,
        };
      default:
        return {left: 'rotate(6 96 210)', right: 'rotate(-6 204 210)'};
    }
  })();

  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${rotate}) ${flip ? 'scale(-1,1)' : ''}`}>
      {/* legs */}
      <g transform={`rotate(${legSwing * 0.6} 130 340)`}>
        <rect x={112} y={330} width={34} height={90} rx={17} fill={palette.hoodieShadow} />
      </g>
      <g transform={`rotate(${-legSwing * 0.6} 170 340)`}>
        <rect x={154} y={330} width={34} height={90} rx={17} fill={palette.ink} opacity={0.85} />
      </g>

      {/* back arm */}
      <g transform={armTransform.right}>
        <rect x={190} y={195} width={40} height={130} rx={20} fill={palette.hoodieShadow} />
        <circle cx={210} cy={325} r={20} fill={palette.skinShadow} />
      </g>

      {/* body */}
      <rect x={70} y={185} width={160} height={195} rx={60} fill={palette.hoodie} />
      <rect x={70} y={185} width={160} height={90} rx={55} fill={palette.hoodieLight} opacity={0.5} />
      <rect x={128} y={205} width={44} height={54} rx={14} fill={palette.hoodieShadow} opacity={0.6} />
      <path d="M 100 190 Q 150 235 200 190" stroke={palette.hoodieShadow} strokeWidth={8} fill="none" strokeLinecap="round" />

      {/* front arm */}
      <g transform={armTransform.left}>
        <rect x={70} y={195} width={40} height={130} rx={20} fill={palette.hoodie} />
        <circle cx={90} cy={325} r={20} fill={palette.skin} />
      </g>

      {/* neck */}
      <rect x={130} y={165} width={40} height={35} fill={palette.skinShadow} />

      {/* head */}
      <circle cx={150} cy={110} r={88} fill={palette.skin} />
      {/* hair back */}
      <path d="M 62 100 Q 55 25 150 20 Q 245 25 238 100 Q 238 40 150 45 Q 62 40 62 100 Z" fill={palette.hair} />
      {/* bun */}
      <circle cx={150} cy={30} r={26} fill={palette.hair} />
      <circle cx={150} cy={30} r={26} fill="none" stroke={palette.hairShadow} strokeWidth={4} opacity={0.4} />
      {/* stray strands */}
      <path d="M 65 95 Q 50 110 60 130" stroke={palette.hair} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 235 95 Q 250 108 242 126" stroke={palette.hair} strokeWidth={10} fill="none" strokeLinecap="round" />

      {/* ears */}
      <circle cx={64} cy={118} r={14} fill={palette.skin} />
      <circle cx={236} cy={118} r={14} fill={palette.skin} />

      {/* cheeks */}
      <ellipse cx={104} cy={140} rx={16} ry={10} fill={palette.cheeks} opacity={0.55} />
      <ellipse cx={196} cy={140} rx={16} ry={10} fill={palette.cheeks} opacity={0.55} />

      {/* eyes */}
      <g transform={`translate(0 ${isBlinking ? 4 : 0})`}>
        <ellipse cx={118} cy={118} rx={16} ry={18 * eyeScaleY} fill={palette.white} />
        <ellipse cx={182} cy={118} rx={16} ry={18 * eyeScaleY} fill={palette.white} />
        {!isBlinking && (
          <>
            <circle cx={121} cy={121} r={8.5} fill={palette.ink} />
            <circle cx={185} cy={121} r={8.5} fill={palette.ink} />
            <circle cx={124} cy={117} r={2.6} fill={palette.white} />
            <circle cx={188} cy={117} r={2.6} fill={palette.white} />
          </>
        )}
      </g>

      {/* eyebrows */}
      <path d={eyebrowPaths[mood].left} stroke={palette.hairShadow} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d={eyebrowPaths[mood].right} stroke={palette.hairShadow} strokeWidth={6} fill="none" strokeLinecap="round" />

      {/* nose */}
      <path d="M 148 132 Q 144 145 150 148" stroke={palette.skinShadow} strokeWidth={4} fill="none" strokeLinecap="round" />

      {/* mouth */}
      <path d={mouthPaths[mood]} fill={palette.ink} stroke={palette.ink} strokeWidth={2} strokeLinejoin="round" />
    </g>
  );
};
