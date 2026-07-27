import api from "./api";

export const authService = {
  register: async ({ fullName, email, password, phone }) => {
    const res = await api.post("/auth/register", { fullName, email, password, phone });
    return res.data;
  },

  login: async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await api.post("/auth/logout", { refreshToken });
    } catch { /* fail silently */ } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("aif_user");
    }
  },

  refresh: async (refreshToken) => {
    const res = await api.post("/auth/refresh", { refreshToken });
    return res.data;
  },

  verifyEmail: async (token) => {
    const res = await api.post("/auth/verify-email", { token });
    return res.data;
  },

  resendVerification: async (email) => {
    const res = await api.post("/auth/resend-verification", { email });
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  },

  resetPassword: async ({ token, password }) => {
    const res = await api.post("/auth/reset-password", { token, password });
    return res.data;
  },
};