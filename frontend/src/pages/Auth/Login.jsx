import { Link, useNavigate } from "react-router-dom";

import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import "../../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });

  };

  /* HANDLE LOGIN */

  const handleSubmit = (e) => {

    e.preventDefault();

    /* ADMIN LOGIN */

    if (
      formData.email ===
      "admin@aif.com"
    ) {

      const adminUser = {
        fullname: "AIF Admin",

        email: formData.email,

        role: "admin",
      };

      localStorage.setItem(
        "aif_user",
        JSON.stringify(adminUser)
      );

      login(adminUser);

      navigate("/admin/dashboard");

      return;
    }

    /* NORMAL USER */

    const normalUser = {
      fullname: "AIF User",

      email: formData.email,

      role: "user",
    };

    localStorage.setItem(
      "aif_user",
      JSON.stringify(normalUser)
    );

    login(normalUser);

    navigate("/home");

  };

  return (
    <section className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-container">

        <div className="auth-card">

          <div className="auth-header">

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to access your
              scholarship dashboard
              and application updates.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="password-input">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
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

            {/* FORGOT PASSWORD */}

            <div className="forgot-password">

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-btn"
            >
              Login
            </button>

          </form>

          {/* FOOTER */}

          <div className="auth-footer">

            <span>
              Don’t have an account?
            </span>

            <Link to="/register">
              Register
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Login;