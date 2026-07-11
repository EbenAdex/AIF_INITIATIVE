import { useState } from "react";
import { FiTrash2, FiSlash, FiUserCheck, FiSearch } from "react-icons/fi";
import { useData } from "../../context/DataContext";

function ManageUsers() {
  const { users, toggleUserStatus, deleteUser, applications } = useData();
  const [search, setSearch] = useState("");

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getApplicationCount = (email) => applications.filter(a => a.email === email).length;

  return (
    <div className="admin-page">

      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>All registered platform users, live from registrations.</p>
        </div>
      </div>

      <div className="mini-stats">
        <div className="mini-stat total"><h3>{users.length}</h3><span>Total Users</span></div>
        <div className="mini-stat"><h3>{users.filter(u => u.status === "Active").length}</h3><span>Active</span></div>
        <div className="mini-stat closed"><h3>{users.filter(u => u.status === "Suspended").length}</h3><span>Suspended</span></div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>All Users ({filtered.length})</h3>
          <div className="topbar-search" style={{ width: "260px", height: "40px" }}>
            <FiSearch />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Applications</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" style={{textAlign:"center", padding:"40px", color:"#9ca3af"}}>
                  {users.length === 0 ? "No users have registered yet." : "No users match your search."}
                </td></tr>
              ) : filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">{u.name?.charAt(0)}</div>
                      {u.name}
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>{getApplicationCount(u.email)}</td>
                  <td>{u.joined}</td>
                  <td>
                    <span className={`badge ${u.status === "Active" ? "open" : "closed"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button
                        className="icon-btn edit"
                        onClick={() => toggleUserStatus(u.id)}
                        title={u.status === "Active" ? "Suspend" : "Reactivate"}
                      >
                        {u.status === "Active" ? <FiSlash /> : <FiUserCheck />}
                      </button>
                      <button className="icon-btn delete" onClick={() => deleteUser(u.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default ManageUsers;