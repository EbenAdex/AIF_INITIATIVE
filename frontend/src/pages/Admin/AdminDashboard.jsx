import { useState } from "react";
import { FiUsers, FiFileText, FiBookOpen, FiCalendar, FiArrowUpRight, FiBell, FiX } from "react-icons/fi";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const { scholarships, events, applications } = useData();
  const { user } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const notifications = [
    { id: 1, title: "New Application", message: "Ayo Johnson applied for Frontend Scholarship.", time: "2 mins ago", unread: true },
    { id: 2, title: "New User Registered", message: "Sarah Nwosu created an account.", time: "1 hour ago", unread: true },
    { id: 3, title: "Scholarship Deadline", message: "STEM Excellence Award closes in 3 days.", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
  const pending = applications.filter(a => a.status === "Pending").length;
  const openScholarships = scholarships.filter(s => s.status === "Open").length;

  const stats = [
    { label: "Total Users",     value: "1,240",              note: "+12% this month",       icon: <FiUsers />,    color: "blue" },
    { label: "Applications",    value: applications.length,  note: `${pending} pending`,    icon: <FiFileText />, color: "gold" },
    { label: "Scholarships",    value: scholarships.length,  note: `${openScholarships} open`, icon: <FiBookOpen />, color: "green" },
    { label: "Events",          value: events.length,        note: "Active programs",        icon: <FiCalendar />, color: "purple" },
  ];

  return (
    <div className="admin-page">

      {/* NOTIFICATION PANEL */}
      {showNotif && (
        <div className="notif-panel">
          <div className="notif-panel-header">
            <h3>Notifications</h3>
            <button onClick={() => setShowNotif(false)}><FiX /></button>
          </div>
          <div className="notif-panel-list">
            {notifications.map(n => (
              <div key={n.id} className={`notif-panel-item ${n.unread ? "unread" : ""}`}>
                <div className="notif-dot-small" />
                <div>
                  <h4>{n.title}</h4>
                  <p>{n.message}</p>
                  <span>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUICK REPORT MODAL */}
      {showReport && (
        <div className="report-modal-overlay" onClick={() => setShowReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="report-modal-header">
              <h2>Quick Report</h2>
              <button onClick={() => setShowReport(false)}><FiX /></button>
            </div>
            <div className="report-modal-content">
              <div className="report-section">
                <h3>Dashboard Summary</h3>
                <div className="report-stat">
                  <span>Total Users</span>
                  <strong>1,240</strong>
                </div>
                <div className="report-stat">
                  <span>Active Scholarships</span>
                  <strong>{scholarships.filter(s => s.status === "Open").length}</strong>
                </div>
                <div className="report-stat">
                  <span>Pending Applications</span>
                  <strong>{applications.filter(a => a.status === "Pending").length}</strong>
                </div>
                <div className="report-stat">
                  <span>Upcoming Events</span>
                  <strong>{events.filter(e => e.status === "Upcoming").length}</strong>
                </div>
              </div>

              <div className="report-section">
                <h3>Application Status</h3>
                <div className="report-stat">
                  <span>Total Applications</span>
                  <strong>{applications.length}</strong>
                </div>
                <div className="report-stat">
                  <span>Approved</span>
                  <strong style={{ color: "#10b981" }}>{applications.filter(a => a.status === "Approved").length}</strong>
                </div>
                <div className="report-stat">
                  <span>Rejected</span>
                  <strong style={{ color: "#ef4444" }}>{applications.filter(a => a.status === "Rejected").length}</strong>
                </div>
              </div>

              <div className="report-section">
                <h3>Scholarship Programs</h3>
                <div className="report-stat">
                  <span>Total Programs</span>
                  <strong>{scholarships.length}</strong>
                </div>
                <div className="report-stat">
                  <span>Open Programs</span>
                  <strong style={{ color: "#3b82f6" }}>{scholarships.filter(s => s.status === "Open").length}</strong>
                </div>
                <div className="report-stat">
                  <span>Closed Programs</span>
                  <strong style={{ color: "#9ca3af" }}>{scholarships.filter(s => s.status === "Closed").length}</strong>
                </div>
              </div>

              <div className="report-actions">
                <button className="btn-primary" onClick={() => {
                  const reportText = `Quick Report\n\nDashboard Summary:\n- Total Users: 1,240\n- Active Scholarships: ${scholarships.filter(s => s.status === "Open").length}\n- Pending Applications: ${applications.filter(a => a.status === "Pending").length}\n- Upcoming Events: ${events.filter(e => e.status === "Upcoming").length}\n\nGenerated: ${new Date().toLocaleString()}`;
                  const element = document.createElement("a");
                  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(reportText));
                  element.setAttribute("download", `AIF_Report_${new Date().toISOString().split('T')[0]}.txt`);
                  element.style.display = "none";
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}>
                  Download Report
                </button>
                <button className="btn-secondary" onClick={() => setShowReport(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, {user?.fullname}. Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <button className="notif-trigger" onClick={() => setShowNotif(!showNotif)}>
            <FiBell />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>
          <button className="primary-btn" onClick={() => setShowReport(true)}>
            <FiArrowUpRight /> Quick Report
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className={`stat-card color-${s.color}`} key={i}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <span>{s.label}</span>
              <h2>{s.value}</h2>
              <p>{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT APPLICATIONS TABLE */}
      <div className="data-card">
        <div className="data-card-header">
          <h3>Recent Applications</h3>
          <a href="/admin/applications" className="view-all-btn">View All</a>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Scholarship</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.slice(0, 5).map((app, i) => (
                <tr key={i}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">{app.name.charAt(0)}</div>
                      {app.name}
                    </div>
                  </td>
                  <td>{app.scholarship}</td>
                  <td>{app.date}</td>
                  <td><span className={`badge ${app.status.toLowerCase()}`}>{app.status}</span></td>
                  <td><button className="table-btn">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="dash-bottom-grid">

        {/* RECENT SCHOLARSHIPS */}
        <div className="data-card">
          <div className="data-card-header">
            <h3>Active Scholarships</h3>
            <a href="/admin/scholarships" className="view-all-btn">Manage</a>
          </div>
          {scholarships.filter(s => s.status === "Open").slice(0, 3).map(s => (
            <div className="bottom-list-item" key={s.id}>
              <div>
                <h4>{s.title}</h4>
                <span>{s.category} · Deadline: {s.deadline}</span>
              </div>
              <span className="badge open">{s.status}</span>
            </div>
          ))}
          {scholarships.filter(s => s.status === "Open").length === 0 && (
            <p className="empty-note">No open scholarships. <a href="/admin/scholarships">Create one</a></p>
          )}
        </div>

        {/* UPCOMING EVENTS */}
        <div className="data-card">
          <div className="data-card-header">
            <h3>Upcoming Events</h3>
            <a href="/admin/events" className="view-all-btn">Manage</a>
          </div>
          {events.filter(e => e.status === "Upcoming").slice(0, 3).map(e => (
            <div className="bottom-list-item" key={e.id}>
              <div>
                <h4>{e.title}</h4>
                <span>{e.date} · {e.location}</span>
              </div>
              <span className="badge open">Upcoming</span>
            </div>
          ))}
          {events.filter(e => e.status === "Upcoming").length === 0 && (
            <p className="empty-note">No upcoming events. <a href="/admin/events">Add one</a></p>
          )}
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;