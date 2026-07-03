import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (formData.email === "admin@aif.com") {
        const adminUser = { fullname: "AIF Admin", email: formData.email, role: "admin" };
        localStorage.setItem("aif_user", JSON.stringify(adminUser));
        login(adminUser);
        navigate("/admin/dashboard");
      } else {
        const users = JSON.parse(localStorage.getItem("aif_users") || "[]");
        const found = users.find(u => u.email === formData.email);
        if (found && found.password === formData.password) {
          const userData = { fullname: found.fullname, email: found.email, role: "user" };
          localStorage.setItem("aif_user", JSON.stringify(userData));
          login(userData);
          navigate("/home");
        } else if (!found) {
          const userData = { fullname: formData.email.split("@")[0], email: formData.email, role: "user" };
          localStorage.setItem("aif_user", JSON.stringify(userData));
          login(userData);
          navigate("/home");
        } else {
          setError("Incorrect password. Please try again.");
        }
      }
      setLoading(false);
    }, 600);
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
            <h1>Empowering Lives Through <span>Education</span> & Humanity</h1>
            <p>Access scholarships, humanitarian programs, and community support designed to transform lives across Nigeria.</p>
          </div>
        </div>

        <div className="brand-features">
          <div className="brand-feature">
            <div className="brand-feature-dot" />
            <span>Apply for scholarships easily</span>
          </div>
          <div className="brand-feature">
            <div className="brand-feature-dot" />
            <span>Track your application status</span>
          </div>
          <div className="brand-feature">
            <div className="brand-feature-dot" />
            <span>Access exclusive programs</span>
          </div>
        </div>

        <div className="brand-bottom">
          © {new Date().getFullYear()} AIF Initiative. All rights reserved.
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">

          <div className="auth-form-header">
            <h2>Welcome Back</h2>
            <p>Login to access your scholarship dashboard and track your applications.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="Enter your email"
                value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <span>Don't have an account?</span>
            <Link to="/register">Create Account</Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;