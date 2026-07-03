import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const CampusBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const sunPulse = 1 + Math.sin(frame / 20) * 0.02;

  return (
    <g>
      <g transform={`translate(1650 180) scale(${sunPulse})`}>
        <circle r={110} fill="#FFE08A" opacity={0.9} />
        <circle r={80} fill="#FFF3C4" />
      </g>
      <path d="M 0 820 Q 480 720 960 800 T 1920 780 L 1920 1080 L 0 1080 Z" fill="#8FCB7E" />
      <path d="M 0 900 Q 500 840 960 900 T 1920 880 L 1920 1080 L 0 1080 Z" fill="#7BBD68" />
      {[220, 1720, 1500, 380].map((x, i) => (
        <g key={i} transform={`translate(${x} ${790 - (i % 2) * 30})`}>
          <rect x={-8} y={0} width={16} height={70} fill="#8A5A34" />
          <circle cx={0} cy={-20} r={54} fill="#4FA35B" />
          <circle cx={-30} cy={0} r={40} fill="#59B266" />
          <circle cx={30} cy={0} r={40} fill="#59B266" />
        </g>
      ))}
      <path d="M 760 1080 L 900 830 L 1080 830 L 1200 1080 Z" fill="#E8D9A8" opacity={0.9} />
    </g>
  );
};
