import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { userService }  from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Restore session on page refresh ──
  useEffect(() => {
    const restoreSession = async () => {
      const token     = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("aif_user");

      if (token && savedUser) {
        try {
          // Validate token is still alive by fetching fresh profile
          const res      = await userService.getMe();
          const userData = res.data || res;
          setUser(userData);
          localStorage.setItem("aif_user", JSON.stringify(userData));
        } catch {
          // Token expired/invalid — clear session
          clearLocalSession();
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  // ── LOGIN ──
  const login = async ({ email, password }) => {
    const res = await authService.login({ email, password });
    // Response envelope: { success: true, data: { accessToken, refreshToken, user } }
    const data     = res.data || res;
    const userData = data.user || data;

    localStorage.setItem("accessToken",  data.accessToken  || data.access_token);
    localStorage.setItem("refreshToken", data.refreshToken || data.refresh_token);
    localStorage.setItem("aif_user",     JSON.stringify(userData));

    setUser(userData);
    return userData;
  };

  // ── REGISTER ──
  const register = async ({ fullName, email, password, phone }) => {
    const res      = await authService.register({ fullName, email, password, phone });
    const data     = res.data || res;
    const userData = data.user || data;

    // Registration may require email verification before tokens are issued
    if (data.accessToken || data.access_token) {
      localStorage.setItem("accessToken",  data.accessToken  || data.access_token);
      localStorage.setItem("refreshToken", data.refreshToken || data.refresh_token);
      localStorage.setItem("aif_user",     JSON.stringify(userData));
      setUser(userData);
    }

    return { userData, requiresVerification: !data.accessToken };
  };

  // ── LOGOUT ──
  const logout = async () => {
    await authService.logout();
    clearLocalSession();
  };

  // ── UPDATE PROFILE ──
  const updateUser = async (fields) => {
    const res      = await userService.updateMe(fields);
    const userData = res.data || res;
    const updated  = { ...user, ...userData };
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