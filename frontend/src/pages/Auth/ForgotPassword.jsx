import { Link } from "react-router-dom";

import "../../styles/auth.css";

function ForgotPassword() {
  return (
    <section className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Forgot Password</h2>

            <p>
              Enter your email to receive a
              password reset link.
            </p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="auth-btn"
            >
              Send Reset Link
            </button>
          </form>

          <div className="auth-footer">
            <Link to="/login">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;