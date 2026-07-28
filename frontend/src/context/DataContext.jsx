import { createContext, useContext, useState, useEffect } from "react";

// ─── LOCALSTORAGE HELPERS ───────────────────────────────────
const STORAGE_KEY = "aif_platform_data";

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save AIF data:", e);
  }
}

// ─── DEFAULT DATA (used only on first load) ─────────────────
const defaultScholarships = [
  {
    id: 1,
    title: "Undergraduate Scholarship",
    category: "Education",
    amount: "₦500,000",
    deadline: "Aug 12, 2026",
    status: "Open",
    description: "Full financial support for outstanding undergraduate students across multiple disciplines committed to academic excellence.",
    eligibility: "Nigerian citizens, CGPA 3.5+, 100–400 level",
  },
  {
    id: 2,
    title: "Healthcare Support Grant",
    category: "Healthcare",
    amount: "₦300,000",
    deadline: "Sep 2, 2026",
    status: "Open",
    description: "Empowering healthcare students and supporting medical outreach initiatives across underserved communities.",
    eligibility: "Medical/Nursing/Pharmacy students, CGPA 3.0+",
  },
  {
    id: 3,
    title: "STEM Excellence Award",
    category: "Technology",
    amount: "₦750,000",
    deadline: "Jul 30, 2026",
    status: "Closing Soon",
    description: "Supporting brilliant minds in Science, Technology, Engineering and Mathematics to build Nigeria's future.",
    eligibility: "STEM disciplines, 200–500 level, CGPA 3.8+",
  },
  {
    id: 4,
    title: "Community Dev Fund",
    category: "Community",
    amount: "₦200,000",
    deadline: "Jun 15, 2026",
    status: "Closed",
    description: "Supporting innovative youth-led community development and humanitarian programs across Nigeria.",
    eligibility: "Open to all disciplines with demonstrated community impact",
  },
];

const defaultEvents = [
  { id: 1, title: "Community Health Outreach", date: "Jun 10, 2026", location: "Lagos", category: "Healthcare", status: "Upcoming", description: "Free medical checkups and health education for underserved communities." },
  { id: 2, title: "Scholarship Award Night",   date: "Jul 5, 2026",  location: "Abuja", category: "Education",  status: "Upcoming", description: "Annual celebration honouring AIF scholarship recipients and partners." },
  { id: 3, title: "Youth Empowerment Summit",  date: "Apr 12, 2026", location: "Lagos", category: "Community",  status: "Completed", description: "A full-day summit connecting young leaders with mentors and opportunities." },
];

const defaultApplications = [
  { id: 1, name: "Ayo Johnson", email: "ayo@gmail.com",   scholarshipId: 1, scholarship: "Undergraduate Scholarship", date: "May 28, 2026", status: "Pending" },
  { id: 2, name: "David Mark",  email: "david@gmail.com", scholarshipId: 2, scholarship: "Healthcare Support Grant",  date: "May 25, 2026", status: "Approved" },
  { id: 3, name: "Sarah Nwosu", email: "sarah@gmail.com", scholarshipId: 3, scholarship: "STEM Excellence Award",     date: "May 22, 2026", status: "Pending" },
  { id: 4, name: "Emeka Obi",   email: "emeka@gmail.com", scholarshipId: 4, scholarship: "Community Dev Fund",        date: "May 20, 2026", status: "Rejected" },
];

const defaultDonors = [
  { id: 1, name: "Chukwuemeka Foundation", type: "Corporate", amount: "₦2,500,000", date: "Mar 15, 2026", status: "Active", email: "info@cefoundation.org" },
  { id: 2, name: "Amina Bello",            type: "Individual", amount: "₦150,000",  date: "Apr 2, 2026",  status: "Active", email: "amina.b@gmail.com" },
  { id: 3, name: "TechBridge Africa",      type: "Corporate",  amount: "₦5,000,000", date: "Feb 20, 2026", status: "Active", email: "partnerships@techbridge.africa" },
];

