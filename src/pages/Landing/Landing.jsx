import { Link } from "react-router-dom";

import AboutBanner from "../../assets/images/about-image.png";
import StoryImage from "../../assets/images/story-image.png";

import "../../styles/landing.css";

function Landing() {
  return (
    <section className="landing">
      {/* HERO */}

      <div className="landing-hero">
        <div className="landing-overlay"></div>

        <div className="container landing-hero-container">
          <div className="landing-left">
            <span className="landing-tag">
              AIF Humanitarian Initiative
            </span>

            <h1>
              Empowering Communities Through
              Scholarships, Healthcare &
              Humanitarian Support
            </h1>

            <p>
              We are committed to creating lasting impact
              through education, healthcare outreach,
              humanitarian aid, and community empowerment.
            </p>

            <div className="landing-buttons">
              <Link to="/register">
                <button className="landing-primary-btn">
                  Join The Initiative
                </button>
              </Link>

              <Link to="/scholarship">
                <button className="landing-secondary-btn">
                  Explore Scholarships
                </button>
              </Link>
            </div>
          </div>

          <div className="landing-right">
            <div className="landing-image-card">
              <img
                src={AboutBanner}
                alt="Community Outreach"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}

      <section className="landing-mission">
        <div className="container mission-container">
          <div className="mission-image">
            <img
              src={StoryImage}
              alt="AIF Mission"
            />
          </div>

          <div className="mission-content">
            <span className="section-tag">
              Our Mission
            </span>

            <h2>
              Building Sustainable Impact
              Across Communities
            </h2>

            <p>
              AIF Initiative focuses on empowering lives
              through educational support, healthcare
              interventions, humanitarian outreach,
              and sustainable community programs.
            </p>

            <div className="mission-stats">
              <div className="mission-stat">
                <h3>1000+</h3>
                <span>Lives Impacted</span>
              </div>

              <div className="mission-stat">
                <h3>20+</h3>
                <span>Communities Reached</span>
              </div>

              <div className="mission-stat">
                <h3>15+</h3>
                <span>Programs Executed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP PREVIEW */}

      <section className="landing-scholarships">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              Opportunities
            </span>

            <h2>
              Scholarships Designed To
              Empower The Future
            </h2>
          </div>

          <div className="landing-scholarship-grid">
            <div className="landing-scholarship-card">
              <span>Undergraduate Scholarship</span>

              <h3>Full Tuition Support</h3>

              <p>
                Financial assistance for outstanding
                students across multiple disciplines.
              </p>

              <Link to="/register">
                <button>
                  Register To Apply
                </button>
              </Link>
            </div>

            <div className="landing-scholarship-card">
              <span>Healthcare Grant</span>

              <h3>Medical Support Program</h3>

              <p>
                Empowering healthcare students and
                medical outreach initiatives.
              </p>

              <Link to="/register">
                <button>
                  Register To Apply
                </button>
              </Link>
            </div>

            <div className="landing-scholarship-card">
              <span>Community Development</span>

              <h3>Youth Empowerment Fund</h3>

              <p>
                Supporting innovative youth-led
                community development programs.
              </p>

              <Link to="/register">
                <button>
                  Register To Apply
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="landing-cta">
        <div className="container landing-cta-container">
          <h2>
            Become Part Of A Movement
            Focused On Real Impact
          </h2>

          <p>
            Register today to access scholarships,
            community initiatives, and humanitarian
            opportunities.
          </p>

          <Link to="/register">
            <button className="landing-cta-btn">
              Create Account
            </button>
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Landing;