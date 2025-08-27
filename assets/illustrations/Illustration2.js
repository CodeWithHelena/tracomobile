// assets/illustrations/Illustration2.js
import React from 'react';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';

export default function Illustration2({ width=220, height=160 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 220 160">
      <Rect x="40" y="20" rx="20" width="140" height="110" fill="#f8f6ff" />
      <G fill="#b8a8ff">
        <Rect x="58" y="34" width="18" height="10" rx="3" />
        <Rect x="88" y="34" width="18" height="10" rx="3" />
        <Rect x="118" y="34" width="18" height="10" rx="3" />
        <Path d="M58 62h100v40H58z" fill="#fff" />
      </G>
      <Circle cx="110" cy="110" r="10" fill="#8a6fff" />
      <Path d="M102 110h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <Path d="M110 102v16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}