const defaultMessages = [
  { id: 1, name: "Funmi Adebayo", email: "funmi.a@gmail.com", phone: "+234 801 234 5678", subject: "Scholarship Eligibility Question", department: "Scholarship", message: "Hi, I'd like to know if final year students are eligible for the STEM Excellence Award.", date: "Jun 18, 2026", status: "Unread" },
  { id: 2, name: "Tunde Bakare",  email: "tunde.b@gmail.com", phone: "+234 802 345 6789", subject: "Application Status Check", department: "Applications", message: "I submitted my application 3 weeks ago and haven't heard back. Can you check the status?", date: "Jun 16, 2026", status: "Read" },
  { id: 3, name: "GreenLeaf NGO", email: "contact@greenleaf.org", phone: "+234 803 456 7890", subject: "Partnership Proposal", department: "Partnership", message: "We'd like to discuss a potential partnership for our community health programs in Kano.", date: "Jun 14, 2026", status: "Replied" },
];

// ─── CONTEXT ────────────────────────────────────────────────
const DataContext = createContext();

export function DataProvider({ children }) {
  // Initialize from localStorage, fall back to defaults
  const saved = loadFromStorage();

  const [scholarships, setScholarships] = useState(saved?.scholarships || defaultScholarships);
  const [events, setEvents]             = useState(saved?.events || defaultEvents);
  const [applications, setApplications] = useState(saved?.applications || defaultApplications);
  const [donors, setDonors]             = useState(saved?.donors || defaultDonors);
  const [messages, setMessages]         = useState(saved?.messages || defaultMessages);
  const [users, setUsers]               = useState(saved?.users || []);

  // Persist everything to localStorage whenever any piece changes
  useEffect(() => {
    saveToStorage({ scholarships, events, applications, donors, messages, users });
  }, [scholarships, events, applications, donors, messages, users]);

  // ── SCHOLARSHIP CRUD ──
  const addScholarship = (data) => setScholarships(prev => [{ ...data, id: Date.now() }, ...prev]);
  const updateScholarship = (id, data) => setScholarships(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteScholarship = (id) => setScholarships(prev => prev.filter(s => s.id !== id));

  // ── EVENT CRUD ──
  const addEvent = (data) => setEvents(prev => [{ ...data, id: Date.now() }, ...prev]);
  const updateEvent = (id, data) => setEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  // ── APPLICATION ACTIONS ──
  const updateApplicationStatus = (id, status) => setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  const addApplication = (data) => setApplications(prev => [{
    ...data, id: Date.now(),
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: "Pending",
  }, ...prev]);
  const deleteApplication = (id) => setApplications(prev => prev.filter(a => a.id !== id));

  // ── DONOR CRUD ──
  const addDonor = (data) => setDonors(prev => [{ ...data, id: Date.now() }, ...prev]);
  const updateDonor = (id, data) => setDonors(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  const deleteDonor = (id) => setDonors(prev => prev.filter(d => d.id !== id));

  // ── CONTACT MESSAGES ──
  // Called from the public Contact form
  const addMessage = (data) => setMessages(prev => [{
    ...data, id: Date.now(),
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: "Unread",
  }, ...prev]);
  const updateMessageStatus = (id, status) => setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  const deleteMessage = (id) => setMessages(prev => prev.filter(m => m.id !== id));

  // ── USER MANAGEMENT (registered users, synced from Register page) ──
  const registerUser = (data) => setUsers(prev => [{
    ...data, id: Date.now(),
    joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    status: "Active",
  }, ...prev]);
  const toggleUserStatus = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <DataContext.Provider
      value={{
        scholarships, addScholarship, updateScholarship, deleteScholarship,
        events, addEvent, updateEvent, deleteEvent,
        applications, addApplication, updateApplicationStatus, deleteApplication,
        donors, addDonor, updateDonor, deleteDonor,
        messages, addMessage, updateMessageStatus, deleteMessage,
        users, registerUser, toggleUserStatus, deleteUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}