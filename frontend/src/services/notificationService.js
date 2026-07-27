import api from "./api";

export const notificationService = {
  // GET /notifications — get my notifications
  getAll: async () => {
    const res = await api.get("/notifications");
    return res.data;
  },

  // GET /notifications/unread-count — get unread count
  getUnreadCount: async () => {
    const res = await api.get("/notifications/unread-count");
    return res.data;
  },

  // PATCH /notifications/read-all — mark all as read
  markAllRead: async () => {
    const res = await api.patch("/notifications/read-all");
    return res.data;
  },

  // PATCH /notifications/{id}/read — mark one as read
  markOneRead: async (id) => {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data;
  },

  // POST /notifications — admin: send a notification
  send: async (data) => {
    const res = await api.post("/notifications", data);
    return res.data;
  },
};