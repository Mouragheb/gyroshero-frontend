import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#FAC31B] text-black py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <img
              src="/images/gyroshero-logo.png"
              alt="Gyros Hero Logo"
              className="h-14 w-auto"
            />
            <span className="text-2xl font-bold uppercase tracking-wide">
              Gyros Hero
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm font-semibold">
            <a href="/about" className="hover:text-white transition duration-200">About Us</a>
            <a href="/contact" className="hover:text-white transition duration-200">Contact</a>
            <a
              href="https://www.instagram.com/gyrosherotx/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-200"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-8 border-t border-black pt-6 text-sm text-center">
          &copy; {new Date().getFullYear()} Gyros Hero. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;