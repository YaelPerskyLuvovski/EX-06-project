import React from 'react';
import {palette} from '../theme/palette';

export const TimeWiseLogo: React.FC<{size?: number}> = ({size = 120}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.appGradientA} />
          <stop offset="100%" stopColor={palette.appGradientB} />
        </linearGradient>
      </defs>
      <rect x={4} y={4} width={112} height={112} rx={32} fill="url(#logoGrad)" />
      <circle cx={60} cy={62} r={34} fill="none" stroke="white" strokeWidth={7} />
      <line x1={60} y1={62} x2={60} y2={40} stroke="white" strokeWidth={6} strokeLinecap="round" />
      <line x1={60} y1={62} x2={76} y2={68} stroke="white" strokeWidth={6} strokeLinecap="round" />
      <path d="M 44 24 Q 60 12 76 24" stroke="white" strokeWidth={6} fill="none" strokeLinecap="round" />
    </svg>
  );
};
