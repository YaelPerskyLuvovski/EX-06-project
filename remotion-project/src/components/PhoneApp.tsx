import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme/palette';
import {TimeWiseLogo} from './TimeWiseLogo';

const tasks = ['Wake up on time', 'Reading assignment', 'Study block: 25 min', 'Coffee with Jordan'];

export const PhoneApp: React.FC<{x: number; y: number; scale?: number; startFrame: number}> = ({
  x,
  y,
  scale = 1,
  startFrame,
}) => {
  const frame = useCurrentFrame() - startFrame;

  const bloom = interpolate(frame, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glow = interpolate(frame, [0, 15, 40], [0, 1, 0.4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* glow */}
      <circle r={260} fill={palette.appGradientA} opacity={glow * 0.25} />

      {/* phone body */}
      <rect x={-140} y={-260} width={280} height={520} rx={46} fill="#1C1730" />
      <rect x={-124} y={-240} width={248} height={480} rx={30} fill="#0F0C1E" />

      {/* screen content, blooms in */}
      <g style={{opacity: bloom}} transform={`scale(${0.85 + bloom * 0.15})`}>
        <rect x={-124} y={-240} width={248} height={480} rx={30} fill="#F4F1FF" />
        <g transform="translate(-90 -195)">
          <TimeWiseLogo size={62} />
        </g>
        <text x={-15} y={-165} fontFamily="Poppins, Arial, sans-serif" fontSize={26} fontWeight={700} fill={palette.ink}>
          TimeWise
        </text>
        <text x={-100} y={-120} fontFamily="Poppins, Arial, sans-serif" fontSize={18} fill="#7A7290">
          Today's plan
        </text>
        {tasks.map((t, i) => {
          const taskLocal = frame - 20 - i * 10;
          const checked = taskLocal > 18;
          const taskOpacity = interpolate(frame - 15 - i * 8, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <g key={t} transform={`translate(-100 ${-90 + i * 55})`} opacity={taskOpacity}>
              <rect width={224} height={42} rx={14} fill="#FFFFFF" stroke="#E3DEF5" strokeWidth={2} />
              <circle cx={24} cy={21} r={12} fill={checked ? palette.appGradientB : '#EDEAFB'} stroke={palette.appGradientA} strokeWidth={2} />
              {checked && (
                <path d="M 18 21 L 22 26 L 31 15" stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              )}
              <text x={46} y={27} fontFamily="Poppins, Arial, sans-serif" fontSize={16} fill={palette.ink} textDecoration={checked ? 'line-through' : 'none'} opacity={checked ? 0.55 : 1}>
                {t}
              </text>
            </g>
          );
        })}
      </g>
    </g>
  );
};
