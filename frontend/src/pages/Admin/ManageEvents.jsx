import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const emptyForm = { title: "", date: "", location: "", category: "", status: "Upcoming", description: "" };

function ManageEvents() {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [viewItem, setViewItem] = useState(null);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (ev) => { setEditId(ev.id); setForm({ ...ev }); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) updateEvent(editId, form);
    else addEvent(form);
    setShowModal(false);
  };

  return (
    <div className="admin-page">

      <div className="page-header">
        <div>
          <h1>Events</h1>
          <p>Create and manage AIF community events. Events appear live on the public events page.</p>
        </div>
        <button className="primary-btn" onClick={openAdd}>
          <FiPlus /> Add Event
        </button>
      </div>

      <div className="mini-stats">
        <div className="mini-stat"><h3>{events.filter(e => e.status === "Upcoming").length}</h3><span>Upcoming</span></div>
        <div className="mini-stat closed"><h3>{events.filter(e => e.status === "Completed").length}</h3><span>Completed</span></div>
        <div className="mini-stat total"><h3>{events.length}</h3><span>Total</span></div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>All Events</h3>
          <span>{events.length} total</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td><strong>{ev.title}</strong></td>
                  <td>{ev.date}</td>
                  <td>{ev.location}</td>
                  <td>{ev.category}</td>
                  <td>
                    <span className={`badge ${ev.status === "Upcoming" ? "open" : "closed"}`}>
                      {ev.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="icon-btn view" onClick={() => setViewItem(ev)}><FiEye /></button>
                      <button className="icon-btn edit" onClick={() => openEdit(ev)}><FiEdit2 /></button>
                      <button className="icon-btn delete" onClick={() => deleteEvent(ev.id)}><FiTrash2 /></button>
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
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? "Edit Event" : "Add Event"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-grid">
                <div className="form-field full">
                  <label>Event Title</label>
                  <input required placeholder="Event name" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Date</label>
                  <input required type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Location</label>
                  <input required placeholder="City" value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Category</label>
                  <input required placeholder="e.g. Healthcare" value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option>Upcoming</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className="form-field full">
                  <label>Description</label>
                  <textarea rows="3" placeholder="Event description..." value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">{editId ? "Save Changes" : "Add Event"}</button>
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
              <div className="view-row"><span>Date</span><strong>{viewItem.date}</strong></div>
              <div className="view-row"><span>Location</span><strong>{viewItem.location}</strong></div>
              <div className="view-row"><span>Category</span><strong>{viewItem.category}</strong></div>
              <div className="view-row"><span>Status</span><span className={`badge ${viewItem.status === "Upcoming" ? "open" : "closed"}`}>{viewItem.status}</span></div>
              {viewItem.description && <div className="view-row full"><span>Description</span><p>{viewItem.description}</p></div>}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageEvents;