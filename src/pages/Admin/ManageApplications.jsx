import { useState } from "react";
import { FiEye, FiX, FiCheck, FiXCircle } from "react-icons/fi";
import { useData } from "../../context/DataContext";

function ManageApplications() {
  const { applications, updateApplicationStatus } = useData();
  const [filter, setFilter] = useState("All");
  const [viewItem, setViewItem] = useState(null);

  const filtered = filter === "All" ? applications : applications.filter((a) => a.status === filter);

  const counts = {
    All: applications.length,
    Pending: applications.filter(a => a.status === "Pending").length,
    Approved: applications.filter(a => a.status === "Approved").length,
    Rejected: applications.filter(a => a.status === "Rejected").length,
  };

  return (
    <div className="admin-page">

      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p>Review and manage all scholarship applications. Approve or reject with one click.</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mini-stats">
        <div className="mini-stat total"><h3>{counts.All}</h3><span>Total</span></div>
        <div className="mini-stat closing"><h3>{counts.Pending}</h3><span>Pending</span></div>
        <div className="mini-stat"><h3>{counts.Approved}</h3><span>Approved</span></div>
        <div className="mini-stat closed"><h3>{counts.Rejected}</h3><span>Rejected</span></div>
      </div>

      {/* FILTER TABS */}
      <div className="filter-tabs">
        {["All", "Pending", "Approved", "Rejected"].map((f) => (
          <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>Applications ({filtered.length})</h3>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Email</th>
                <th>Scholarship</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">{app.name.charAt(0)}</div>
                      {app.name}
                    </div>
                  </td>
                  <td>{app.email}</td>
                  <td>{app.scholarship}</td>
                  <td>{app.date}</td>
                  <td><span className={`badge ${app.status.toLowerCase()}`}>{app.status}</span></td>
                  <td>
                    <div className="action-group">
                      <button className="icon-btn view" onClick={() => setViewItem(app)} title="View"><FiEye /></button>
                      {app.status === "Pending" && (
                        <>
                          <button className="icon-btn approve-btn" onClick={() => updateApplicationStatus(app.id, "Approved")} title="Approve"><FiCheck /></button>
                          <button className="icon-btn reject-btn"  onClick={() => updateApplicationStatus(app.id, "Rejected")} title="Reject"><FiXCircle /></button>
                        </>
                      )}
                      {app.status !== "Pending" && (
                        <button className="icon-btn edit" onClick={() => updateApplicationStatus(app.id, "Pending")} title="Reset to Pending" style={{fontSize:"12px",padding:"0 8px",width:"auto"}}>Reset</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details</h2>
              <button className="modal-close" onClick={() => setViewItem(null)}><FiX /></button>
            </div>
            <div className="view-details">
              <div className="view-row"><span>Applicant</span><strong>{viewItem.name}</strong></div>
              <div className="view-row"><span>Email</span><strong>{viewItem.email}</strong></div>
              <div className="view-row"><span>Scholarship</span><strong>{viewItem.scholarship}</strong></div>
              <div className="view-row"><span>Date Applied</span><strong>{viewItem.date}</strong></div>
              <div className="view-row"><span>Status</span><span className={`badge ${viewItem.status.toLowerCase()}`}>{viewItem.status}</span></div>
            </div>
            {viewItem.status === "Pending" && (
              <div className="modal-actions" style={{marginTop:"24px"}}>
                <button className="cancel-btn" onClick={() => { updateApplicationStatus(viewItem.id, "Rejected"); setViewItem(null); }}>Reject</button>
                <button className="primary-btn" onClick={() => { updateApplicationStatus(viewItem.id, "Approved"); setViewItem(null); }}>
                  <FiCheck /> Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageApplications;