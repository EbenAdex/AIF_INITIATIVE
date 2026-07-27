import api from "./api";

export const scholarshipService = {
  // GET /scholarships
  getAll: async () => {
    const res = await api.get("/scholarships");
    return res.data;
  },

  // GET /scholarships/{id}
  getById: async (id) => {
    const res = await api.get(`/scholarships/${id}`);
    return res.data;
  },

  // POST /scholarships (admin only)
  create: async (data) => {
    const res = await api.post("/scholarships", data);
    return res.data;
  },

  // PATCH /scholarships/{id} (admin only) — NOTE: PATCH not PUT
  update: async (id, data) => {
    const res = await api.patch(`/scholarships/${id}`, data);
    return res.data;
  },

  // PATCH /scholarships/{id}/status (admin only)
  updateStatus: async (id, status) => {
    const res = await api.patch(`/scholarships/${id}/status`, { status });
    return res.data;
  },

  // DELETE /scholarships/{id} (admin only)
  delete: async (id) => {
    const res = await api.delete(`/scholarships/${id}`);
    return res.data;
  },
};