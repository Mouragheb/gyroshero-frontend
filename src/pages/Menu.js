import React, { useState, useEffect } from "react";

const Menu = () => {
  const [categorizedItems, setCategorizedItems] = useState({});

  useEffect(() => {
    fetch("https://gyroshero-backend.onrender.com/api/menu")
      .then((response) => response.json())
      .then((data) => {
        const categories = {};
        data.forEach((item) => {
          if (!categories[item.category]) {
            categories[item.category] = [];
          }
          categories[item.category].push(item);
        });
        setCategorizedItems(categories);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  return (
    <div className="bg-white min-h-screen px-4 md:px-8 lg:px-16 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Our Menu
      </h1>
      <p className="text-lg md:text-xl text-center font-medium text-gray-800 mb-6">
        Make sure to use PromoCode: <strong className="text-3xl text-red-900">GH20 for a 20% off</strong> all you purchase.
      </p>

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
                  onError={(e) => { e.target.src = "/images/fallback.jpg" }}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  ${item.price.toFixed(2)}
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
  );
};

export default Menu;