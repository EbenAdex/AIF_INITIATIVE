import { createContext, useContext } from "react";
import { useData } from "./DataContext";

// NotificationContext now delegates to DataContext
// which pulls real notifications from /notifications

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const {
    notifications,
    unreadCount,
    markNotifRead,
    markAllNotifsRead,
  } = useData();

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markNotifRead,
      markAllNotifsRead,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}