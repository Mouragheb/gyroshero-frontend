import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const happyHourItems = [
  {
    name: "Gyro Wrap Meal with Fries",
    link: "https://www.gyroshero.com/product/gyro-wrap-meal-with-fries-happy-hour-/97?cs=true&cst=custom",
    image: "/images/gyro-wrap.jpeg", // Replace with your actual image paths
  },
  {
    name: "Hero Combo",
    link: "https://www.gyroshero.com/product/hero-combo-happy-hour-/93?cs=true&cst=custom",
    image: "/images/hero-combo.jpeg",
  },
  {
    name: "NYC Gyro Over Rice",
    link: "https://www.gyroshero.com/product/nyc-gyro-over-rice-happy-hour-/95?cs=true&cst=custom",
    image: "/images/gyros-rice.jpeg",
  },
  {
    name: "NYC Chicken Over Rice",
    link: "https://www.gyroshero.com/product/nyc-chicken-over-rice-happy-hour-/94?cs=true&cst=custom",
    image: "/images/nyc-chicken.jpeg",
  },
];

const HappyHour = () => {
  const [isHappyHour, setIsHappyHour] = useState(false);
  const [countdown, setCountdown] = useState("");
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
        setCountdown("");
      } else {
        setIsHappyHour(false);
        setCountdown(getNextHappyHourCountdown());
      }
    };
  
    updateTime();
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  if (!isHappyHour) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Happy Hour Isn't Live Yet</h1>
        <p className="text-lg">Starts in: <strong>{countdown}</strong></p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Happy Hour Specials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {happyHourItems.map((item, index) => (
          <div
            key={index}
            className="border shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold text-center mb-2">{item.name}</h2>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Order Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HappyHour;