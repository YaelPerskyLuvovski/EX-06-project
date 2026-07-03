import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Character} from './components/Character';
import type {ArmPose, Mood} from './components/Character';

const poses: ArmPose[] = ['down', 'panicUp', 'holdPhoneUp', 'wave', 'hipHands', 'walkSwing'];
const moods: Mood[] = ['panic', 'stressed', 'curious', 'hopeful', 'happy', 'confident'];

export const DebugSheet: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#eee'}}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        {poses.map((p, i) => (
          <g key={p}>
            <Character mood="curious" armPose={p} x={80 + i * 300} y={80} scale={0.7} />
            <text x={80 + i * 300 + 100} y={420} fontSize={24} textAnchor="middle">{p}</text>
          </g>
        ))}
        {moods.map((m, i) => (
          <g key={m}>
            <Character mood={m} armPose="down" x={80 + i * 300} y={500} scale={0.7} />
            <text x={80 + i * 300 + 100} y={840} fontSize={24} textAnchor="middle">{m}</text>
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
