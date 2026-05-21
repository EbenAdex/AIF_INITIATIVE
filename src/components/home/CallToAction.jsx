import { Link } from "react-router-dom";

import CTAImage from "../../assets/images/calltoaction.jpg";

import "../../styles/call-to-action.css";

function CallToAction() {
  return (
    <section
      className="cta-section"
      style={{
        backgroundImage: `url(${CTAImage})`,
      }}
    >
      <div className="cta-overlay"></div>

      <div className="container cta-content">
        <span>
          Together We Can Make A Difference
        </span>

        <h2>
          Help Us Create Lasting Impact Across
          Communities
        </h2>

        <p>
          Join AIF Initiative in empowering lives through
          education, healthcare support, humanitarian outreach,
          and sustainable development programs.
        </p>

        <div className="cta-buttons">
          <Link to="/donors">
            <button className="cta-primary-btn">
              Donate Now
            </button>
          </Link>

          <Link to="/contact">
            <button className="cta-secondary-btn">
              Become A Volunteer
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;