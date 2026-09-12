import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { scholarshipService }  from "../services/scholarshipService";
import { eventService }        from "../services/eventService";
import { applicationService }  from "../services/applicationService";
import { campaignService }     from "../services/campaignService";
import { notificationService } from "../services/notificationService";
import { userService }         from "../services/userService";
import { useAuth }             from "./AuthContext";

const DataContext = createContext();

// ── Helper: unwrap { success, data } envelope ──
const unwrap = (res) => {
  if (res?.data && res?.success !== undefined) return res.data;
  if (Array.isArray(res)) return res;
  return res?.data || res || [];
};

export function DataProvider({ children }) {
  const { user }  = useAuth();
  const isAdmin   = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const [scholarships,   setScholarships]   = useState([]);
  const [events,         setEvents]         = useState([]);
  const [applications,   setApplications]   = useState([]);
  const [campaigns,      setCampaigns]      = useState([]);
  const [donors,         setDonors]         = useState([]);
  const [notifications,  setNotifications]  = useState([]);
  const [messages,       setMessages]       = useState([]); // always defined
  const [unreadCount,    setUnreadCount]     = useState(0);
  const [users,          setUsers]          = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState(null);

  // ── PUBLIC DATA (scholarships + events — no auth needed) ──
  const fetchPublicData = useCallback(async () => {
    try {
      setLoading(true);
      const [schRes, evtRes, campRes] = await Promise.all([
        scholarshipService.getAll(),
        eventService.getAll(),
        campaignService.getAll(),
      ]);
      setScholarships(unwrap(schRes));
      setEvents(unwrap(evtRes));
      setCampaigns(unwrap(campRes));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── USER DATA ──
  const fetchUserData = useCallback(async () => {
    try {
      const [appRes, notifRes, countRes] = await Promise.all([
        applicationService.getMine(),
        notificationService.getAll(),
        notificationService.getUnreadCount(),
      ]);
      setApplications(unwrap(appRes));
      setNotifications(unwrap(notifRes));
      setUnreadCount(countRes?.data?.count || countRes?.count || 0);
    } catch (err) {
      console.error("User data fetch error:", err);
    }
  }, []);

  // ── ADMIN DATA ──
  const fetchAdminData = useCallback(async () => {
    try {
      const [appRes, userRes, campRes, notifRes] = await Promise.all([
        applicationService.getAll(),
        userService.getAll(),
        campaignService.getAllAdmin(),
        notificationService.getAll(),
      ]);
      const adminCampaigns = unwrap(campRes);
      setApplications(unwrap(appRes));
      setUsers(unwrap(userRes));
      setCampaigns(adminCampaigns);
      setDonors((Array.isArray(adminCampaigns) ? adminCampaigns : []).map((item, index) => ({
        id: item.id ?? index + 1,
        name: item.name || item.title || "Anonymous Donor",
        type: item.type || "Individual",
        amount: item.amount || item.targetAmount || "₦0",
        email: item.email || "",
        status: item.status || "Active",
        date: item.date || item.createdAt || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      })));
      setNotifications(unwrap(notifRes));
    } catch (err) {
      console.error("Admin data fetch error:", err);
    }
  }, []);

  // ── Load on login ──
  useEffect(() => {
    if (!user) return;
    fetchPublicData();
    if (isAdmin) fetchAdminData();
    else fetchUserData();
  }, [user, isAdmin, fetchPublicData, fetchAdminData, fetchUserData]);

  // ── SCHOLARSHIP CRUD ──
  const addScholarship = async (data) => {
    const res = await scholarshipService.create(data);
    setScholarships(prev => [unwrap(res), ...prev]);
  };
  const updateScholarship = async (id, data) => {
    const res = await scholarshipService.update(id, data);
    setScholarships(prev => prev.map(s => s.id === id ? unwrap(res) : s));
  };
  const deleteScholarship = async (id) => {
    await scholarshipService.delete(id);
    setScholarships(prev => prev.filter(s => s.id !== id));
  };
  const updateScholarshipStatus = async (id, status) => {
    const res = await scholarshipService.updateStatus(id, status);
    setScholarships(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    return res;
  };

  // ── EVENT CRUD ──
  const addEvent = async (data) => {
    const res = await eventService.create(data);
    setEvents(prev => [unwrap(res), ...prev]);
  };
  const updateEvent = async (id, data) => {
    const res = await eventService.update(id, data);
    setEvents(prev => prev.map(e => e.id === id ? unwrap(res) : e));
  };
  const deleteEvent = async (id) => {
    await eventService.delete(id);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // ── APPLICATION ACTIONS ──
  const addApplication = async (data) => {
    const res = await applicationService.submit(data);
    const app = unwrap(res);
    setApplications(prev => [app, ...prev]);
    return app;
  };
  const updateApplicationStatus = async (id, status) => {
    await applicationService.updateStatus(id, status);
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };
  const deleteApplication = async (id) => {
    await applicationService.delete(id);
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  // ── DONOR CRUD ──
  const addDonor = async (data) => {
    const donor = {
      id: Date.now(),
      ...data,
      date: data.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setDonors(prev => [donor, ...prev]);
    return donor;
  };
  const updateDonor = async (id, data) => {
    setDonors(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  };
  const deleteDonor = async (id) => {
    setDonors(prev => prev.filter(d => d.id !== id));
  };

  // ── CAMPAIGN CRUD ──
  const addCampaign = async (data) => {
    const res = await campaignService.create(data);
    setCampaigns(prev => [unwrap(res), ...prev]);
  };
  const updateCampaign = async (id, data) => {
    const res = await campaignService.update(id, data);
    setCampaigns(prev => prev.map(c => c.id === id ? unwrap(res) : c));
  };
  const deleteCampaign = async (id) => {
    await campaignService.delete(id);
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  // ── NOTIFICATIONS ──
  const markNotifRead = async (id) => {
    await notificationService.markOneRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  const markAllNotifsRead = async () => {
    await notificationService.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <DataContext.Provider value={{
      // State
      scholarships, events, applications, campaigns, donors,
      messages, notifications, unreadCount, users,
      loading, error,
      // Refreshers
      fetchPublicData, fetchUserData, fetchAdminData,
      // Scholarships
      addScholarship, updateScholarship, deleteScholarship, updateScholarshipStatus,
      // Events
      addEvent, updateEvent, deleteEvent,
      // Applications
      addApplication, updateApplicationStatus, deleteApplication,
      // Donors / Campaigns
      addDonor, updateDonor, deleteDonor,
      addCampaign, updateCampaign, deleteCampaign,
      // Notifications
      markNotifRead, markAllNotifsRead,
      // Users (admin)
      users,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}