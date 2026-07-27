import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiUsers, FiGlobe, FiTarget } from "react-icons/fi";
import CountUpStats from "../../components/common/CountUpStats";
import AboutBanner from "../../assets/images/Hero-image.jpg";
import StoryImage from "../../assets/images/empowerment.jpg";

import "../../styles/landing.css";

function Landing() {
  return (
    <section className="landing">
      {/* HERO SECTION */}
      <div className="landing-hero">
        <div className="landing-overlay"></div>

        <div className="container landing-hero-container">
          <div className="landing-left">
            <span className="landing-tag">
              Welcome to AIF Initiative
            </span>

            <h1>
              Transform Lives Through
              Education, Healthcare &
              Humanitarian Impact
            </h1>

            <p className="hero-subtitle">
              Join a global movement dedicated to empowering communities. 
              Access scholarships, healthcare support, and opportunities 
              to make a meaningful difference.
            </p>

           <div className="landing-buttons">
  <Link to="/login" className="btn-wrapper">
    <button className="landing-primary-btn">
      Get Started <FiArrowRight size={18} />
    </button>
  </Link>
 
  <Link to="/login" className="btn-wrapper">
    <button className="landing-secondary-btn">
      Explore Programs
    </button>
  </Link>
</div>

            <div className="hero-features">
              <div className="feature">
                <FiCheck size={16} />
                <span>100% Free Scholarships</span>
              </div>
              <div className="feature">
                <FiCheck size={16} />
                <span>Healthcare Support</span>
              </div>
              <div className="feature">
                <FiCheck size={16} />
                <span>Community Programs</span>
              </div>
            </div>
          </div>

          <div className="landing-right">
            <div className="landing-image-card">
              <img src={AboutBanner} alt="Community Outreach" />
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="landing-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>
  <CountUpStats end={500} suffix="+" />
</h3>
              <p>Lives Positively Impacted</p>
              <span>Across multiple countries</span>
            </div>
            <div className="stat-item">
              <h3>
  <CountUpStats end={50000000} suffix="+" />
</h3>
              <p>Scholarships Awarded</p>
              <span>In educational support</span>
            </div>
            <div className="stat-item">
              <h3>
  <CountUpStats end={30} suffix="+" />
</h3>
              <p>Communities Reached</p>
              <span>Through our programs</span>
            </div>
            <div className="stat-item">
              <h3>
  <CountUpStats end={95} suffix="%" />
</h3>
              <p>Success Rate</p>
              <span>Program completion</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT CTA SECTION */}
     <section className="landing-cta">
  <div className="container">

    <span className="cta-tag">
      Together We Can Make A Difference
    </span>

    <h2 className="cta-title">
      Help Us Create Lasting Impact Across Communities
    </h2>

    <p className="cta-description">
      Join AIF Initiative in empowering lives through
      education, healthcare support, humanitarian outreach,
      and sustainable development programs.
    </p>

    <div className="cta-buttons">
      <Link to="/donors">
        <button className="landing-cta-btn primary">
          Donate Now
        </button>
      </Link>

      <Link to="/contact">
        <button className="landing-cta-btn secondary">
          Become A Volunteer
        </button>
      </Link>
    </div>

    <div className="cta-stats">
      <div className="cta-stat">
        <h3>5,000+</h3>
        <p>Lives Impacted</p>
      </div>

      <div className="cta-stat">
        <h3>₦50M+</h3>
        <p>Distributed</p>
      </div>

      <div className="cta-stat">
        <h3>30+</h3>
        <p>Communities</p>
      </div>
    </div>

  </div>
</section>
      {/* MISSION SECTION */}
      <section className="landing-mission">
        <div className="container mission-container">
          <div className="mission-image">
            <img src={StoryImage} alt="AIF Mission" />
          </div>

          <div className="mission-content">
            <span className="section-tag">
              Our Mission
            </span>

            <h2>
              Empowering Futures Through
              Inclusive Development
            </h2>

            <p>
              AIF Initiative is committed to creating sustainable impact through 
              strategic interventions in education, healthcare, and community development. 
              We believe every individual deserves the opportunity to reach their full potential.
            </p>

            <div className="mission-objectives">
              <div className="objective">
                <FiTarget size={24} />
                <div>
                  <h4>Educational Excellence</h4>
                  <p>Providing scholarships and academic support to deserving students</p>
                </div>
              </div>
              <div className="objective">
                <FiGlobe size={24} />
                <div>
                  <h4>Community Development</h4>
                  <p>Building sustainable programs that strengthen communities</p>
                </div>
              </div>
              <div className="objective">
                <FiUsers size={24} />
                <div>
                  <h4>Healthcare Access</h4>
                  <p>Ensuring quality healthcare reaches underserved populations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="landing-scholarships">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              Our Programs
            </span>

            <h2>
              Transformative Opportunities
              For Every Aspiration
            </h2>

            <p>
              Choose from our diverse range of scholarships and programs tailored 
              to support your educational and career goals.
            </p>
          </div>

          <div className="landing-scholarship-grid">
            <div className="landing-scholarship-card">
              <div className="card-icon">🎓</div>
              <h3>Full Scholarship Program</h3>
              <p>
                Comprehensive tuition and living cost support for high-achieving 
                students pursuing undergraduate and graduate degrees.
              </p>
              <ul className="card-features">
                <li><FiCheck size={16} /> 100% Tuition Coverage</li>
                <li><FiCheck size={16} /> Living Allowance</li>
                <li><FiCheck size={16} /> Mentorship Support</li>
              </ul>
              <Link to="/login">
                <button className="card-btn">
                  Learn More <FiArrowRight size={16} />
                </button>
              </Link>
            </div>

            <div className="landing-scholarship-card featured">
              <div className="featured-badge">Most Popular</div>
              <div className="card-icon">🏥</div>
              <h3>Healthcare Professional Grant</h3>
              <p>
                Specialized support for healthcare students and medical professionals 
                committed to serving underserved communities.
              </p>
              <ul className="card-features">
                <li><FiCheck size={16} /> 75% Tuition Support</li>
                <li><FiCheck size={16} /> Internship Placement</li>
                <li><FiCheck size={16} /> Certification Coverage</li>
              </ul>
              <Link to="/login">
                <button className="card-btn featured-btn">
                  Learn More <FiArrowRight size={16} />
                </button>
              </Link>
            </div>

            <div className="landing-scholarship-card">
              <div className="card-icon">🚀</div>
              <h3>Youth Empowerment Fund</h3>
              <p>
                Supporting innovative youth-led initiatives that drive social 
                change and community development.
              </p>
              <ul className="card-features">
                <li><FiCheck size={16} /> Project Funding</li>
                <li><FiCheck size={16} /> Leadership Training</li>
                <li><FiCheck size={16} /> Network Access</li>
              </ul>
              <Link to="/login">
                <button className="card-btn">
                  Learn More <FiArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="landing-why-us">
        <div className="container">
          <h2>Why Choose AIF Initiative?</h2>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-icon">✓</div>
              <h4>Transparent Process</h4>
              <p>Clear application process with timely feedback</p>
            </div>
            <div className="why-item">
              <div className="why-icon">✓</div>
              <h4>Expert Guidance</h4>
              <p>Personalized mentorship from industry leaders</p>
            </div>
            <div className="why-item">
              <div className="why-icon">✓</div>
              <h4>Proven Track Record</h4>
              <p>Decades of successful program implementations</p>
            </div>
            <div className="why-item">
              <div className="why-icon">✓</div>
              <h4>Community Network</h4>
              <p>Connect with thousands of like-minded individuals</p>
            </div>
          </div>
        </div>
      </section>


    </section>
  );
}

export default Landing;