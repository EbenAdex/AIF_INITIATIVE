function ApplicationsTable() {
  return (
    <div className="table-card">

      <div className="table-header">
        <h3>Recent Applications</h3>
      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Scholarship</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>Ayo Johnson</td>
            <td>Full Stack Scholarship</td>
            <td>
              <span className="status pending">
                Pending
              </span>
            </td>

            <td>
              <button>
                Review
              </button>
            </td>
          </tr>

          <tr>
            <td>Mary Daniel</td>
            <td>Design Scholarship</td>

            <td>
              <span className="status approved">
                Approved
              </span>
            </td>

            <td>
              <button>
                View
              </button>
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default ApplicationsTable;