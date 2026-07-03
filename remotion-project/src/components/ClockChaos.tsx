import React from 'react';
import {useCurrentFrame} from 'remotion';
import {palette} from '../theme/palette';

export const ClockChaos: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => {
  const frame = useCurrentFrame();
  const minuteAngle = (frame * 26) % 360;
  const hourAngle = (frame * 7) % 360;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r={110} fill={palette.white} stroke={palette.ink} strokeWidth={10} />
      {Array.from({length: 12}).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = Math.sin(a) * 92;
        const y1 = -Math.cos(a) * 92;
        const x2 = Math.sin(a) * 102;
        const y2 = -Math.cos(a) * 102;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.ink} strokeWidth={5} strokeLinecap="round" />;
      })}
      <g transform={`rotate(${hourAngle})`}>
        <rect x={-5} y={-55} width={10} height={65} rx={5} fill={palette.ink} />
      </g>
      <g transform={`rotate(${minuteAngle})`}>
        <rect x={-4} y={-85} width={8} height={95} rx={4} fill={palette.hoodieShadow} />
      </g>
      <circle r={10} fill={palette.ink} />
    </g>
  );
};
