import {
  FiMail,
  FiBookOpen,
  FiAward,
  FiBell,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

import "../../styles/dashboard.css";

function Dashboard() {
  const { user } = useAuth();

  const isAdmin =
  user?.role === "admin";

  return (
    <section className="user-dashboard">

      {/* TOP HEADER */}

      <div className="dashboard-top">

        <div className="dashboard-profile">

          <div className="dashboard-avatar">
            {user?.fullname?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h1>
              Welcome Back, {user?.fullname}
            </h1>
             
             <h1>
                {isAdmin
                    ? "Welcome Back, Admin"
                    : `Welcome Back, ${user?.fullname}`
                }
             </h1>

            <p>
                    {isAdmin
                        ? "Manage scholarships, applications and platform activities."
                        : "Track scholarships and manage your applications."
                    }
            </p>
          </div>

        </div>

        <button className="dashboard-action-btn">
          Edit Profile
        </button>

      </div>

      {/* STATS */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <h2>04</h2>
          <span>Applications</span>
        </div>

        <div className="dashboard-stat-card">
          <h2>02</h2>
          <span>Approved</span>
        </div>

        <div className="dashboard-stat-card">
          <h2>01</h2>
          <span>Pending</span>
        </div>

        <div className="dashboard-stat-card">
          <h2>85%</h2>
          <span>Profile Completion</span>
        </div>

      </div>

      {/* GRID */}

      <div className="dashboard-grid">

        {/* LEFT */}

        <div className="dashboard-left">

          {/* PROFILE INFO */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">
              <h3>Profile Information</h3>
            </div>

            <div className="dashboard-info-list">

              <div className="dashboard-info-item">
                <FiMail />

                <div>
                  <h4>Email Address</h4>
                  <p>{user?.email}</p>
                </div>
              </div>

              <div className="dashboard-info-item">
                <FiBookOpen />

                <div>
                  <h4>Institution</h4>
                  <p>{user?.institution}</p>
                </div>
              </div>

              <div className="dashboard-info-item">
                <FiAward />

                <div>
                  <h4>Course</h4>
                  <p>{user?.course}</p>
                </div>
              </div>

            </div>

          </div>

          {/* RECENT APPLICATIONS */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">
              <h3>Recent Applications</h3>
            </div>

            <div className="application-list">

              <div className="application-item">
                <div>
                  <h4>
                    Undergraduate Scholarship
                  </h4>

                  <span>
                    Submitted 2 days ago
                  </span>
                </div>

                <strong className="approved">
                  Approved
                </strong>
              </div>

              <div className="application-item">
                <div>
                  <h4>
                    Healthcare Support Grant
                  </h4>

                  <span>
                    Submitted 5 days ago
                  </span>
                </div>

                <strong className="pending">
                  Pending
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="dashboard-right">

          {/* NOTIFICATIONS */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">
              <h3>Notifications</h3>
            </div>

            <div className="notification-list">

              <div className="notification-item">
                <FiBell />

                <div>
                  <h4>
                    Scholarship Approved
                  </h4>

                  <span>
                    Your application has been approved.
                  </span>
                </div>
              </div>

              <div className="notification-item">
                <FiBell />

                <div>
                  <h4>
                    Profile Update Required
                  </h4>

                  <span>
                    Complete your KYC verification.
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* ACCOUNT STATUS */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">
              <h3>Account Status</h3>
            </div>

            <div className="status-list">

              <div className="status-item">
                <span>Email Verification</span>

                <strong className="approved">
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

                <strong className="approved">
                  85%
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;