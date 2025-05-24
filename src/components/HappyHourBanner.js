import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HappyHourBanner = () => {
  const [isHappyHour, setIsHappyHour] = useState(false);
  const [countdown, setCountdown] = useState("00:00:00");
  const navigate = useNavigate();

  useEffect(() => {
    const isWithinHappyHour = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const totalMins = hour * 60 + minute;
  
      const morningStart = 11 * 60;      // 11:00 AM
      const morningEnd = 15 * 60;        // 3:00 PM
      const eveningStart = 20 * 60;      // 8:00 PM
      const eveningEnd = 22 * 60 + 30;   // 10:30 PM
  
      return (
        (totalMins >= morningStart && totalMins <= morningEnd) ||
        (totalMins >= eveningStart && totalMins <= eveningEnd)
      );
    };
  
    const getNextHappyHourCountdown = () => {
      const now = new Date();
      const totalMins = now.getHours() * 60 + now.getMinutes();
  
      let nextStart = new Date();
  
      if (totalMins < 11 * 60) {
        nextStart.setHours(11, 0, 0); // today 11:00 AM
      } else if (totalMins < 20 * 60) {
        nextStart.setHours(20, 0, 0); // today 8:00 PM
      } else {
        nextStart.setDate(now.getDate() + 1); // tomorrow 11:00 AM
        nextStart.setHours(11, 0, 0);
      }
  
      const diff = nextStart.getTime() - now.getTime();
      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  
      return `${hours}:${minutes}:${seconds}`;
    };
  
    const updateTime = () => {
      if (isWithinHappyHour()) {
        setIsHappyHour(true);
        setCountdown("00:00:00");
      } else {
        setIsHappyHour(false);
        setCountdown(getNextHappyHourCountdown());
      }
    };
  
    updateTime();
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (isHappyHour) {
      navigate("/happy-hour");
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-2">
  <div className="bg-[#FAC31B] px-4 py-2 rounded-md text-black font-semibold text-lg shadow-md">
    {isHappyHour ? (
      <span className="text-xl animate-pulse">
        🎉 Happy Hour is LIVE! 🎉
        <p>$8.99 Meals</p>
        <p>Lunch: 11AM-3PM</p>
        <p>Dinner: 8PM-10:30PM</p>
      </span>
    
    ) : (
      <>
        <span className="inline-block animate-bounce">⏳</span>{" "}
        Happy Hour Starts in:{" "}
        <span className="text-red-600 font-mono">{countdown}</span>
        <p>$8.99 Meals</p>
        <p>Lunch: 11AM-3PM</p>
        <p>Dinner: 8PM-10:30PM</p>
      </>
    )}
    <br></br>
    <button
    onClick={handleClick}
    disabled={!isHappyHour}
    className={`px-6 py-2 rounded-md font-bold transition duration-300 shadow-md ${
      isHappyHour
        ? "bg-red-400 hover:bg-red-500 text-black"
        : "bg-gray-300 text-gray-600 cursor-not-allowed"
    }`}
  >
    Shop Happy Hour
  </button>
  </div>

  
</div>
  );
};

export default HappyHourBanner;