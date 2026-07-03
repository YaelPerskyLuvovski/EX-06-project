import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme/palette';

const sheets = [
  {startX: -100, endX: 500, y: 200, rot: 15, delay: 0, w: 90, h: 120, color: palette.white},
  {startX: 2100, endX: 1400, y: 700, rot: -20, delay: 10, w: 100, h: 130, color: '#EDEDED'},
  {startX: -150, endX: 700, y: 850, rot: 30, delay: 25, w: 80, h: 105, color: '#FFF7DE'},
  {startX: 2050, endX: 1250, y: 320, rot: -10, delay: 35, w: 95, h: 120, color: palette.white},
];

export const FloatingPapers: React.FC<{startFrame?: number}> = ({startFrame = 0}) => {
  const frame = useCurrentFrame() - startFrame;
  return (
    <>
      {sheets.map((s, i) => {
        const local = (frame - s.delay + 400) % 110;
        const progress = interpolate(local, [0, 90], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x = interpolate(progress, [0, 1], [s.startX, s.endX]);
        const rotation = s.rot * progress * 4;
        const opacity = interpolate(local, [0, 10, 80, 100], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: s.y,
              width: s.w,
              height: s.h,
              background: s.color,
              opacity,
              borderRadius: 6,
              boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <div style={{margin: '14px 10px', height: 3, background: '#CCC'}} />
            <div style={{margin: '10px 10px', height: 3, background: '#CCC'}} />
            <div style={{margin: '10px 10px', height: 3, background: '#CCC'}} />
          </div>
        );
      })}
    </>
  );
};
