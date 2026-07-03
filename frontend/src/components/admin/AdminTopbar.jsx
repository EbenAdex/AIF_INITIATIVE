import { FiSearch, FiBell } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

function AdminTopbar() {
  const { user } = useAuth();

  return (
    <div className="admin-topbar">
      <div className="topbar-search">
        <FiSearch />
        <input type="text" placeholder="Search anything..." />
      </div>

      <div className="topbar-right">
        <button className="topbar-icon-btn">
          <FiBell />
          <span className="notif-dot" />
        </button>

        <div className="topbar-profile">
          <div className="topbar-avatar">
            {user?.fullname?.charAt(0)?.toUpperCase() || "A"}
          </div>
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
