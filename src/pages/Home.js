import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const VIDEO_SOURCES = ["/gyro3.mp4", "/gyro5.mp4", "/gyro2.mp4", "/gyro4.mp4", "/gyro1.mp4"];

/* ----------------- helpers ----------------- */
function useAutoplayOnce(ref) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => { });
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

/* ---------- Mobile Reel (smooth cross-fade) ---------- */
const MobileReel = () => {
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState(0); // 0 = A visible, 1 = B visible

  const aRef = useRef(null);
  const bRef = useRef(null);

  useAutoplayOnce(aRef);
  useAutoplayOnce(bRef);

  // init first video
  useEffect(() => {
    const vA = aRef.current;
    if (!vA) return;
    vA.src = VIDEO_SOURCES[0];
    vA.load();
    vA.play().catch(() => { });
  }, []);

  const loadAndPlay = (videoEl, src) => {
    if (!videoEl) return;
    videoEl.src = src;
    videoEl.load();
    videoEl.play().catch(() => { });
  };

  // wrap in useCallback so eslint is happy and listeners are stable
  const switchTo = useCallback(
    (nextIdx) => {
      if (nextIdx === idx) return;

      const showB = active === 0;
      const hiddenEl = showB ? bRef.current : aRef.current;

      // prepare hidden video
      loadAndPlay(hiddenEl, VIDEO_SOURCES[nextIdx]);

      // fade in once ready (or after a short fallback)
      const onCanPlay = () => requestAnimationFrame(() => setActive(showB ? 1 : 0));
      hiddenEl && hiddenEl.addEventListener("canplay", onCanPlay, { once: true });
      const t = setTimeout(() => setActive(showB ? 1 : 0), 150);

      setIdx(nextIdx);

      // cleanup fallback timer on next tick
      setTimeout(() => clearTimeout(t), 0);
    },
    [active, idx]
  );

  const onEnded = () => switchTo((idx + 1) % VIDEO_SOURCES.length);

  // swipe support
  useEffect(() => {
    const el = active === 0 ? aRef.current : bRef.current;
    if (!el) return;
    let startX = 0;
    const onTouchStart = (e) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) switchTo((idx - 1 + VIDEO_SOURCES.length) % VIDEO_SOURCES.length);
      if (dx < -40) switchTo((idx + 1) % VIDEO_SOURCES.length);
    };
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [active, idx, switchTo]);

  return (
    <div className="md:hidden px-4 mt-6">
      <div className="relative max-w-sm mx-auto">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
          {/* Clickable overlay */}
          <Link to="/menu" aria-label="Open menu" className="absolute inset-0 z-20" />

          {/* Video A */}
          <video
            ref={aRef}
            muted
            playsInline
            autoPlay
            preload="auto"
            fetchpriority="high"
            decoding="async"
            onEnded={onEnded}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${active === 0 ? "opacity-100" : "opacity-0"
              }`}
          />

          {/* Video B */}
          <video
            ref={bRef}
            muted
            playsInline
            autoPlay
            preload="auto"
            fetchpriority="high"
            decoding="async"
            onEnded={onEnded}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${active === 1 ? "opacity-100" : "opacity-0"
              }`}
          />
        </div>

        {/* Dots */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
          {VIDEO_SOURCES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to video ${i + 1}`}
              onClick={() => switchTo(i)}
              className={`h-2 w-2 rounded-full ${i === idx ? "bg-black/80" : "bg-black/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Desktop grid (edge-to-edge, 5 across on xl) ---------- */
const DesktopGrid = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting && el?.play) el.play().catch(() => { });
          else if (el?.pause) el.pause();
        });
      },
      { threshold: 0.25 }
    );
    videoRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hidden md:block py-8 bg-gradient-to-b from-white to-yellow-50">
      {/* Full-bleed wrapper */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <h3 className="text-center text-3xl font-bold mb-8">Fresh Off the Grill</h3>

        {/* 3 cols (md), 4 cols (lg), 5 cols (xl+) */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6 px-2 md:px-4">
          {VIDEO_SOURCES.map((src, i) => (
            <div
              key={src + i}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 transform transition hover:-translate-y-1"
            >
              {/* Clickable overlay */}
              <Link to="/menu" aria-label="Open menu" className="absolute inset-0 z-10" />
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={src}
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                fetchpriority="high"
                decoding="async"
                className="pointer-events-none h-full w-full object-cover transition scale-105 group-hover:scale-110"
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
      audio.play().catch(() => { });
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

          <h2 className="text-lg md:text-3xl font-extrabold mb-4 tracking-wide text-black">
            <strong className="text-red-900">Crazy Everyday Special </strong>
            <strong className="text-blue-950">
              BEEF / CHICKEN / HERO COMBO ​GYRO OVER RICE & SALAD FOR ONLY
            </strong>
            <strong className="text-red-900"> $5.99</strong>
          </h2>

          {/* 👇 Centered Image */}
          <div className="flex justify-center mb-4">
            <img
              src="/specialcombo.png"
              alt="Gyros Hero Special Combo"
              className="w-32 h-auto"
            />
          </div>

          <p className="text-slate-900 pb-2">
            No other Purchases needed, No limited amount to order, No joke 😉
            No Wonder we Are Called The Hidden Gem Of Houston Halal Food!!
          </p>

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

      {/* Reels on Top */}
      <section className="bg-gradient-to-b from-yellow-50 to-white pt-6 pb-10">
        <h3 className="text-center text-2xl md:text-3xl font-bold mb-6 md:hidden">
          Fresh Off the Grill
        </h3>
        <MobileReel />
        <DesktopGrid />
      </section>

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