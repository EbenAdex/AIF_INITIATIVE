import { useEffect, useState } from "react";
import SectionHeader from "../common/SectionHeader";
import Program1 from "../../assets/images/Education2.jpg";
import Program2 from "../../assets/images/Healthcare2.jpg";
import Program3 from "../../assets/images/Community2.jpg";

import "../../styles/programs.css";

function Programs() {
  const images = [Program1, Program2, Program3];

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
    <section className="programs">
      {/* BACKGROUND SLIDER */}
      <div className="programs-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`program-slide ${
              index === currentImage ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
      </div>

      {/* OVERLAY */}
      <div className="programs-overlay"></div>

      <div className="container programs-content">
        {/* HEADER */}
        <SectionHeader
          tag="Featured Programs"
          title="Programs Designed To Transform Lives"
          light
          icon="programs"
        />

        {/* GRID */}
        <div className="programs-grid">
          <div className="program-card">
            <h3>Scholarship Initiative</h3>

            <p>
              Supporting students with educational opportunities
              and financial assistance programs.
            </p>
          </div>

          <div className="program-card">
            <h3>Healthcare Support</h3>

            <p>
              Providing healthcare assistance and medical outreach
              initiatives to underserved communities.
            </p>
          </div>

          <div className="program-card">
            <h3>Community Outreach</h3>

            <p>
              Delivering humanitarian support and impactful
              community development initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Programs;