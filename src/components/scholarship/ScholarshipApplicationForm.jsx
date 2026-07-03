import { useState } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";
import Button from "../common/Button";
import "../../styles/forms.css";

function ScholarshipApplicationForm({ scholarship, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gpa: "",
    institution: "",
    program: "",
    enrollmentStatus: "",
    personalStatement: "",
    agreeTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData, "Scholarship:", scholarship?.id);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gpa: "",
        institution: "",
        program: "",
        enrollmentStatus: "",
        personalStatement: "",
        agreeTerms: false,
      });
      setSubmitted(false);
      if (onClose) {
        onClose();
      }
    }, 2000);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <div className="form-header-content">
            <h2>Apply for Scholarship</h2>
            {scholarship && (
              <p className="form-subtitle">
                Program: <strong>{scholarship.title}</strong>
              </p>
            )}
          </div>
          <button
            className="form-close-btn"
            onClick={onClose}
            aria-label="Close form"
            title="Close form"
          >
            <FiX size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="form-success-container">
            <div className="form-success-message">
              <FiCheckCircle size={48} className="success-icon" />
              <h3>Application Submitted!</h3>
              <p>Thank you for applying. We've received your application and will review it carefully.</p>
              <div className="success-details">
                <p className="details-text">
                  A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
                <p className="timeline-text">
                  You can expect a response within 2-3 weeks.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="scholarship-application-form">
            {/* FORM PROGRESS */}
            <div className="form-progress">
              <div className="progress-steps">
                <div className="progress-step active">1</div>
                <div className="progress-line"></div>
                <div className="progress-step">2</div>
                <div className="progress-line"></div>
                <div className="progress-step">3</div>
              </div>
              <div className="progress-labels">
                <span>Personal</span>
                <span>Academic</span>
                <span>Review</span>
              </div>
            </div>

            {/* PERSONAL INFORMATION */}
            <div className="form-section">
              <div className="section-header">
                <h3>Personal Information</h3>
                <p>Provide your basic contact details</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john.doe@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 123-4567"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* ACADEMIC INFORMATION */}
            <div className="form-section">
              <div className="section-header">
                <h3>Academic Information</h3>
                <p>Tell us about your academic background</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gpa">Current GPA *</label>
                  <input
                    type="number"
                    id="gpa"
                    name="gpa"
                    min="0"
                    max="4"
                    step="0.01"
                    value={formData.gpa}
                    onChange={handleChange}
                    required
                    placeholder="3.8"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="institution">Institution *</label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    placeholder="University Name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="program">Program/Major *</label>
                  <input
                    type="text"
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                    placeholder="Computer Science"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enrollmentStatus">Enrollment Status *</label>
                  <select
                    id="enrollmentStatus"
                    name="enrollmentStatus"
                    value={formData.enrollmentStatus}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select status...</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="graduated">Recently Graduated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PERSONAL STATEMENT */}
            <div className="form-section">
              <div className="section-header">
                <h3>Statement of Purpose</h3>
                <p>Tell us why you deserve this scholarship (250-500 words)</p>
              </div>

              <div className="form-group">
                <label htmlFor="personalStatement">Personal Statement *</label>
                <textarea
                  id="personalStatement"
                  name="personalStatement"
                  value={formData.personalStatement}
                  onChange={handleChange}
                  required
                  placeholder="Share your academic goals, achievements, and how this scholarship would impact your future..."
                  className="form-input form-textarea"
                  rows="6"
                ></textarea>
                <p className="input-hint">
                  {formData.personalStatement.length}/500 characters recommended
                </p>
              </div>
            </div>

            {/* AGREEMENTS */}
            <div className="form-section">
              <div className="form-group checkbox-group">
                <label htmlFor="agreeTerms" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <span>I agree to the terms and conditions and privacy policy *</span>
                </label>
              </div>
            </div>

            {/* FORM ACTIONS */}
            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formData.agreeTerms}
                className="btn-submit"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ScholarshipApplicationForm;
