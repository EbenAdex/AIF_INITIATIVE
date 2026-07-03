import { FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

// NOTE: Notification bell is now in AdminDashboard page header
// This topbar only handles search + profile display
function AdminTopbar() {
  const { user } = useAuth();

  const initials = user?.fullname
    ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "A";

  return (
    <div className="admin-topbar">
      <div className="topbar-search">
        <FiSearch />
        <input type="text" placeholder="Search anything..." />
      </div>

      <div className="topbar-right">
        <div className="topbar-profile">
          <div className="topbar-avatar">{initials}</div>
          <div className="topbar-info">
            <h4>{user?.fullname || "AIF Admin"}</h4>
            <span>Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;