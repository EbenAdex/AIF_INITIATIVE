import api from "./api";

export const messageService = {
  getAll:       async ()         => (await api.get("/api/messages")).data,
  send:         async (data)     => (await api.post("/api/messages", data)).data,
  updateStatus: async (id, status) => (await api.patch(`/api/messages/${id}/status`, { status })).data,
  delete:       async (id)       => (await api.delete(`/api/messages/${id}`)).data,
};