import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth.css";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Invalid admin credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT BRAND PANEL */}
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
            <h1>Secure <span>Admin</span> Control Center</h1>
            <p>Manage scholarships, review applications, control platform content, and oversee all operations from one place.</p>
          </div>
        </div>

        <div className="brand-features">
          <div className="brand-feature">
            <div className="brand-feature-dot" />
            <span>Full scholarship management</span>
          </div>
          <div className="brand-feature">
            <div className="brand-feature-dot" />
            <span>Review & approve applications</span>
          </div>
          <div className="brand-feature">
            <div className="brand-feature-dot" />
            <span>Manage users and events</span>
          </div>
        </div>

        <div className="brand-bottom">
          © {new Date().getFullYear()} AIF Initiative. Admin Portal.
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">

          <div className="auth-form-header">
            <div className="auth-admin-badge">
              <FiShield /> Admin Portal
            </div>
            <h2>Admin Login</h2>
            <p>Restricted access. Authorised personnel only.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" placeholder="Enter admin email"
                value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                />
                <button type="button" className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Login as Admin"}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default AdminLogin;