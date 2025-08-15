import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(100);

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(22, 0, 0, 0); // Set target time to 10 PM

    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1); // Add one day if current time is past 10 PM
    }

    const timeRemaining = targetTime - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });

    const totalTime = targetTime - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    setProgress(((totalTime - timeRemaining) / totalTime) * 100);
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="countdown">
      <div className="circle">
        <div className="value">{timeLeft.days}</div>
        <div className="label">Days</div>
        <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: '#3498db' }}></div>
      </div>
      <div className="circle">
        <div className="value">{timeLeft.hours}</div>
        <div className="label">Hours</div>
        <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: '#3498db' }}></div>
      </div>
      <div className="circle">
        <div className="value">{timeLeft.minutes}</div>
        <div className="label">Minutes</div>
        <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: '#e74c3c' }}></div>
      </div>
      <div className="circle">
        <div className="value">{timeLeft.seconds}</div>
        <div className="label">Seconds</div>
        <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: '#2ecc71' }}></div>
      </div>
    </div>
  );
};

export default CountdownTimer;

