import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {SceneBackground} from '../components/SceneBackground';
import {Character} from '../components/Character';
import {CampusBackdrop} from '../components/CampusBackdrop';
import {CaptionText} from '../components/CaptionText';
import {TimeWiseLogo} from '../components/TimeWiseLogo';
import {palette} from '../theme/palette';

export const Scene3Success: React.FC = () => {
  const frame = useCurrentFrame();

  const walkX = interpolate(frame, [0, 260], [-120, 760], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const walking = frame < 260;
  const walkPhase = (frame % 24) / 24;

  const jordanEnter = interpolate(frame, [180, 260], [1250, 1040], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardOpacity = interpolate(frame, [420, 460], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dimOpacity = interpolate(frame, [410, 460], [0, 0.45], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cardScale = interpolate(frame, [420, 470], [0.85, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneBackground id="successGrad" top={palette.bgSuccessTop} bottom={palette.bgSuccessBottom}>
      <AbsoluteFill>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080">
          <CampusBackdrop />

          <g transform={`translate(${walking ? walkX : 760} 660)`}>
            <Character
              mood="confident"
              armPose={walking ? 'walkSwing' : 'wave'}
              x={-150}
              y={-210}
              scale={1.3}
              walkPhase={walkPhase}
            />
          </g>

          {frame > 150 && (
            <g transform={`translate(${jordanEnter} 660)`}>
              <Character mood="happy" armPose={frame > 260 && frame < 340 ? 'wave' : 'down'} x={-150} y={-210} scale={1.3} flip />
            </g>
          )}
        </svg>
      </AbsoluteFill>

      <CaptionText text="One decision changed it all. Now I rise instead of fall." appearFrame={20} exitFrame={210} y={90} />
      <CaptionText text="The future starts with what I choose." appearFrame={230} exitFrame={405} y={90} />

      <AbsoluteFill style={{background: `rgba(20,15,40,${dimOpacity})`}} />

      {frame > 415 && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: cardOpacity}}>
          <div
            style={{
              transform: `scale(${cardScale})`,
              background: 'white',
              borderRadius: 40,
              padding: '56px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
            }}
          >
            <TimeWiseLogo size={110} />
            <div
              style={{
                marginTop: 24,
                fontFamily: 'Poppins, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 56,
                color: palette.ink,
                letterSpacing: 0.5,
              }}
            >
              ONE MINUTE AT A TIME
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: 'Poppins, Arial, sans-serif',
                fontSize: 26,
                color: '#8A7FA8',
              }}
            >
              Every task, checked. Every day, on time.
            </div>
          </div>
        </AbsoluteFill>
      )}
    </SceneBackground>
  );
};
