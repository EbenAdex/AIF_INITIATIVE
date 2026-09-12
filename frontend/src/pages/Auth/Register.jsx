import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth.css";

function Register() {
  const navigate     = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [error,        setError]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match."); return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/.test(formData.password)) {
      setError("Password must contain uppercase, lowercase and a number."); return;
    }

    setLoading(true);
    try {
      const result = await register({
        fullName: formData.fullName,
        email:    formData.email,
        phone:    formData.phone,
        password: formData.password,
      });

      // Backend requires email verification before login
      // Redirect to verification pending page
      navigate("/verify-email", { state: { email: formData.email } });

    } catch (err) {
      const msgs = err.response?.data?.error?.message;
      if (Array.isArray(msgs)) setError(msgs.join(" "));
      else setError(err.response?.data?.error?.message || "Registration failed. Please try again.");
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
            <h1>Join A Community Built On <span>Hope</span> & Impact</h1>
            <p>Register today to access life-changing scholarships, healthcare programs, and humanitarian support.</p>
          </div>
        </div>
        <div className="brand-features">
          <div className="brand-feature"><div className="brand-feature-dot" /><span>Free to register and apply</span></div>
          <div className="brand-feature"><div className="brand-feature-dot" /><span>Access multiple scholarships</span></div>
          <div className="brand-feature"><div className="brand-feature-dot" /><span>Real-time application updates</span></div>
        </div>
        <div className="brand-bottom">© {new Date().getFullYear()} AIF Initiative. All rights reserved.</div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="auth-form-header">
            <h2>Create Account</h2>
            <p>Join AIF Initiative to access scholarships, humanitarian programs and community support.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder="Enter your full name"
                value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="Enter your email"
                value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="+234 800 000 0000"
                value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input type={showPassword ? "text" : "password"} name="password"
                  placeholder="Min. 6 chars, uppercase, lowercase & number"
                  value={formData.password} onChange={handleChange} required />
                <button type="button" className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input">
                <input type={showConfirm ? "text" : "password"} name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword} onChange={handleChange} required />
                <button type="button" className="toggle-password"
                  onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;