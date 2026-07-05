import { useState } from "react";
import { FiMail, FiEye, FiTrash2, FiX, FiSend, FiCheckCircle } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const deptColor = {
  Scholarship: "navy",
  Applications: "gold",
  Partnership: "green",
  General: "purple",
};

function ManageMessages() {
  const { messages, updateMessageStatus, deleteMessage } = useData();
  const [filter, setFilter] = useState("All");
  const [viewItem, setViewItem] = useState(null);
  const [replyText, setReplyText] = useState("");

  const filtered = filter === "All" ? messages : messages.filter(m => m.status === filter);

  const counts = {
    All: messages.length,
    Unread: messages.filter(m => m.status === "Unread").length,
    Read: messages.filter(m => m.status === "Read").length,
    Replied: messages.filter(m => m.status === "Replied").length,
  };

  const openMessage = (m) => {
    setViewItem(m);
    if (m.status === "Unread") updateMessageStatus(m.id, "Read");
  };

  const handleReply = () => {
    if (viewItem) {
      updateMessageStatus(viewItem.id, "Replied");
      setViewItem(null);
      setReplyText("");
    }
  };

  return (
    <div className="admin-page">

      <div className="page-header">
        <div>
          <h1>Messages</h1>
          <p>All enquiries submitted through the public contact form.</p>
        </div>
      </div>

      <div className="mini-stats">
        <div className="mini-stat total"><h3>{counts.All}</h3><span>Total</span></div>
        <div className="mini-stat closing"><h3>{counts.Unread}</h3><span>Unread</span></div>
        <div className="mini-stat"><h3>{counts.Read}</h3><span>Read</span></div>
        <div className="mini-stat closed"><h3>{counts.Replied}</h3><span>Replied</span></div>
      </div>

      <div className="filter-tabs">
        {["All", "Unread", "Read", "Replied"].map(f => (
          <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>Messages ({filtered.length})</h3>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" style={{textAlign:"center", padding:"40px", color:"#9ca3af"}}>No messages found</td></tr>
              ) : filtered.map(m => (
                <tr key={m.id} style={{ fontWeight: m.status === "Unread" ? 700 : 400 }}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">{m.name.charAt(0)}</div>
                      <div>
                        <div>{m.name}</div>
                        <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 400 }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{m.subject}</td>
                  <td><span className={`dept-pill ${deptColor[m.department] || "navy"}`}>{m.department}</span></td>
                  <td>{m.date}</td>
                  <td><span className={`badge ${m.status.toLowerCase()}`}>{m.status}</span></td>
                  <td>
                    <div className="action-group">
                      <button className="icon-btn view" onClick={() => openMessage(m)}><FiEye /></button>
                      <button className="icon-btn delete" onClick={() => deleteMessage(m.id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MESSAGE DETAIL + REPLY MODAL */}
      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{viewItem.subject}</h2>
              <button className="modal-close" onClick={() => setViewItem(null)}><FiX /></button>
            </div>

            <div className="view-details">
              <div className="view-row"><span>From</span><strong>{viewItem.name}</strong></div>
              <div className="view-row"><span>Email</span><strong>{viewItem.email}</strong></div>
              {viewItem.phone && <div className="view-row"><span>Phone</span><strong>{viewItem.phone}</strong></div>}
              <div className="view-row"><span>Department</span><span className={`dept-pill ${deptColor[viewItem.department] || "navy"}`}>{viewItem.department}</span></div>
              <div className="view-row"><span>Date</span><strong>{viewItem.date}</strong></div>
              <div className="view-row full">
                <span>Message</span>
                <p>{viewItem.message}</p>
              </div>
            </div>

            {viewItem.status !== "Replied" ? (
              <div style={{ marginTop: "20px" }}>
                <div className="form-field">
                  <label>Quick Reply (sends to {viewItem.email})</label>
                  <textarea rows="4" placeholder="Type your reply..." value={replyText}
                    onChange={e => setReplyText(e.target.value)} />
                </div>
                <div className="modal-actions" style={{ marginTop: "16px" }}>
                  <button className="cancel-btn" onClick={() => setViewItem(null)}>Close</button>
                  <button className="primary-btn" onClick={handleReply}>
                    <FiSend /> Mark as Replied
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-success" style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheckCircle /> This message has been replied to.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageMessages;