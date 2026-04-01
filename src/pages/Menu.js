import React, { useState, useEffect } from "react";

const Menu = () => {
  const [categorizedItems, setCategorizedItems] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://gyroshero-backend.onrender.com/api/menu");
        const data = await res.json();
        const categories = {};
        data.forEach((item) => {
          if (!categories[item.category]) categories[item.category] = [];
          categories[item.category].push(item);
        });
        setCategorizedItems(categories);
      } catch (e) {
        console.error("Error fetching menu:", e);
      }
    };
    load();
  }, []);

  return (
    <>
      {/* -------- Video Hero (Our Menu + Discount banner) -------- */}
      <section className="relative w-full">
        {/* Full-bleed video */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
          <div className="relative h-[55vh] md:h-[70vh]">
            <video
              src="/gyro6.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              autoPlay
              loop
              preload="auto"
            />
            {/* Subtle dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 pointer-events-none" />
          </div>
        </div>

        {/* Centered banner card */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-white/50 backdrop-blur-md shadow-2xl rounded-2xl max-w-4xl w-full mx-auto py-10 md:py-14 px-6 md:px-12 ring-1 ring-black/10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-sm">
              Our Menu
            </h1>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-wide text-black">
            <strong className="text-red-900">Crazy Everyday
              Special  </strong>
            <strong className="text-blue-950">BEEF / CHICKEN / HERO COMBO ​GYRO OVER RICE & SALAD
              FOR ONLY  </strong>
            <strong className="text-red-900">$5.99</strong>
          </h2>
          <div className="flex justify-center mb-4">
            <img
              src="/specialcombo.png"
              alt="Gyros Hero Special Combo"
              className="w-32 h-auto"
            />
          </div>
        </div>
      </section>

      {/* -------- Items Grid -------- */}
      <div className="bg-white min-h-screen px-4 md:px-8 lg:px-16 py-12">
        {Object.keys(categorizedItems).map((category) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-semibold text-[#FAC31B] mb-6 uppercase border-b-2 border-[#FAC31B] pb-2">
              {category}
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categorizedItems[category].map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center p-5"
                >
                  <img
                    src={`https://gyroshero-backend.onrender.com${item.image_url}`}
                    alt={`${item.name} at Gyros Hero – Halal Mediterranean food in Houston`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/images/fallback.jpg";
                    }}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    ${Number(item.price).toFixed(2)}
                  </p>
                  <a
                    href={item.order_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block bg-[#FAC31B] hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full transition"
                  >
                    Order Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;