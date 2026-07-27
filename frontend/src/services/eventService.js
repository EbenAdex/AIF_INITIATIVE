import api from "./api";

export const eventService = {
  // GET /events — public
  getAll: async () => {
    const res = await api.get("/events");
    return res.data;
  },

  // GET /events/{id} — public
  getById: async (id) => {
    const res = await api.get(`/events/${id}`);
    return res.data;
  },

  // POST /events — admin only
  create: async (data) => {
    const res = await api.post("/events", data);
    return res.data;
  },

  // PATCH /events/{id} — admin only
  update: async (id, data) => {
    const res = await api.patch(`/events/${id}`, data);
    return res.data;
  },

  // DELETE /events/{id} — admin only (archives)
  delete: async (id) => {
    const res = await api.delete(`/events/${id}`);
    return res.data;
  },
};