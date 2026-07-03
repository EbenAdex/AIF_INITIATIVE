import { createContext, useContext, useState } from "react";

// ─── INITIAL DATA ───────────────────────────────────────────
const defaultScholarships = [
  {
    id: 1,
    title: "Undergraduate Scholarship",
    category: "Education",
    amount: "₦500,000",
    deadline: "Aug 12, 2026",
    status: "Open",
    description:
      "Full financial support for outstanding undergraduate students across multiple disciplines committed to academic excellence.",
    eligibility: "Nigerian citizens, CGPA 3.5+, 100–400 level",
  },
  {
    id: 2,
    title: "Healthcare Support Grant",
    category: "Healthcare",
    amount: "₦300,000",
    deadline: "Sep 2, 2026",
    status: "Open",
    description:
      "Empowering healthcare students and supporting medical outreach initiatives across underserved communities.",
    eligibility: "Medical/Nursing/Pharmacy students, CGPA 3.0+",
  },
  {
    id: 3,
    title: "STEM Excellence Award",
    category: "Technology",
    amount: "₦750,000",
    deadline: "Jul 30, 2026",
    status: "Closing Soon",
    description:
      "Supporting brilliant minds in Science, Technology, Engineering and Mathematics to build Nigeria's future.",
    eligibility: "STEM disciplines, 200–500 level, CGPA 3.8+",
  },
  {
    id: 4,
    title: "Community Dev Fund",
    category: "Community",
    amount: "₦200,000",
    deadline: "Jun 15, 2026",
    status: "Closed",
    description:
      "Supporting innovative youth-led community development and humanitarian programs across Nigeria.",
    eligibility: "Open to all disciplines with demonstrated community impact",
  },
];

const defaultEvents = [
  {
    id: 1,
    title: "Community Health Outreach",
    date: "Jun 10, 2026",
    location: "Lagos",
    category: "Healthcare",
    status: "Upcoming",
    description: "Free medical checkups and health education for underserved communities.",
  },
  {
    id: 2,
    title: "Scholarship Award Night",
    date: "Jul 5, 2026",
    location: "Abuja",
    category: "Education",
    status: "Upcoming",
    description: "Annual celebration honouring AIF scholarship recipients and partners.",
  },
  {
    id: 3,
    title: "Youth Empowerment Summit",
    date: "Apr 12, 2026",
    location: "Lagos",
    category: "Community",
    status: "Completed",
    description: "A full-day summit connecting young leaders with mentors and opportunities.",
  },
];

// ─── CONTEXT ────────────────────────────────────────────────
const DataContext = createContext();

export function DataProvider({ children }) {
  const [scholarships, setScholarships] = useState(defaultScholarships);
  const [events, setEvents] = useState(defaultEvents);
  const [applications, setApplications] = useState([
    { id: 1, name: "Ayo Johnson",  email: "ayo@gmail.com",   scholarshipId: 1, scholarship: "Undergraduate Scholarship",   date: "May 28, 2026", status: "Pending" },
    { id: 2, name: "David Mark",   email: "david@gmail.com",  scholarshipId: 2, scholarship: "Healthcare Support Grant",    date: "May 25, 2026", status: "Approved" },
    { id: 3, name: "Sarah Nwosu",  email: "sarah@gmail.com",  scholarshipId: 3, scholarship: "STEM Excellence Award",       date: "May 22, 2026", status: "Pending" },
    { id: 4, name: "Emeka Obi",    email: "emeka@gmail.com",  scholarshipId: 4, scholarship: "Community Dev Fund",          date: "May 20, 2026", status: "Rejected" },
  ]);

  // ── SCHOLARSHIP CRUD ──
  const addScholarship = (data) => {
    const entry = { ...data, id: Date.now() };
    setScholarships((prev) => [entry, ...prev]);
  };

  const updateScholarship = (id, data) => {
    setScholarships((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const deleteScholarship = (id) => {
    setScholarships((prev) => prev.filter((s) => s.id !== id));
  };

  // ── EVENT CRUD ──
  const addEvent = (data) => {
    setEvents((prev) => [{ ...data, id: Date.now() }, ...prev]);
  };

  const updateEvent = (id, data) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // ── APPLICATION ACTIONS ──
  const updateApplicationStatus = (id, status) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const addApplication = (data) => {
    setApplications((prev) => [{ ...data, id: Date.now(), date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), status: "Pending" }, ...prev]);
  };

  return (
    <DataContext.Provider
      value={{
        scholarships,
        events,
        applications,
        addScholarship,
        updateScholarship,
        deleteScholarship,
        addEvent,
        updateEvent,
        deleteEvent,
        updateApplicationStatus,
        addApplication,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}