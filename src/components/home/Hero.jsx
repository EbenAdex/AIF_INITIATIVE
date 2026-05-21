import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Hero1 from "../../assets/images/education.jpg";
import Hero2 from "../../assets/images/healthcare.jpg";
import Hero3 from "../../assets/images/empowerment.jpg";

import "../../styles/home.css";

function Hero() {
  const images = [Hero1, Hero2, Hero3];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(slider);
  }, [images.length]);

  return (
    <section className="hero">
      {/* BACKGROUND SLIDER */}
      <div className="hero-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${
              index === currentImage ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
      </div>

      {/* DARK OVERLAY */}
      <div className="hero-overlay"></div>

      {/* CONTENT */}
      <div className="container hero-content">
        <span className="hero-tag">
          Transforming Lives Through Sustainable Impact
        </span>

        <h1>
          Building Stronger Communities Through Education,
          Healthcare & Humanitarian Support
        </h1>

        <p>
          AIF Initiative is committed to creating lasting impact
          across communities through education, healthcare,
          empowerment, humanitarian outreach, and sustainable
          development initiatives.
        </p>

        {/* BUTTONS */}
        <div className="hero-buttons">
          <Link to="/scholarship">
            <button className="hero-primary-btn">
              Apply for Scholarship
            </button>
          </Link>

          <Link to="/about">
            <button className="hero-secondary-btn">
              Learn More
            </button>
          </Link>
        </div>

        {/* STATS */}
        <div className="hero-stats">
          <div className="stat-card">
            <h3>20+</h3>
            <span>Communities Impacted</span>
          </div>

          <div className="stat-card">
            <h3>5+</h3>
            <span>Support Initiatives</span>
          </div>

          <div className="stat-card">
            <h3>1000+</h3>
            <span>Lives Reached</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;