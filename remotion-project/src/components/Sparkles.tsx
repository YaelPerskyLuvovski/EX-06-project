import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const sparkleSpots = [
  {x: 760, y: 320, delay: 0, s: 26},
  {x: 1180, y: 260, delay: 6, s: 18},
  {x: 1120, y: 560, delay: 12, s: 22},
  {x: 820, y: 620, delay: 18, s: 16},
  {x: 1000, y: 200, delay: 24, s: 20},
  {x: 700, y: 480, delay: 30, s: 14},
];

const Sparkle: React.FC<{x: number; y: number; size: number; frame: number}> = ({x, y, size, frame}) => {
  const cycle = frame % 40;
  const opacity = interpolate(cycle, [0, 10, 20, 40], [0, 1, 0, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(cycle, [0, 10, 20], [0.3, 1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <path
        d={`M 0 -${size} L ${size * 0.25} -${size * 0.25} L ${size} 0 L ${size * 0.25} ${size * 0.25} L 0 ${size} L -${size * 0.25} ${size * 0.25} L -${size} 0 L -${size * 0.25} -${size * 0.25} Z`}
        fill="#FFE8A3"
      />
    </g>
  );
};

export const Sparkles: React.FC<{startFrame?: number}> = ({startFrame = 0}) => {
  const frame = useCurrentFrame() - startFrame;
  if (frame < 0) return null;
  return (
    <>
      {sparkleSpots.map((s, i) => (
        <Sparkle key={i} x={s.x} y={s.y} size={s.s} frame={frame + s.delay} />
      ))}
    </>
  );
};
