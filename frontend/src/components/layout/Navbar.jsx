import { useEffect, useRef, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  HiOutlineMenuAlt3,
  HiX,
} from "react-icons/hi";

import {
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";

import Main_AIF from "../../assets/images/Main_AIF.png";

import { useAuth } from "../../context/AuthContext";

import "../../styles/navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const dropdownRef = useRef();

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  /* CLOSE MOBILE MENU ON ROUTE CHANGE */

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  /* NAVBAR SCROLL EFFECT */

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  /* CLOSE DROPDOWN WHEN CLICKING OUTSIDE */

  useEffect(() => {

    const handleOutsideClick = (e) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

  }, []);

  /* LOGOUT */

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (
    <header
      className={`navbar ${
        scrolled ? "scrolled" : ""
      }`}
    >

      <div className="container navbar-container">

        {/* LOGO */}

        <Link to="/" className="logo">

          <div className="logo-image">

            <img
              src={Main_AIF}
              alt="AIF Initiative Logo"
            />

          </div>

          <div className="logo-text">

            <h2>AIF Initiative</h2>

            <span>
              Impact Through Humanity
            </span>

          </div>

        </Link>

        {/* NAVIGATION */}

        <nav
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >

          <Link to="/home">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/scholarship">
            Scholarships
          </Link>

          <Link to="/events">
            Events
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </nav>

        {/* ACTIONS */}

        <div className="nav-actions">

          <button className="search-btn">
            <FiSearch />
          </button>

          {!user ? (

            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="donate-btn"
              >
                Register
              </Link>
            </>

          ) : (

            <div
              className="user-menu-wrapper"
              ref={dropdownRef}
            >

              <button
                className="user-menu-trigger"
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
              >

                <div className="user-avatar">

                  {user?.fullname
                    ?.charAt(0)
                    ?.toUpperCase() || "A"}

                </div>

                <FiChevronDown className="dropdown-icon" />

              </button>

              {profileOpen && (

                <div className="user-dropdown">

                  <div className="dropdown-user-info">

                    <div className="dropdown-avatar">

                      {user?.fullname
                        ?.charAt(0)
                        ?.toUpperCase() || "A"}

                    </div>

                    <div>

                      <h4>
                        {user?.fullname ||
                          "AIF User"}
                      </h4>

                      <p>
                        {user?.email}
                      </p>

                    </div>

                  </div>

                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/scholarship">
                    My Applications
                  </Link>

                  <button
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

        {/* MOBILE MENU */}

        <div
          className="mobile-menu"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {menuOpen ? (
            <HiX />
          ) : (
            <HiOutlineMenuAlt3 />
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;