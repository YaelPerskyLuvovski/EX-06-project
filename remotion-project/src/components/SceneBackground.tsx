import React from 'react';
import {AbsoluteFill} from 'remotion';

export const SceneBackground: React.FC<{
  top: string;
  bottom: string;
  id: string;
  children?: React.ReactNode;
}> = ({top, bottom, id, children}) => {
  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={top} />
            <stop offset="100%" stopColor={bottom} />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill={`url(#${id})`} />
      </svg>
      {children}
    </AbsoluteFill>
  );
};
