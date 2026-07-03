import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiMail, FiBookOpen, FiAward, FiBell,
  FiEdit2, FiArrowLeft, FiX, FiCheck,
  FiFileText, FiClock, FiUser, FiLogOut
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import "../../styles/dashboard.css";

function Dashboard() {
  const { user, login, logout } = useAuth();
  const { applications, scholarships } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("aif_user");
    navigate("/login");
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    fullname: user?.fullname || "",
    phone: user?.phone || "",
    institution: user?.institution || "",
    course: user?.course || "",
    location: user?.location || "",
  });

  const userApps = applications.filter(
    (a) => a.email === user?.email
  );
  const approved = userApps.filter((a) => a.status === "Approved").length;
  const pending  = userApps.filter((a) => a.status === "Pending").length;

  const completion = (() => {
    const fields = [user?.fullname, user?.email, user?.phone, user?.institution, user?.course, user?.location];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  })();

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { ...user, ...editForm };
    login(updated);
    localStorage.setItem("aif_user", JSON.stringify(updated));
    setShowEditModal(false);
  };

  const initials = user?.fullname
    ?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <div className="user-dashboard">

      {/* TOP NAV BAR */}
      <div className="dashboard-topnav">
        <button className="back-btn" onClick={() => navigate("/home")}>
          {/* back to site, not logout */}
          <FiArrowLeft /> Back to Website
        </button>
        <div className="topnav-right">
          <span className="topnav-email">{user?.email}</span>
          <button className="topnav-logout" onClick={handleLogout} title="Logout"><FiLogOut /></button>
          <div className="topnav-avatar">{initials}</div>
        </div>
      </div>

      <div className="dashboard-body">

        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">{initials}</div>
            <h3>{user?.fullname || "AIF User"}</h3>
            <span>{user?.email}</span>
            <div className="completion-bar-wrap">
              <div className="completion-bar">
                <div className="completion-fill" style={{ width: `${completion}%` }} />
              </div>
              <span>{completion}% profile complete</span>
            </div>
          </div>

          <nav className="dashboard-nav">
            <a href="#overview" className="dash-link active">
              <FiUser /> Overview
            </a>
            <a href="#applications" className="dash-link">
              <FiFileText /> My Applications
            </a>
            <a href="#scholarships" className="dash-link">
              <FiAward /> Scholarships
            </a>
            <a href="#notifications" className="dash-link">
              <FiBell /> Notifications
            </a>
          </nav>

          <button className="edit-profile-btn" onClick={() => setShowEditModal(true)}>
            <FiEdit2 /> Edit Profile
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dashboard-main">

          {/* WELCOME BANNER */}
          <div className="welcome-banner" id="overview">
            <div className="welcome-text">
              <h1>Welcome back, {user?.fullname?.split(" ")[0] || "there"} 👋</h1>
              <p>Track your scholarship applications and manage your account.</p>
            </div>
            <div className="welcome-badge">
              <span>Active Applicant</span>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="dash-stats">
            <div className="dash-stat-card">
              <div className="stat-icon-wrap applications">
                <FiFileText />
              </div>
              <div>
                <h2>{userApps.length || 4}</h2>
                <span>Total Applications</span>
              </div>
            </div>

            <div className="dash-stat-card">
              <div className="stat-icon-wrap approved">
                <FiCheck />
              </div>
              <div>
                <h2>{approved || 2}</h2>
                <span>Approved</span>
              </div>
            </div>

            <div className="dash-stat-card">
              <div className="stat-icon-wrap pending">
                <FiClock />
              </div>
              <div>
                <h2>{pending || 1}</h2>
                <span>Pending</span>
              </div>
            </div>

            <div className="dash-stat-card">
              <div className="stat-icon-wrap completion">
                <FiUser />
              </div>
              <div>
                <h2>{completion}%</h2>
                <span>Profile Complete</span>
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID */}
          <div className="dash-grid">

            {/* LEFT — PROFILE INFO */}
            <div className="dash-card" id="applications">
              <div className="dash-card-header">
                <h3>Profile Information</h3>
                <button className="inline-edit-btn" onClick={() => setShowEditModal(true)}>
                  <FiEdit2 /> Edit
                </button>
              </div>

              <div className="info-list">
                <div className="info-item">
                  <FiMail />
                  <div>
                    <label>Email Address</label>
                    <p>{user?.email || "—"}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FiBookOpen />
                  <div>
                    <label>Institution</label>
                    <p>{user?.institution || "Not provided"}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FiAward />
                  <div>
                    <label>Course of Study</label>
                    <p>{user?.course || "Not provided"}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FiUser />
                  <div>
                    <label>Location</label>
                    <p>{user?.location || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* RECENT APPLICATIONS */}
              <div className="dash-card-header" style={{ marginTop: "32px" }}>
                <h3>Recent Applications</h3>
              </div>

              {userApps.length > 0 ? (
                <div className="app-list">
                  {userApps.slice(0, 3).map((app) => (
                    <div className="app-item" key={app.id}>
                      <div>
                        <h4>{app.scholarship}</h4>
                        <span>{app.date}</span>
                      </div>
                      <span className={`app-badge ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FiFileText />
                  <p>No applications yet.</p>
                  <Link to="/scholarship" className="apply-link">Browse Scholarships</Link>
                </div>
              )}
            </div>

            {/* RIGHT — NOTIFICATIONS + STATUS */}
            <div>
              {/* NOTIFICATIONS */}
              <div className="dash-card" id="notifications">
                <div className="dash-card-header">
                  <h3>Notifications</h3>
                  <span className="notif-count">2</span>
                </div>
                <div className="notif-list">
                  <div className="notif-item">
                    <div className="notif-dot approved" />
                    <div>
                      <h4>Scholarship Approved</h4>
                      <span>Your Undergraduate application was approved.</span>
                    </div>
                  </div>
                  <div className="notif-item">
                    <div className="notif-dot pending" />
                    <div>
                      <h4>Profile Incomplete</h4>
                      <span>Complete your profile to improve your chances.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACCOUNT STATUS */}
              <div className="dash-card" style={{ marginTop: "24px" }}>
                <div className="dash-card-header">
                  <h3>Account Status</h3>
                </div>
                <div className="status-list">
                  <div className="status-row">
                    <span>Email Verified</span>
                    <strong className="status-ok">✓ Verified</strong>
                  </div>
                  <div className="status-row">
                    <span>KYC Verification</span>
                    <strong className="status-warn">Pending</strong>
                  </div>
                  <div className="status-row">
                    <span>Profile Completion</span>
                    <strong className="status-ok">{completion}%</strong>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="dash-card" style={{ marginTop: "24px" }}>
                <div className="dash-card-header">
                  <h3>Quick Actions</h3>
                </div>
                <div className="quick-actions">
                  <Link to="/scholarship" className="quick-action-btn primary">
                    Browse Scholarships
                  </Link>
                  <button className="quick-action-btn secondary" onClick={() => setShowEditModal(true)}>
                    Update Profile
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Edit Profile</h2>
              <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="edit-form">
              <div className="edit-grid">
                <div className="edit-field">
                  <label>Full Name</label>
                  <input
                    value={editForm.fullname}
                    onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div className="edit-field">
                  <label>Phone Number</label>
                  <input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div className="edit-field">
                  <label>Institution</label>
                  <input
                    value={editForm.institution}
                    onChange={(e) => setEditForm({ ...editForm, institution: e.target.value })}
                    placeholder="Your university or college"
                  />
                </div>
                <div className="edit-field">
                  <label>Course of Study</label>
                  <input
                    value={editForm.course}
                    onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div className="edit-field full">
                  <label>Location</label>
                  <input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="edit-actions">
                <button type="button" className="cancel-edit" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-edit">
                  <FiCheck /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;