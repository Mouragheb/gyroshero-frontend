import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Directly use the public folder path */}
        <img src="/images/gyroshero-logo.png" alt="Gyros Hero Logo" className="footer-logo" />
        <p>&copy; {new Date().getFullYear()} Gyros Hero. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="https://www.instagram.com/gyrosherotx/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;