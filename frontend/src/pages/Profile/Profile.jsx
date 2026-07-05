import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiAward,
  FiEdit2,
  FiUser,
} from "react-icons/fi";

import "../../styles/profile.css";

function Profile() {
  return (
    <section className="profile-page">

      {/* HEADER */}

      <div className="profile-banner">

        <div className="profile-overlay"></div>

        <div className="profile-banner-content">

          <div className="profile-avatar-wrapper">

            <div className="profile-avatar">
              A
            </div>

          </div>

          <div className="profile-user-info">

            <h1>AYO ADEMOLA</h1>

            <span>
              Frontend Developer & Scholarship Applicant
            </span>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="container profile-container">

        {/* STATS */}

        <div className="profile-stats">

          <div className="profile-stat-card">
            <h2>04</h2>
            <span>Applications</span>
          </div>

          <div className="profile-stat-card">
            <h2>02</h2>
            <span>Approved</span>
          </div>

          <div className="profile-stat-card">
            <h2>01</h2>
            <span>Pending Review</span>
          </div>

          <div className="profile-stat-card">
            <h2>85%</h2>
            <span>Profile Completion</span>
          </div>

        </div>

        {/* PROFILE GRID */}

        <div className="profile-grid">

          {/* LEFT */}

          <div className="profile-left">

            {/* PERSONAL INFO */}

            <div className="profile-card">

              <div className="profile-card-header">
                <h3>Personal Information</h3>

                <button>
                  <FiEdit2 />
                  Edit
                </button>
              </div>

              <div className="profile-info-list">

                <div className="profile-info-item">
                  <FiUser />

                  <div>
                    <h4>Full Name</h4>
                    <p>Ayo Ademola</p>
                  </div>
                </div>

                <div className="profile-info-item">
                  <FiMail />

                  <div>
                    <h4>Email Address</h4>
                    <p>ayo@gmail.com</p>
                  </div>
                </div>

                <div className="profile-info-item">
                  <FiPhone />

                  <div>
                    <h4>Phone Number</h4>
                    <p>+234 812 345 6789</p>
                  </div>
                </div>

                <div className="profile-info-item">
                  <FiMapPin />

                  <div>
                    <h4>Location</h4>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>

              </div>

            </div>

            {/* EDUCATION */}

            <div className="profile-card">

              <div className="profile-card-header">
                <h3>Academic Information</h3>
              </div>

              <div className="profile-info-list">

                <div className="profile-info-item">
                  <FiBookOpen />

                  <div>
                    <h4>Institution</h4>
                    <p>University of Lagos</p>
                  </div>
                </div>

                <div className="profile-info-item">
                  <FiAward />

                  <div>
                    <h4>Course</h4>
                    <p>Philosophy</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="profile-right">

            {/* ACTIVITY */}

            <div className="profile-card">

              <div className="profile-card-header">
                <h3>Recent Activities</h3>
              </div>

              <div className="activity-list">

                <div className="activity-item">
                  <div className="activity-dot"></div>

                  <div>
                    <h4>
                      Applied for Undergraduate Scholarship
                    </h4>

                    <span>2 days ago</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-dot"></div>

                  <div>
                    <h4>
                      Updated profile information
                    </h4>

                    <span>1 week ago</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-dot"></div>

                  <div>
                    <h4>
                      Uploaded supporting documents
                    </h4>

                    <span>2 weeks ago</span>
                  </div>
                </div>

              </div>

            </div>

            {/* ACCOUNT STATUS */}

            <div className="profile-card">

              <div className="profile-card-header">
                <h3>Account Status</h3>
              </div>

              <div className="account-status">

                <div className="status-item">
                  <span>Email Verification</span>

                  <strong className="verified">
                    Verified
                  </strong>
                </div>

                <div className="status-item">
                  <span>KYC Verification</span>

                  <strong className="pending">
                    Pending
                  </strong>
                </div>

                <div className="status-item">
                  <span>Profile Completion</span>

                  <strong className="verified">
                    85%
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Profile;