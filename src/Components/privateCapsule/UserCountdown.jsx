import React, { useEffect, useState } from "react";

const UserCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(targetDate) - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft("Time capsule revealed!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <p className="countdown">{timeLeft}</p>;
};

export default UserCountdown;
