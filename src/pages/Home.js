import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const VIDEO_SOURCES = ["/gyro1.mp4", "/gyro2.mp4", "/gyro3.mp4"];

/* ----------------- helpers ----------------- */
function useAutoplayOnce(ref) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();

    const onUserInteract = () => {
      tryPlay();
      document.removeEventListener("click", onUserInteract);
      document.removeEventListener("touchstart", onUserInteract);
    };

    document.addEventListener("click", onUserInteract);
    document.addEventListener("touchstart", onUserInteract);

    return () => {
      document.removeEventListener("click", onUserInteract);
      document.removeEventListener("touchstart", onUserInteract);
    };
  }, [ref]);
}

/* ---------- Mobile Reel ---------- */
const MobileReel = () => {
  const [idx, setIdx] = useState(0);
  const videoRef = useRef(null);
  useAutoplayOnce(videoRef);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = VIDEO_SOURCES[idx];
    v.load();
    v.play().catch(() => {});
  }, [idx, videoRef]);

  const onEnded = () => setIdx((i) => (i + 1) % VIDEO_SOURCES.length);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    let startX = 0;
    const onTouchStart = (e) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) setIdx((i) => (i - 1 + VIDEO_SOURCES.length) % VIDEO_SOURCES.length);
      if (dx < -40) setIdx((i) => (i + 1) % VIDEO_SOURCES.length);
    };
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [videoRef]);

  return (
    <div className="md:hidden px-4 mt-6">
      <div className="relative max-w-sm mx-auto">
        <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
          <video
            key={idx}
            ref={videoRef}
            muted
            playsInline
            autoPlay
            preload="metadata"
            onEnded={onEnded}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
          {VIDEO_SOURCES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to video ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${i === idx ? "bg-black/80" : "bg-black/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Desktop grid ---------- */
const DesktopGrid = () => {
  const v1 = useRef(null);
  const v2 = useRef(null);
  const v3 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting && el && el.play) el.play().catch(() => {});
          else if (el && el.pause) el.pause();
        });
      },
      { threshold: 0.25 }
    );

    const els = [v1.current, v2.current, v3.current].filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [v1, v2, v3]);

  return (
    <div className="hidden md:block py-8 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-center text-3xl font-bold mb-8">Fresh Off the Grill</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {VIDEO_SOURCES.map((src, i) => (
            <div
              key={src}
              className="group aspect-[9/16] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 transform transition will-change-transform hover:-translate-y-1"
            >
              <video
                ref={[v1, v2, v3][i]}
                src={src}
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
                className="h-full w-full object-cover transition scale-105 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Home Page ---------- */
const Home = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.05;

    const playAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };

    audio.play().catch(() => {
      document.addEventListener("click", playAudio);
      document.addEventListener("touchstart", playAudio);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reels on Top */}
      <section className="bg-gradient-to-b from-yellow-50 to-white pt-6 pb-10">
        <h3 className="text-center text-2xl md:text-3xl font-bold mb-6 md:hidden">
          Fresh Off the Grill
        </h3>
        <MobileReel />
        <DesktopGrid />
      </section>

      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[500px] flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-md">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide text-black">
            Welcome to Gyros Hero
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-800 mb-6">
            Authentic Mediterranean flavors made with passion.
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-wide text-black">
            USE <strong className="text-red-900">GH20 </strong>
            <strong className="text-blue-950">PROMOCODE </strong>FOR{" "}
            <strong className="text-red-900">20% OFF</strong> ENTIRE ONLINE PURCHASE
          </h2>

          <Link
            to="/menu"
            className="bg-[#FAC31B] hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            View Menu
          </Link>
        </div>

        <audio ref={audioRef} loop muted>
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