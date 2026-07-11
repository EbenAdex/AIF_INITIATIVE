import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid, FiBookOpen, FiFileText,
  FiUsers, FiCalendar, FiLogOut, FiExternalLink,
  FiHeart, FiMail,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

function AdminSidebar() {
  const { logout, user } = useAuth();
  const { messages } = useData();
  const navigate = useNavigate();

  const unreadMessages = messages.filter(m => m.status === "Unread").length;

  const handleLogout = () => {
    logout();
    localStorage.removeItem("aif_user");
    navigate("/admin-login");
  };

  const links = [
    { to: "/admin/dashboard",    icon: <FiGrid />,      label: "Dashboard" },
    { to: "/admin/scholarships", icon: <FiBookOpen />,  label: "Scholarships" },
    { to: "/admin/applications", icon: <FiFileText />,  label: "Applications" },
    { to: "/admin/events",       icon: <FiCalendar />,  label: "Events" },
    { to: "/admin/donors",       icon: <FiHeart />,     label: "Donors" },
    { to: "/admin/messages",     icon: <FiMail />,      label: "Messages", badge: unreadMessages },
    { to: "/admin/users",        icon: <FiUsers />,     label: "Users" },
  ];

  const initials = user?.fullname
    ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "A";

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-mark">AIF</div>
        <div>
          <h2>Admin Panel</h2>
          <p>Management System</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <span className="link-icon">{link.icon}</span>
            <span className="link-label">{link.label}</span>
            {link.badge > 0 && <span className="sidebar-badge">{link.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <h4>{user?.fullname || "AIF Admin"}</h4>
            <span>Super Admin</span>
          </div>
        </div>

        <a href="/home" className="view-site-btn" target="_blank" rel="noreferrer">
          <FiExternalLink />
          <span>View Website</span>
        </a>

        <button className="sidebar-logout" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;