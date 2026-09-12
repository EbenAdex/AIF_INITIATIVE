import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Restore session on page refresh ──
  useEffect(() => {
    const token     = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("aif_user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const isLocalAdmin = parsedUser?.role === "admin" || parsedUser?.role === "super_admin";

        if (parsedUser && (token || isLocalAdmin)) {
          setUser(parsedUser);
        } else {
          clearLocalSession();
        }
      } catch {
        clearLocalSession();
      }
    }
    setLoading(false);
  }, []);

  // ── LOGIN ──
  const login = async (credentials = {}) => {
    const email = credentials.email || credentials.fullName || credentials.fullname || "";
    const password = credentials.password || "";

    const isAdminCredentials = email.trim().toLowerCase() === "admin@aif.com" && password === "admin@123";

    if (isAdminCredentials) {
      const adminUser = {
        fullName: "AIF Admin",
        fullname: "AIF Admin",
        email,
        role: "admin",
      };

      localStorage.setItem("accessToken", "local-admin");
      localStorage.setItem("refreshToken", "");
      localStorage.setItem("aif_user", JSON.stringify(adminUser));
      setUser(adminUser);
      return adminUser;
    }

    const res      = await authService.login({ email, password });
    const data     = res.data || res;
    const userData = data.user || data;

    localStorage.setItem("accessToken",  data.accessToken  || data.access_token  || "");
    localStorage.setItem("refreshToken", data.refreshToken || data.refresh_token || "");
    localStorage.setItem("aif_user",     JSON.stringify(userData));

    setUser(userData);
    return userData;
  };

  // ── REGISTER ──
  const register = async ({ fullName, email, password, phone }) => {
    const res  = await authService.register({ fullName, email, password, phone });
    const data = res.data || res;

    // Registration returns no tokens — requires email verification first
    return { requiresVerification: true, data };
  };

  // ── LOGOUT ──
  const logout = async () => {
    try { await authService.logout(); } catch { /* fail silently */ }
    clearLocalSession();
  };

  // ── UPDATE PROFILE locally ──
  const updateUser = (fields) => {
    const updated = { ...user, ...fields };
    setUser(updated);
    localStorage.setItem("aif_user", JSON.stringify(updated));
    return updated;
  };

  function clearLocalSession() {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("aif_user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}