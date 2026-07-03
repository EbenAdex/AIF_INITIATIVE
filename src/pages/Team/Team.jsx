import "../../styles/team.css";
import { Link } from "react-router-dom";
import { FiUsers, FiAward, FiHeart, FiGlobe, FiTarget } from "react-icons/fi";

function Team() {
  const leadershipTeam = [
    {
      id: 1,
      name: "Adedoyin Adesanya",
      role: "Founder & Executive Director",
      image: "https://i.ibb.co/CKGtFpd6/Adesanya.jpg",
      bio: "Provides strategic leadership and drives the vision of AIF Initiative through impactful humanitarian programs and sustainable community development."
    },
    {
      id: 2,
      name: "Olanrewaju Dipeolu",
      role: "Social Media Coordinator",
      image: "https://via.placeholder.com/300",
      bio: "Leads digital communication strategy, social engagement, content development and brand visibility across all AIF platforms."
    },
    {
      id: 3,
      name: "Aderibigbe Ayomiposi",
      role: "Director of Technology",
      image: "https://i.ibb.co/RkJYVZgK/Ayomiposi.jpg",
      bio: "Oversees AIF's technology infrastructure, digital platforms, software systems and innovation strategy."
    }
  ];

  return (
    <div className="team-page">

      <section className="team-hero">
        <div className="container">
          <span className="team-tag">MEET THE TEAM</span>

          <h1>
            The People Behind
            <span> AIF Initiative</span>
          </h1>

          <p>
            Dedicated professionals, volunteers and leaders working together
            to create sustainable impact through education, healthcare and
            humanitarian outreach.
          </p>
        </div>
      </section>

      <section className="founder-section">
        <div className="container founder-container">

          <div className="founder-image">
            <img
              src="https://i.ibb.co/CKGtFpd6/Adesanya.jpg"
              alt="Founder"
            />
          </div>

          <div className="founder-content">

            <span className="section-badge">
              Founder Spotlight
            </span>

            <h2>Adedoyin Adesanya</h2>

            <h4>Founder & Executive Director</h4>

            <p>
              A visionary humanitarian leader committed to empowering
              communities through education, healthcare support,
              scholarships and sustainable development initiatives.
            </p>

            <Link to="/contact" className="team-btn">
              Contact Leadership
            </Link>

          </div>

        </div>
      </section>

      <section className="leadership-section">
        <div className="container">

          <div className="section-header">
            <span>Leadership Team</span>
            <h2>Meet Our Leadership</h2>

            <p>
              The dedicated individuals responsible for advancing
              the mission and vision of AIF Initiative.
            </p>
          </div>

          <div className="team-grid">

            {leadershipTeam.map((member) => (
              <div className="team-card" key={member.id}>

                <div className="team-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                  />
                </div>

                <h3>{member.name}</h3>

                <div className="role-badge">
                  {member.role}
                </div>

                <p>{member.bio}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="department-section">
        <div className="container">

          <div className="section-header">
            <span>Departments</span>
            <h2>How We Operate</h2>
          </div>

          <div className="department-grid">

            <div className="department-card">
              <FiTarget />
              <h3>Programs & Outreach</h3>
              <p>
                Coordinates scholarships, healthcare initiatives,
                volunteer activities and humanitarian interventions.
              </p>
            </div>

            <div className="department-card">
              <FiGlobe />
              <h3>Media & Communications</h3>
              <p>
                Handles branding, public relations,
                awareness campaigns and social media engagement.
              </p>
            </div>

            <div className="department-card">
              <FiUsers />
              <h3>Technology Department</h3>
              <p>
                Responsible for AIF digital platforms,
                software systems, cybersecurity and innovation.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="journey-section">
        <div className="container">

          <div className="section-header">
            <span>Our Journey</span>
            <h2>Milestones</h2>
          </div>

          <div className="timeline">

            <div className="timeline-item">
              <h3>2024</h3>
              <p>AIF Initiative was established.</p>
            </div>

            <div className="timeline-item">
              <h3>2025</h3>
              <p>First scholarship beneficiaries supported.</p>
            </div>

            <div className="timeline-item">
              <h3>2026</h3>
              <p>Expanded humanitarian outreach nationwide.</p>
            </div>

          </div>

        </div>
      </section>

      <section className="volunteer-section">
        <div className="container">

          <div className="section-header">
            <h2>Our Impact Network</h2>

            <p>
              Volunteers remain the backbone of our success.
            </p>
          </div>

          <div className="volunteer-stats">

            <div className="volunteer-card">
              <FiUsers />
              <h3>50+</h3>
              <p>Volunteers</p>
            </div>

            <div className="volunteer-card">
              <FiHeart />
              <h3>30+</h3>
              <p>Communities Reached</p>
            </div>

            <div className="volunteer-card">
              <FiAward />
              <h3>100+</h3>
              <p>Projects Completed</p>
            </div>

          </div>

        </div>
      </section>

      <section className="team-cta">
        <div className="container">

          <h2>Join Our Mission</h2>

          <p>
            Become part of a growing movement creating
            lasting impact across communities.
          </p>

          <div className="cta-buttons">

            <Link
              to="/contact"
              className="cta-primary"
            >
              Become A Volunteer
            </Link>

            <Link
              to="/donors"
              className="cta-secondary"
            >
              Support Our Mission
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Team;