import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/images/gyroshero-logo.png" alt="Gyros Hero Logo" />
                </Link>
            </div>

            {/* Hamburger Menu Toggle */}
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* Navigation Links */}
            <ul className={`navbar-links ${menuOpen ? "show" : ""}`}>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link></li>
                <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;