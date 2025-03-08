import React, { useState, useEffect } from 'react';

interface TimerProps {
  isActive: boolean;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ isActive, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(600);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && onTimeUp) {
      onTimeUp();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return <div>{formattedTime}</div>;
};

export default Timer;
