import React, { useEffect, useState } from 'react';

const CountNumber = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (endValue <= 0) return; // Prevent counting if the endValue is not positive

    const incrementAmount = Math.ceil(endValue / 100); // Adjust the increment amount as needed
    const totalIncrements = Math.ceil(endValue / incrementAmount); // Calculate total increments
    const incrementTime = Math.abs(Math.floor(duration / totalIncrements)); // Calculate time for each increment

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + incrementAmount >= endValue) {
          clearInterval(timer);
          return endValue; // Ensure it doesn't go over the end value
        }
        return prevCount + incrementAmount; // Increment the count
      });
    }, incrementTime);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [endValue, duration]);

  return <span>{count}</span>;
};

export default CountNumber;
