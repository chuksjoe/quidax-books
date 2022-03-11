import React from 'react';

const Star = ({ color }) => (
  <svg width="16" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.18667 0L10.6348 4.93776L16.0705 5.72614L12.1286 9.56432L13.0622 15L8.18667 12.4481L3.31116 15L4.24477 9.56432L0.302856 5.72614L5.75929 4.93776L8.18667 0Z" fill={color} />
  </svg>
);
function StarRatings({ rating }) {
  const rate = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i += 1) {
    if (rate > i) {
      stars.push(<Star color="#EBA430" key={i} />);
    } else {
      stars.push(<Star color="#DEDEDE" key={i} />);
    }
  }

  return (
    <span className="flex space-x-1">
      {stars}
    </span>
  );
}

export default StarRatings;
