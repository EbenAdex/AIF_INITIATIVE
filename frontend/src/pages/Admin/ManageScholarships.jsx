import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const emptyForm = { title: "", category: "", amount: "", deadline: "", status: "Open", description: "", eligibility: "" };

function ManageScholarships() {
  const { scholarships, addScholarship, updateScholarship, deleteScholarship } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [viewItem, setViewItem] = useState(null);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (s) => { setEditId(s.id); setForm({ ...s }); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) updateScholarship(editId, form);
    else addScholarship(form);
    setShowModal(false);
  };

  const statusClass = (s) =>
    s === "Open" ? "open" : s === "Closed" ? "closed" : "closing";

  return (
    <div className="admin-page">

      <div className="page-header">
        <div>
          <h1>Scholarships</h1>
          <p>Create and manage all scholarship opportunities. Changes reflect immediately on the public site.</p>
        </div>
        <button className="primary-btn" onClick={openAdd}>
          <FiPlus /> Add Scholarship
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mini-stats">
        <div className="mini-stat">
          <h3>{scholarships.filter(s => s.status === "Open").length}</h3>
          <span>Open</span>
        </div>
        <div className="mini-stat closing">
          <h3>{scholarships.filter(s => s.status === "Closing Soon").length}</h3>
          <span>Closing Soon</span>
        </div>
        <div className="mini-stat closed">
          <h3>{scholarships.filter(s => s.status === "Closed").length}</h3>
          <span>Closed</span>
        </div>
        <div className="mini-stat total">
          <h3>{scholarships.length}</h3>
          <span>Total</span>
        </div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>All Scholarships</h3>
          <span>{scholarships.length} total</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.title}</strong></td>
                  <td>{s.category}</td>
                  <td>{s.amount}</td>
                  <td>{s.deadline}</td>
                  <td><span className={`badge ${statusClass(s.status)}`}>{s.status}</span></td>
                  <td>
                    <div className="action-group">
                      <button className="icon-btn view" onClick={() => setViewItem(s)}><FiEye /></button>
                      <button className="icon-btn edit" onClick={() => openEdit(s)}><FiEdit2 /></button>
                      <button className="icon-btn delete" onClick={() => deleteScholarship(s.id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? "Edit Scholarship" : "Add Scholarship"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-grid">
                <div className="form-field full">
                  <label>Title</label>
                  <input required placeholder="Scholarship title" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Category</label>
                  <input required placeholder="e.g. Education" value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Award Amount</label>
                  <input required placeholder="e.g. ₦500,000" value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Deadline</label>
                  <input required type="date" value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option>Open</option>
                    <option>Closing Soon</option>
                    <option>Closed</option>
                  </select>
                </div>
                <div className="form-field full">
                  <label>Description</label>
                  <textarea rows="3" placeholder="Scholarship description..." value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="form-field full">
                  <label>Eligibility</label>
                  <input placeholder="e.g. CGPA 3.5+, 100-400 level" value={form.eligibility}
                    onChange={(e) => setForm({ ...form, eligibility: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">{editId ? "Save Changes" : "Create Scholarship"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{viewItem.title}</h2>
              <button className="modal-close" onClick={() => setViewItem(null)}><FiX /></button>
            </div>
            <div className="view-details">
              <div className="view-row"><span>Category</span><strong>{viewItem.category}</strong></div>
              <div className="view-row"><span>Amount</span><strong>{viewItem.amount}</strong></div>
              <div className="view-row"><span>Deadline</span><strong>{viewItem.deadline}</strong></div>
              <div className="view-row"><span>Status</span><span className={`badge ${statusClass(viewItem.status)}`}>{viewItem.status}</span></div>
              {viewItem.description && <div className="view-row full"><span>Description</span><p>{viewItem.description}</p></div>}
              {viewItem.eligibility && <div className="view-row full"><span>Eligibility</span><p>{viewItem.eligibility}</p></div>}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageScholarships;