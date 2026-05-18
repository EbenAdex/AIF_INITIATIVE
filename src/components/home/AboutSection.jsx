import AboutImage from "../../assets/images/education.jpg";

import "../../styles/about-section.css";

function AboutSection() {
  return (
    <section className="about-section">
      <div className="container about-container">
        {/* IMAGE */}
        <div className="about-image"
        data-aos="fade-right">
          <img
            src={AboutImage}
            alt="AIF Initiative Humanitarian Support"
          />
        </div>

        {/* CONTENT */}
        <div className="about-content"
        data-aos="fade-left">
          <span className="section-tag">
            About AIF Initiative
          </span>

          <h2>
            Building Hope Through Humanitarian &
            Community Impact Initiatives
          </h2>

          <p>
            AIF Initiative is a humanitarian foundation committed
            to improving lives through educational support,
            healthcare assistance, youth empowerment, community
            outreach, and sustainable development initiatives.
          </p>

          <p>
            We believe lasting transformation begins when
            communities are empowered with opportunities,
            support systems, and resources that inspire growth,
            dignity, and hope.
          </p>

          <button>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;