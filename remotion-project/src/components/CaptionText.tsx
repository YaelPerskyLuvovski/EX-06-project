import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme/palette';

export const CaptionText: React.FC<{
  text: string;
  appearFrame?: number;
  exitFrame?: number;
  y?: number;
}> = ({text, appearFrame = 0, exitFrame, y = 950}) => {
  const frame = useCurrentFrame();
  const local = frame - appearFrame;

  const keyframes = exitFrame
    ? [0, 15, exitFrame - appearFrame - 15, exitFrame - appearFrame]
    : [0, 15, 999, 1000];
  const values = exitFrame ? [0, 1, 1, 0] : [0, 1, 1, 1];

  const opacity = interpolate(local, keyframes, values, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(local, [0, 15], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (local < 0 || opacity <= 0.001) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          background: palette.captionBg,
          color: palette.white,
          padding: '18px 44px',
          borderRadius: 999,
          fontFamily: 'Poppins, Arial, sans-serif',
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: 0.3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          textAlign: 'center',
          maxWidth: 1400,
        }}
      >
        {text}
      </div>
    </div>
  );
};
