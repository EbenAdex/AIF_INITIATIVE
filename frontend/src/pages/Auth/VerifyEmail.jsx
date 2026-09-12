import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import { authService } from "../../services/authService";
import "../../styles/auth.css";

function VerifyEmail() {
  const location = useLocation();
  const email    = location.state?.email || "";
  const [resent,   setResent]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleResend = async () => {
    setLoading(true);
    setError("");
    try {
      await authService.resendVerification(email);
      setResent(true);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to resend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <div className="brand-top">
          <div className="brand-logo">
            <div className="brand-logo-mark">AIF</div>
            <div className="brand-logo-text">
              <h2>AIF Initiative</h2>
              <span>Impact Through Humanity</span>
            </div>
          </div>
          <div className="brand-headline">
            <h1>One Last Step Before You <span>Get Started</span></h1>
            <p>Email verification keeps your account secure and ensures you receive important scholarship updates.</p>
          </div>
        </div>
        <div className="brand-bottom">© {new Date().getFullYear()} AIF Initiative. All rights reserved.</div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-inner">

          <div className="verify-icon">
            <FiMail />
          </div>

          <div className="auth-form-header">
            <h2>Check Your Email</h2>
            <p>
              We sent a verification link to{" "}
              {email && <strong>{email}</strong>}.
              Click the link in the email to activate your account.
            </p>
          </div>

          <div className="verify-steps">
            <div className="verify-step">
              <span>1</span>
              <p>Open your email inbox</p>
            </div>
            <div className="verify-step">
              <span>2</span>
              <p>Click the verification link from AIF Initiative</p>
            </div>
            <div className="verify-step">
              <span>3</span>
              <p>Come back and log in</p>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {resent && (
            <div className="auth-notice">
              ✅ Verification email resent to {email}
            </div>
          )}

          {email && (
            <button
              className="auth-btn"
              onClick={handleResend}
              disabled={loading || resent}
              style={{ marginBottom: "16px" }}
            >
              <FiRefreshCw style={{ marginRight: "8px" }} />
              {loading ? "Resending..." : resent ? "Email Sent!" : "Resend Verification Email"}
            </button>
          )}

          <div className="auth-footer">
            <span>Already verified?</span>
            <Link to="/login">Login Now</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;