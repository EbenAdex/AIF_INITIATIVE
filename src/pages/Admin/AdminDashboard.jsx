import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers, FiFileText, FiBookOpen, FiCalendar,
  FiBell, FiX, FiCheck, FiCircle, FiDownload,
  FiArrowRight, FiHeart, FiMail
} from "react-icons/fi";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

const initialNotifications = [
  { id: 1, title: "New Application", message: "Ayo Johnson applied for Frontend Scholarship.", time: "2 mins ago", unread: true },
  { id: 2, title: "New User Registered", message: "Sarah Nwosu created an account.", time: "1 hour ago", unread: true },
  { id: 3, title: "Scholarship Deadline", message: "STEM Excellence Award closes in 3 days.", time: "3 hours ago", unread: false },
  { id: 4, title: "Application Approved", message: "David Mark's application was approved.", time: "Yesterday", unread: false },
];

function AdminDashboard() {
  const { scholarships, events, applications, donors, messages, users } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;
  const pending = applications.filter(a => a.status === "Pending").length;
  const openScholarships = scholarships.filter(s => s.status === "Open").length;
  const unreadMessages = messages.filter(m => m.status === "Unread").length;

  // Toggle single notification read/unread
  const toggleNotif = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n)
    );
  };

  // Mark all as read
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Delete notification
  const deleteNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const stats = [
    { label: "Total Users",   value: users.length,         note: `${users.filter(u=>u.status==="Active").length} active`, icon: <FiUsers />,    color: "blue",   link: "/admin/users" },
    { label: "Applications",  value: applications.length,  note: `${pending} pending review`, icon: <FiFileText />, color: "gold",   link: "/admin/applications" },
    { label: "Scholarships",  value: scholarships.length,  note: `${openScholarships} open`,  icon: <FiBookOpen />, color: "green",  link: "/admin/scholarships" },
    { label: "Events",        value: events.length,        note: "Active programs",            icon: <FiCalendar />, color: "purple", link: "/admin/events" },
    { label: "Donors",        value: donors.length,         note: "Active partners",            icon: <FiHeart />,    color: "rose",   link: "/admin/donors" },
    { label: "Messages",      value: messages.length,       note: `${unreadMessages} unread`,    icon: <FiMail />,     color: "teal",   link: "/admin/messages" },
  ];

  return (
    <div className="admin-page">

      {/* NOTIFICATION PANEL */}
      {showNotif && (
        <div className="notif-panel">
          <div className="notif-panel-header">
            <div>
              <h3>Notifications</h3>
              {unreadCount > 0 && <span className="notif-unread-count">{unreadCount} unread</span>}
            </div>
            <div className="notif-panel-actions">
              {unreadCount > 0 && (
                <button className="mark-all-btn" onClick={markAllRead}>
                  <FiCheck /> Mark all read
                </button>
              )}
              <button className="notif-close-btn" onClick={() => setShowNotif(false)}>
                <FiX />
              </button>
            </div>
          </div>

          <div className="notif-panel-list">
            {notifications.length === 0 && (
              <div className="notif-empty">
                <FiBell />
                <p>No notifications</p>
              </div>
            )}
            {notifications.map(n => (
              <div key={n.id} className={`notif-panel-item ${n.unread ? "unread" : ""}`}>
                <div className="notif-dot-small" style={{ background: n.unread ? "#d4a017" : "#d1d5db" }} />
                <div className="notif-item-body">
                  <h4>{n.title}</h4>
                  <p>{n.message}</p>
                  <span>{n.time}</span>
                </div>
                <div className="notif-item-controls">
                  <button
                    className="notif-toggle-btn"
                    onClick={() => toggleNotif(n.id)}
                    title={n.unread ? "Mark as read" : "Mark as unread"}
                  >
                    {n.unread ? <FiCheck /> : <FiCircle />}
                  </button>
                  <button
                    className="notif-delete-btn"
                    onClick={() => deleteNotif(n.id)}
                    title="Remove"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))}
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
          {/* NOTIFICATION BELL */}
          <button className="notif-trigger" onClick={() => setShowNotif(!showNotif)}>
            <FiBell />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>

          {/* EXPORT REPORT — actually functional */}
          <button className="primary-btn" onClick={() => {
            const rows = [
              ["Metric", "Value"],
              ["Total Users", users.length],
              ["Total Applications", applications.length],
              ["Pending Applications", pending],
              ["Approved Applications", applications.filter(a => a.status === "Approved").length],
              ["Rejected Applications", applications.filter(a => a.status === "Rejected").length],
              ["Total Scholarships", scholarships.length],
              ["Open Scholarships", openScholarships],
              ["Total Events", events.length],
              ["Upcoming Events", events.filter(e => e.status === "Upcoming").length],
              ["Total Donors", donors.length],
              ["Total Messages", messages.length],
              ["Unread Messages", unreadMessages],
            ];
            const csv = rows.map(r => r.join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `AIF_Report_${new Date().toISOString().slice(0,10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}>
            <FiDownload /> Export Report
          </button>
        </div>
      </div>

      {/* STATS — each card is clickable */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div
            className={`stat-card color-${s.color} clickable`}
            key={i}
            onClick={() => navigate(s.link)}
            title={`Go to ${s.label}`}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <span>{s.label}</span>
              <h2>{s.value}</h2>
              <p>{s.note}</p>
            </div>
            <div className="stat-arrow"><FiArrowRight /></div>
          </div>
        ))}
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="data-card">
        <div className="data-card-header">
          <h3>Recent Applications</h3>
          <a href="/admin/applications" className="view-all-btn">View All →</a>
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
                  <td>
                    <button className="table-btn"
                      onClick={() => navigate("/admin/applications")}>
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="dash-bottom-grid">

        {/* ACTIVE SCHOLARSHIPS */}
        <div className="data-card">
          <div className="data-card-header">
            <h3>Active Scholarships</h3>
            <a href="/admin/scholarships" className="view-all-btn">Manage →</a>
          </div>
          {scholarships.filter(s => s.status === "Open").length === 0 ? (
            <p className="empty-note">No open scholarships. <a href="/admin/scholarships">Create one</a></p>
          ) : (
            scholarships.filter(s => s.status === "Open").slice(0, 4).map(s => (
              <div className="bottom-list-item" key={s.id}>
                <div>
                  <h4>{s.title}</h4>
                  <span>{s.category} · Deadline: {s.deadline}</span>
                </div>
                <span className="badge open">{s.status}</span>
              </div>
            ))
          )}
        </div>

        {/* UPCOMING EVENTS */}
        <div className="data-card">
          <div className="data-card-header">
            <h3>Upcoming Events</h3>
            <a href="/admin/events" className="view-all-btn">Manage →</a>
          </div>
          {events.filter(e => e.status === "Upcoming").length === 0 ? (
            <p className="empty-note">No upcoming events. <a href="/admin/events">Add one</a></p>
          ) : (
            events.filter(e => e.status === "Upcoming").slice(0, 4).map(e => (
              <div className="bottom-list-item" key={e.id}>
                <div>
                  <h4>{e.title}</h4>
                  <span>{e.date} · {e.location}</span>
                </div>
                <span className="badge open">Upcoming</span>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;