import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import "../../styles/auth.css";

function AdminLogin() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    /* TEMP ADMIN AUTH */

    if (
      email === "admin@aif.com" &&
      password === "admin@123"
    ) {

      const adminUser = {
        fullname: "AIF Admin",
        email,
        role: "admin",
      };

      localStorage.setItem(
        "aif_user",
        JSON.stringify(adminUser)
      );

      navigate("/admin/dashboard");

    } else {

      alert(
        "Invalid admin credentials"
      );

    }

  };

  return (
    <section className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-container">

        <div className="auth-card">

          <div className="auth-badge">
            Admin Portal
          </div>

          <h2>
            Admin Login
          </h2>

          <p>
            Login to manage scholarships,
            applications, users, and
            platform operations.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">

              <label>
                Admin Email
              </label>

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="password-field">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}

                </button>

              </div>

            </div>

            <button
              type="submit"
              className="auth-btn"
            >
              Login as Admin
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default AdminLogin;