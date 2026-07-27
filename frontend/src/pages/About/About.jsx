import PageBanner from "../../components/common/PageBanner";
import AboutBanner from "../../assets/images/Hero-image.jpg";
import StoryImage from "../../assets/images/empowerment.jpg";
import "../../styles/about-page.css";
import SectionHeader from "../../components/common/SectionHeader";

function About() {
  return (
    <main className="about-page">
      {/* BANNER */}
      <section className="about-banner">
        <PageBanner
          title="About AIF Initiative"
          subtitle="Building sustainable impact through humanitarian outreach, education, healthcare support, and community development initiatives."
          backgroundImage={AboutBanner}
        />
      </section>

      {/* STORY SECTION */}
      <section className="about-story">
        <div className="container about-story-container">
          <div className="story-image" data-aos="fade-right">
            <img src={StoryImage} alt="AIF Initiative Story" />
          </div>

          <div className="story-content" data-aos="fade-left">
            <span className="section-tag">Our Story</span>
            <h2>Creating Lasting Change Across Communities</h2>
            <p>
              AIF Initiative was founded with the vision of empowering lives
              and transforming communities through sustainable humanitarian
              initiatives.
            </p>
            <p>
              Our mission extends beyond educational support. We are committed
              to improving access to healthcare, supporting vulnerable
              communities, empowering youth, and creating impactful programs
              that inspire hope and opportunity.
            </p>
            <p>
              Through strategic outreach, partnerships, and community-driven
              programs, AIF Initiative continues to create meaningful and
              lasting social impact.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision">
        <div className="container mission-grid">
          <div className="mission-card" data-aos="fade-up">
            <h3>Our Mission</h3>
            <p>
              To create sustainable impact through education, healthcare
              support, humanitarian outreach, and empowerment initiatives
              that improve lives and strengthen communities.
            </p>
          </div>
          <div className="mission-card" data-aos="fade-up" data-aos-delay="200">
            <h3>Our Vision</h3>
            <p>
              To become a leading humanitarian initiative known for
              transforming lives, empowering communities, and inspiring
              positive social development.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="core-values">
        <div className="container">
          <SectionHeader
            tag="Core Values"
            title="Principles That Guide Our Impact"
            icon="values"
          />
          <div className="values-grid">
            <div className="value-card" data-aos="zoom-in">
              <h3>Integrity</h3>
              <p>We remain transparent, accountable, and committed to ethical impact.</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="100">
              <h3>Compassion</h3>
              <p>We prioritize humanity, empathy, and community-centered solutions.</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="200">
              <h3>Empowerment</h3>
              <p>We create opportunities that help individuals and communities thrive.</p>
            </div>
            <div className="value-card" data-aos="zoom-in" data-aos-delay="300">
              <h3>Sustainability</h3>
              <p>We focus on long-term impact and sustainable development initiatives.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;