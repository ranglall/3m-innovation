import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo192.png";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-logo">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </NavLink>
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/air-quality" onClick={() => setMenuOpen(false)}>
          Air Quality
        </NavLink>
        <NavLink to="/our-story" onClick={() => setMenuOpen(false)}>
          Our Story
        </NavLink>
        <NavLink to="/team" onClick={() => setMenuOpen(false)}>
          Team
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}