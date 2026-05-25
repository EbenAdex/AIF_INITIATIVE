import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

import Main_AIF from "../../assets/images/Main_AIF.png";

import "../../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* LOGO */}
        <Link to="/" className="logo">
          <div className="logo-image">
            <img src={Main_AIF} alt="AIF Initiative Logo" />
          </div>

          <div className="logo-text">
            <h2>AIF Initiative</h2>
            <span>Impact Through Knowledge</span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
          <NavLink to="/scholarship" className={({ isActive }) => (isActive ? "active" : "")}>
            Scholarship
          </NavLink>
          <NavLink to="/donors" className={({ isActive }) => (isActive ? "active" : "")}>
            Donors
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>
            Events
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="nav-actions">
          <button className="search-btn">
            <FiSearch />
          </button>

          <Link to="/scholarship" className="volunteer-btn">
            Apply
          </Link>

          <button className="donate-btn">
            Donate
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
