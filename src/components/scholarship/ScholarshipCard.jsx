import Button from "../common/Button";
import "../../styles/scholarship.css";

function ScholarshipCard({
  id,
  title,
  amount,
  description,
  eligibility,
  deadline,
  category,
  onApply,
}) {
  return (
    <div className="scholarship-card">
      <div className="scholarship-card-header">
        <div className="scholarship-category">
          <span className="category-badge">{category}</span>
        </div>
      </div>

      <div className="scholarship-card-body">
        <h3 className="scholarship-title">{title}</h3>

        <div className="scholarship-amount">
          <span className="amount-label">Award Amount:</span>
          <span className="amount-value">{amount}</span>
        </div>

        <p className="scholarship-description">{description}</p>

        <div className="scholarship-details">
          <div className="detail-item">
            <span className="detail-label">Eligibility:</span>
            <p className="detail-value">{eligibility}</p>
          </div>

          <div className="detail-item">
            <span className="detail-label">Deadline:</span>
            <p className="detail-value">{deadline}</p>
          </div>
        </div>
      </div>

      <div className="scholarship-card-footer">
        <Button
          variant="primary"
          size="md"
          onClick={() => onApply && onApply(id)}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}

export default ScholarshipCard;
