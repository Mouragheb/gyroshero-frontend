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
          <div className="relative h-[48vh] md:h-[60vh]">
            <video
              src="/gyro6.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              autoPlay
              loop
              preload="auto"
              // poster="/images/menu-poster.jpg" // optional fallback frame
            />
            {/* Subtle dark gradient so text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 pointer-events-none" />
          </div>
        </div>

        {/* Centered banner card */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-white/85 backdrop-blur-sm shadow-xl rounded-xl max-w-3xl w-full mx-auto py-6 md:py-8 px-5 md:px-8 ring-1 ring-black/10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">
              Our Menu
            </h1>
            <p className="mt-4 text-lg md:text-xl font-semibold text-center text-gray-900">
              USE <span className="text-red-900">GH20</span>{" "}
              PROMOCODE FOR <span className="text-red-900">20% OFF</span> ENTIRE ONLINE PURCHASE
            </p>
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