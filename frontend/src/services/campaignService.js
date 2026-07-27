import api from "./api";

// NOTE: The backend uses "campaigns" not "donors"
// This maps to the Donors section of the frontend

export const campaignService = {
  // GET /campaigns — public: list active campaigns
  getAll: async () => {
    const res = await api.get("/campaigns");
    return res.data;
  },

  // GET /campaigns/admin/all — admin: list ALL campaigns
  getAllAdmin: async () => {
    const res = await api.get("/campaigns/admin/all");
    return res.data;
  },

  // GET /campaigns/{id} — public: get campaign details
  getById: async (id) => {
    const res = await api.get(`/campaigns/${id}`);
    return res.data;
  },

  // POST /campaigns — admin: create campaign
  create: async (data) => {
    const res = await api.post("/campaigns", data);
    return res.data;
  },

  // PATCH /campaigns/{id} — admin: update campaign
  update: async (id, data) => {
    const res = await api.patch(`/campaigns/${id}`, data);
    return res.data;
  },

  // DELETE /campaigns/{id} — admin: archive campaign
  delete: async (id) => {
    const res = await api.delete(`/campaigns/${id}`);
    return res.data;
  },
};