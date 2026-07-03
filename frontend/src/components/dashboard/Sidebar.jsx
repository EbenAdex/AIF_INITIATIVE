import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <h2>AIF Portal</h2>

      <nav>
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/scholarship">
          Scholarships
        </Link>

        <Link to="/">
          Logout
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;