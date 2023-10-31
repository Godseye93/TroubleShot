"use client"
import { useState, useEffect } from 'react';

const YourComponent = () => {
  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollCount((prevCount) => prevCount + 1);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <p>스크롤 횟수: {scrollCount}</p>
      {/* 여기에 나머지 컴포넌트 내용 추가 */}
    </div>
  );
};

export default YourComponent;
