// assets/illustrations/Illustration3.js
import React from 'react';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';

export default function Illustration3({ width=220, height=160 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 220 160">
      <Circle cx="110" cy="80" r="72" fill="#f5efff" />
      <G transform="translate(48,36)">
        <Rect x="0" y="36" width="16" height="28" rx="2" fill="#d9ccff"/>
        <Rect x="28" y="16" width="16" height="48" rx="2" fill="#bfa8ff"/>
        <Rect x="56" y="4" width="16" height="60" rx="2" fill="#9c82ff"/>
        <Path d="M0 66h88" stroke="#f0edff" strokeWidth="4" strokeLinecap="round" />
      </G>
    </Svg>
  );
}
