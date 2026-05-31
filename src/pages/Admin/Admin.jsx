function AdminDashboard() {
  return (
    <section className="dashboard-page">

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <h1>120</h1>
          <span>+12 this week</span>
        </div>

        <div className="dashboard-card">
          <h3>Applications</h3>
          <h1>42</h1>
          <span>8 pending reviews</span>
        </div>

        <div className="dashboard-card">
          <h3>Scholarships</h3>
          <h1>8</h1>
          <span>3 active programs</span>
        </div>

      </div>

      <div className="dashboard-bottom">

        <div className="recent-activity">
          <h3>Recent Activities</h3>

          <div className="activity-item">
            <p>New scholarship application submitted</p>
            <span>2 mins ago</span>
          </div>

          <div className="activity-item">
            <p>Admin updated scholarship deadline</p>
            <span>1 hour ago</span>
          </div>

          <div className="activity-item">
            <p>New user registered</p>
            <span>3 hours ago</span>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>

          <button>Create Scholarship</button>

          <button>Add Event</button>

          <button>Review Applications</button>
        </div>

      </div>
    </section>
  );
}

export default AdminDashboard;