// assets/illustrations/Illustration1.js
import React from 'react';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';

export default function Illustration1({ width=220, height=160 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 220 160">
      <Circle cx="110" cy="80" r="72" fill="#f3f1ff" />
      <G transform="translate(40,30)">
        <Rect x="0" y="0" rx="10" ry="10" width="140" height="100" fill="#fff" />
        <Path d="M15 22h90" stroke="#e8e0ff" strokeWidth="6" strokeLinecap="round" />
        <Path d="M15 48h90" stroke="#e8e0ff" strokeWidth="6" strokeLinecap="round" />
        <Path d="M15 74h90" stroke="#e8e0ff" strokeWidth="6" strokeLinecap="round" />
        <Path d="M110 22l12 12 20-28" stroke="#7b5cff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </G>
    </Svg>
  );
}
