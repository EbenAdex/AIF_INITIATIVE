import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX, FiDollarSign, FiUsers } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const emptyForm = { name: "", type: "Individual", amount: "", email: "", status: "Active" };

function ManageDonors() {
  const { donors = [], addDonor, updateDonor, deleteDonor } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [viewItem, setViewItem] = useState(null);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (d) => { setEditId(d.id); setForm({ ...d }); setShowModal(true); };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...form,
      date: editId ? form.date : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    if (editId) updateDonor(editId, payload);
    else addDonor(payload);
    setShowModal(false);
  };

  const totalRaised = donors.reduce((sum, d) => {
    const num = parseFloat(d.amount.replace(/[₦,]/g, "")) || 0;
    return sum + num;
  }, 0);

  return (
    <div className="admin-page">

      <div className="page-header">
        <div>
          <h1>Donors & Partners</h1>
          <p>Manage corporate sponsors, individual donors and partnership records.</p>
        </div>
        <button className="primary-btn" onClick={openAdd}>
          <FiPlus /> Add Donor
        </button>
      </div>

      <div className="mini-stats">
        <div className="mini-stat total"><h3>{donors.length}</h3><span>Total Donors</span></div>
        <div className="mini-stat"><h3>{donors.filter(d => d.type === "Corporate").length}</h3><span>Corporate</span></div>
        <div className="mini-stat closing"><h3>{donors.filter(d => d.type === "Individual").length}</h3><span>Individual</span></div>
        <div className="mini-stat closed"><h3>₦{(totalRaised / 1000000).toFixed(1)}M</h3><span>Total Raised</span></div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>All Donors</h3>
          <span>{donors.length} total</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map(d => (
                <tr key={d.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">{d.name.charAt(0)}</div>
                      {d.name}
                    </div>
                  </td>
                  <td><span className={`dept-pill ${d.type === "Corporate" ? "navy" : "gold"}`}>{d.type}</span></td>
                  <td><strong>{d.amount}</strong></td>
                  <td>{d.date}</td>
                  <td><span className={`badge ${d.status === "Active" ? "open" : "closed"}`}>{d.status}</span></td>
                  <td>
                    <div className="action-group">
                      <button className="icon-btn view" onClick={() => setViewItem(d)}><FiEye /></button>
                      <button className="icon-btn edit" onClick={() => openEdit(d)}><FiEdit2 /></button>
                      <button className="icon-btn delete" onClick={() => deleteDonor(d.id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? "Edit Donor" : "Add Donor"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-grid">
                <div className="form-field full">
                  <label>Donor / Organization Name</label>
                  <input required placeholder="Name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option>Individual</option>
                    <option>Corporate</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Amount Donated</label>
                  <input required placeholder="e.g. ₦500,000" value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })} />
                </div>
                <div className="form-field full">
                  <label>Email Address</label>
                  <input type="email" required placeholder="donor@email.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">{editId ? "Save Changes" : "Add Donor"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{viewItem.name}</h2>
              <button className="modal-close" onClick={() => setViewItem(null)}><FiX /></button>
            </div>
            <div className="view-details">
              <div className="view-row"><span>Type</span><strong>{viewItem.type}</strong></div>
              <div className="view-row"><span>Amount Donated</span><strong>{viewItem.amount}</strong></div>
              <div className="view-row"><span>Email</span><strong>{viewItem.email}</strong></div>
              <div className="view-row"><span>Date</span><strong>{viewItem.date}</strong></div>
              <div className="view-row"><span>Status</span><span className={`badge ${viewItem.status === "Active" ? "open" : "closed"}`}>{viewItem.status}</span></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageDonors;