import { useState } from "react";
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
          <h2>Scholarship Application Form</h2>
          {scholarship && (
            <p className="form-subtitle">
              Applying for: <strong>{scholarship.title}</strong>
            </p>
          )}
          <button
            className="form-close-btn"
            onClick={onClose}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {submitted && (
          <div className="form-success-message">
            <h3>✓ Application Submitted Successfully!</h3>
            <p>Thank you for applying. We will review your application shortly.</p>
          </div>
        )}

        {!submitted && (
          <form onSubmit={handleSubmit} className="scholarship-application-form">
            <div className="form-section">
              <h3>Personal Information</h3>

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
                    placeholder="Enter your first name"
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
                    placeholder="Enter your last name"
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
                    placeholder="your.email@example.com"
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
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Academic Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gpa">GPA *</label>
                  <input
                    type="number"
                    id="gpa"
                    name="gpa"
                    step="0.01"
                    min="0"
                    max="5"
                    value={formData.gpa}
                    onChange={handleChange}
                    required
                    placeholder="3.5"
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
                  >
                    <option value="">Select enrollment status</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="institution">Institution / University *</label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  placeholder="Name of your institution"
                />
              </div>

              <div className="form-group">
                <label htmlFor="program">Program / Major *</label>
                <input
                  type="text"
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  placeholder="Your program or major"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Information</h3>

              <div className="form-group">
                <label htmlFor="personalStatement">Personal Statement *</label>
                <textarea
                  id="personalStatement"
                  name="personalStatement"
                  rows="6"
                  value={formData.personalStatement}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your academic goals, achievements, and why you deserve this scholarship (minimum 100 words)"
                  minLength="100"
                />
                <small>Minimum 100 characters required</small>
              </div>
            </div>

            <div className="form-section">
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to the terms and conditions and authorize AIF Initiative
                  to process my application *
                </span>
              </label>
            </div>

            <div className="form-actions">
              <Button
                variant="primary"
                size="lg"
                type="submit"
              >
                Submit Application
              </Button>
              <Button
                variant="outline"
                size="lg"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ScholarshipApplicationForm;
