import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact"
import About from "./pages/About"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
      </div>
  );
}

export default App;