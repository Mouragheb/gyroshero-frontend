import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.05;

      const playAudio = () => {
        audio.play().catch((error) => console.log("Autoplay blocked:", error));
        document.removeEventListener("click", playAudio);
      };

      audio.play().catch(() => {
        document.addEventListener("click", playAudio);
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[500px] flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide text-black">
            Welcome to Gyros Hero
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-800 mb-6">
            Authentic Mediterranean flavors made with passion.
          </p>
          <p className="text-lg md:text-xl text-center font-medium text-gray-800 mb-6">
            Make sure to use PromoCode: <strong className="text-3xl text-red-900">GH20 for a 20% off</strong> all you purchase.
          </p>
          <Link
            to="/menu"
            className="bg-[#FAC31B] hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            View Menu
          </Link>
        </div>

        {/* Hidden Background Audio */}
        <audio ref={audioRef} loop>
          <source src="/audio/gh-anthem1.mp3" type="audio/mp3" />
        </audio>
      </header>

      {/* About Section */}
      <section className="bg-white text-center py-16 px-4">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Gyros Hero</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The Hero of All Gyros in H-Town!
        </p>
      </section>
    </div>
  );
};

export default Home;