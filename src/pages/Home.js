import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.05; // Set volume VERY LOW (5%)
            
            const playAudio = () => {
                audio.play().catch(error => console.log("Autoplay blocked:", error));
                document.removeEventListener("click", playAudio); // Remove event listener after first click
            };

            // Try autoplay on mount
            audio.play().catch(() => {
                // If autoplay fails, wait for user interaction
                document.addEventListener("click", playAudio);
            });
        }
    }, []);

    return (
        <div className="home-container">
            <header className="hero-section">
                {/* 
                <img src="/images/gyroshero-logo.png" alt="Gyros Hero Logo" className="hero-logo" />
                <h1>Welcome to Gyros Hero</h1>
                <p>Authentic Mediterranean flavors made with passion.</p>*/}
                <Link to="/menu" className="btn">View Menu</Link>

                {/* 🎵 Hidden Background Audio */}
                <audio ref={audioRef} loop>
                    <source src="/audio/gh-anthem1.mp3" type="audio/mp3" />
                </audio>
            </header>

            <section className="about-section">
                <h2>Gyros Hero</h2>
                <p>The Hero of the All Gyros in H-Town!</p>
            </section>
        </div>
    );
};

export default Home;