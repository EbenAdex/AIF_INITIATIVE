import api from "./api";

export const applicationService = {
  // POST /applications — submit application (auth required)
  submit: async (data) => {
    const res = await api.post("/applications", data);
    return res.data;
  },

  // GET /applications — admin: list all applications
  getAll: async () => {
    const res = await api.get("/applications");
    return res.data;
  },

  // GET /applications/my — user: get my applications
  getMine: async () => {
    const res = await api.get("/applications/my");
    return res.data;
  },

  // GET /applications/{id} — get single application
  getById: async (id) => {
    const res = await api.get(`/applications/${id}`);
    return res.data;
  },

  // PATCH /applications/{id}/status — admin: approve/reject
  updateStatus: async (id, status) => {
    const res = await api.patch(`/applications/${id}/status`, { status });
    return res.data;
  },

  // DELETE /applications/{id} — withdraw application
  delete: async (id) => {
    const res = await api.delete(`/applications/${id}`);
    return res.data;
  },
};