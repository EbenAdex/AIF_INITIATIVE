
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiUsers } from "react-icons/fi";
import CountUpStats from "../common/CountUpStats";
import "../../styles/call-to-action.css";

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>

      <div className="container cta-container">
        <div className="cta-left">
          <span className="cta-tag">
            Together We Can Make A Difference
          </span>

          <h2>
            Help Us Create Lasting Impact Across Communities
          </h2>

          <p>
            Join AIF Initiative in empowering lives through education, 
            healthcare support, humanitarian outreach, and sustainable 
            development programs.
          </p>

          <div className="cta-buttons">
            <Link to="/donors" className="cta-btn-wrapper">
              <button className="cta-primary-btn">
                <FiHeart size={18} />
                Donate Now
              </button>
            </Link>

            <Link to="/contact" className="cta-btn-wrapper">
              <button className="cta-secondary-btn">
                <FiUsers size={18} />
                Become A Volunteer
              </button>
            </Link>
          </div>
        </div>

        <div className="cta-right">
          <div className="cta-card">
            <div className="cta-stat">
              <h3>
  <CountUpStats end={5000} suffix="+" />
</h3>
              <p>Lives Impacted</p>
            </div>
            <div className="cta-stat">
              <h3>
  <CountUpStats end={50000000} suffix="+" />
</h3>
              <p>Distributed</p>
            </div>
            <div className="cta-stat">
              <h3>
  <CountUpStats end={30} suffix="+" />
</h3>
              <p>Communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
