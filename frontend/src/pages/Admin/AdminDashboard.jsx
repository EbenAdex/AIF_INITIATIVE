import AdminLayout from "../../layouts/AdminLayout";

function AdminDashboard() {
  return (
    <AdminLayout>

      <div className="admin-dashboard">

        <div className="admin-top">

          <div>
            <h1>Dashboard</h1>

            <p>
              Monitor scholarships,
              applications, users,
              and events.
            </p>
          </div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stats-card">
            <h3>Total Users</h3>
            <h1>1,240</h1>
            <p>+12% this month</p>
          </div>

          <div className="stats-card">
            <h3>Applications</h3>
            <h1>423</h1>
            <p>39 pending reviews</p>
          </div>

          <div className="stats-card">
            <h3>Scholarships</h3>
            <h1>18</h1>
            <p>5 active programs</p>
          </div>

          <div className="stats-card">
            <h3>Events</h3>
            <h1>7</h1>
            <p>Upcoming events</p>
          </div>

        </div>

        {/* TABLE */}

        <div className="dashboard-table">

          <div className="table-header">
            <h2>Recent Applications</h2>

            <button>
              View All
            </button>
          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Scholarship</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Ayo Johnson</td>
                  <td>Frontend Scholarship</td>

                  <td>
                    <span className="pending">
                      Pending
                    </span>
                  </td>

                  <td>
                    <button className="action-btn">
                      Review
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>David Mark</td>
                  <td>Medical Scholarship</td>

                  <td>
                    <span className="approved">
                      Approved
                    </span>
                  </td>

                  <td>
                    <button className="action-btn">
                      View
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;