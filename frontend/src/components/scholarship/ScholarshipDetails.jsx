import "../../styles/scholarship.css";

function ScholarshipDetails({ scholarship }) {
  return (
    <div className="scholarship-details-container">
      <div className="details-header">
        <h2>{scholarship?.title}</h2>
        <div className="details-meta">
          <span className="meta-item">
            <strong>Award:</strong> {scholarship?.amount}
          </span>
          <span className="meta-item">
            <strong>Category:</strong> {scholarship?.category}
          </span>
        </div>
      </div>

      <div className="details-content">
        <section className="detail-section">
          <h3>Overview</h3>
          <p>{scholarship?.fullDescription || scholarship?.description}</p>
        </section>

        <section className="detail-section">
          <h3>Eligibility Requirements</h3>
          <ul className="requirements-list">
            {scholarship?.requirements &&
              scholarship.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
          </ul>
        </section>

        <section className="detail-section">
          <h3>Application Process</h3>
          <ol className="process-list">
            {scholarship?.applicationSteps &&
              scholarship.applicationSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
          </ol>
        </section>

        <section className="detail-section">
          <h3>Important Dates</h3>
          <div className="dates-list">
            <div className="date-item">
              <span className="date-label">Application Deadline:</span>
              <span className="date-value">{scholarship?.deadline}</span>
            </div>
            <div className="date-item">
              <span className="date-label">Decision Date:</span>
              <span className="date-value">{scholarship?.decisionDate}</span>
            </div>
            <div className="date-item">
              <span className="date-label">Award Notification:</span>
              <span className="date-value">
                {scholarship?.notificationDate}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ScholarshipDetails;
