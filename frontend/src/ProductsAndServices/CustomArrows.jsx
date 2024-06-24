import React from 'react';
import { FaForward, FaBackward } from 'react-icons/fa';

// Custom Next Arrow
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black', fontSize: '24px', zIndex: 1 }}
      onClick={onClick}
    >
      <FaForward />
    </div>
  );
}

// Custom Previous Arrow
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black', fontSize: '24px', zIndex: 1 }}
      onClick={onClick}
    >
      <FaBackward />
    </div>
  );
}

export { NextArrow, PrevArrow };