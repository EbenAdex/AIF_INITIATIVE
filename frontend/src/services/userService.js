import api from "./api";

export const userService = {
  // GET /users/me — get my profile
  getMe: async () => {
    const res = await api.get("/users/me");
    return res.data;
  },

  // PATCH /users/me — update my profile
  updateMe: async (data) => {
    const res = await api.patch("/users/me", data);
    return res.data;
  },

  // GET /users — admin: list all users
  getAll: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  // GET /users/{id} — admin: get user by ID
  getById: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
};