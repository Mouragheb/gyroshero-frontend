import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#FAC31B] text-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src="/images/gyroshero-logo.png" alt="Logo" className="h-12 w-auto" />
            </Link>
            <span className="ml-3 text-xl font-bold uppercase tracking-wider">Gyros Hero</span>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8 text-sm font-semibold">
            <li>
              <Link
                to="/"
                className={`transition ${isActive("/") ? "text-white underline" : "hover:text-white"
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className={`transition ${isActive("/menu") ? "text-white underline" : "hover:text-white"
                  }`}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`transition ${isActive("/contact") ? "text-white underline" : "hover:text-white"
                  }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`transition ${isActive("/about") ? "text-white underline" : "hover:text-white"
                  }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`transition ${isActive("/blog") ? "text-white underline" : "hover:text-white"
                  }`}
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col space-y-4 pb-4 text-sm font-semibold">
            {["/", "/menu", "/contact", "/about", "/blog"].map((path) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`transition ${isActive(path) ? "text-white underline" : "hover:text-white"
                    }`}
                >
                  {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;