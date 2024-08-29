import React, { useEffect, useState } from 'react';

const CountNumber = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (endValue <= 0) return;

    const incrementAmount = Math.ceil(endValue / 100);
    const totalIncrements = Math.ceil(endValue / incrementAmount);
    const incrementTime = Math.abs(Math.floor(duration / totalIncrements));

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + incrementAmount >= endValue) {
          clearInterval(timer);
          return endValue;
        }
        return prevCount + incrementAmount;
      });
    }, incrementTime);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return <span>{count}</span>;
};

export default CountNumber;
