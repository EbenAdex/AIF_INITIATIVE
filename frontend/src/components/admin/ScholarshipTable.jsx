function ScholarshipTable() {
  const scholarships = [
    {
      id: 1,
      title: "Undergraduate Scholarship",
      category: "Education",
      deadline: "August 12, 2026",
      status: "Open",
    },

    {
      id: 2,
      title: "Healthcare Support Grant",
      category: "Healthcare",
      deadline: "September 2, 2026",
      status: "Closed",
    },
  ];

  return (
    <div className="scholarship-table-wrapper">
      <table className="scholarship-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {scholarships.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>

              <td>{item.category}</td>

              <td>{item.deadline}</td>

              <td>
                <span
                  className={`status ${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  <button>Edit</button>

                  <button className="delete-btn">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScholarshipTable;