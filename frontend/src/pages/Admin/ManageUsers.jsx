import { useState } from "react";
import { FiTrash2, FiSlash } from "react-icons/fi";

const initial = [
  { id: 1, name: "Ayo Johnson",  email: "ayo@gmail.com",   role: "user",  joined: "Jan 2026",  status: "Active" },
  { id: 2, name: "Sarah Nwosu",  email: "sarah@gmail.com",  role: "user",  joined: "Feb 2026",  status: "Active" },
  { id: 3, name: "David Mark",   email: "david@gmail.com",  role: "user",  joined: "Mar 2026",  status: "Suspended" },
  { id: 4, name: "Emeka Obi",    email: "emeka@gmail.com",  role: "user",  joined: "Apr 2026",  status: "Active" },
];

function ManageUsers() {
  const [users, setUsers] = useState(initial);

  const toggleSuspend = (id) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="admin-page">

      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Manage platform users and their access.</p>
        </div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>All Users ({users.length})</h3>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">{u.name.charAt(0)}</div>
                      {u.name}
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td><span className="badge approved">{u.role}</span></td>
                  <td>{u.joined}</td>
                  <td>
                    <span className={`badge ${u.status === "Active" ? "open" : "closed"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="icon-btn edit" onClick={() => toggleSuspend(u.id)} title={u.status === "Active" ? "Suspend" : "Reactivate"}>
                        <FiSlash />
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
