import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import "../styles/admin.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">
        <AdminTopbar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default AdminLayout;