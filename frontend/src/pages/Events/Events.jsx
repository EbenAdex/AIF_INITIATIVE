import { useState, useEffect, useMemo } from "react";
import {
  FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt,
  FaVideo, FaTimes, FaCheckCircle, FaUsers,
} from "react-icons/fa";

import PageBanner from "../../components/common/PageBanner";
import SectionHeader from "../../components/common/SectionHeader";
import Button from "../../components/common/Button";
import { useData } from "../../context/DataContext";

import EventsBanner  from "../../assets/images/Hero-image.jpg";
import HealthcareImg from "../../assets/images/Healthcare2.jpg";
import EducationImg  from "../../assets/images/Education2.jpg";
import CommunityImg  from "../../assets/images/Community2.jpg";
import EmpowermentImg from "../../assets/images/empowerment.jpg";

import "../../styles/events.css";
import "../../styles/forms.css";

/* ── Default image pool for admin-created events ── */
const IMAGE_POOL = [HealthcareImg, EducationImg, CommunityImg, EmpowermentImg];
const pickImage = (index) => IMAGE_POOL[index % IMAGE_POOL.length];

/* ── Format ISO or "Mon DD, YYYY" date strings ── */
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr; // already formatted (e.g. "Jun 10, 2026")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/* ── Determine upcoming vs past from a date string ── */
const deriveStatus = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d)) return "upcoming"; // can't parse → show as upcoming
  return d >= new Date() ? "upcoming" : "past";
};

/* ── Map admin event status to tab key ── */
const toTabStatus = (adminStatus) => {
  if (!adminStatus) return "upcoming";
  const s = adminStatus.toLowerCase();
  if (s === "completed") return "past";
  return "upcoming"; // "Upcoming" → upcoming
};

const CATEGORIES = ["All", "Fundraisers", "Community Outreach", "Seminars", "Healthcare", "Education", "Community", "Technology"];

function Events() {
  const { events: adminEvents } = useData();

  const [activeTab, setActiveTab]       = useState("upcoming");
  const [category, setCategory]         = useState("All");
  const [search, setSearch]             = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submitted, setSubmitted]       = useState(false);

  /* ── Merge admin events with rich display data ── */
  const allEvents = useMemo(() => {
    return adminEvents.map((e, i) => ({
      // spread all admin fields
      ...e,
      // derive tab status from admin's "status" field OR the date
      tabStatus: toTabStatus(e.status),
      // if no image stored, pick from pool
      image: e.image || pickImage(i),
      // normalise date for display
      displayDate: formatDate(e.date),
      // fill in optional fields admins might not have set
      time: e.time || "TBD",
      location: e.location || "TBD",
      isVirtual: e.location?.toLowerCase() === "virtual" || false,
      capacity: e.capacity || 0,
      registered: e.registered || 0,
      category: e.category || "General",
      description: e.description || "Join us for this exciting AIF Initiative event.",
    }));
  }, [adminEvents]);

  /* ── Extract unique categories from live data ── */
  const liveCategories = useMemo(() => {
    const cats = new Set(allEvents.map(e => e.category));
    return ["All", ...Array.from(cats)];
  }, [allEvents]);

  /* ── Filter by tab + category + search ── */
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allEvents.filter(e => {
      const matchesTab      = e.tabStatus === activeTab;
      const matchesCategory = category === "All" || e.category === category;
      const matchesSearch   = !query ||
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query);
      return matchesTab && matchesCategory && matchesSearch;
    });
  }, [allEvents, activeTab, category, search]);

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedEvent]);

  const openModal  = (event) => { setSubmitted(false); setSelectedEvent(event); };
  const closeModal = () => setSelectedEvent(null);
  const handleRegister = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <PageBanner
        title="Events & Programs"
        subtitle="Discover where impact happens — explore our upcoming gatherings and revisit the moments that shaped our communities."
        backgroundImage={EventsBanner}
      />

      <section className="events-page section">
        <div className="container">
          <SectionHeader
            tag="Foundation Events"
            title="Connect, Contribute & Celebrate Impact"
            icon="events"
          />

          {/* SEARCH */}
          <div className="events-search">
            <FaSearch className="events-search-icon" />
            <input
              type="search"
              placeholder="Search events by name or keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* CONTROLS */}
          <div className="events-controls">
            <div className="events-tabs" role="tablist">
              <button
                role="tab"
                className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Events
                <span className="tab-count">
                  {allEvents.filter(e => e.tabStatus === "upcoming").length}
                </span>
              </button>
              <button
                role="tab"
                className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
                onClick={() => setActiveTab("past")}
              >
                Past Events
                <span className="tab-count">
                  {allEvents.filter(e => e.tabStatus === "past").length}
                </span>
              </button>
            </div>

            <div className="events-filter">
              <label htmlFor="event-category">Category</label>
              <select id="event-category" value={category} onChange={e => setCategory(e.target.value)}>
                {liveCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* EVENTS GRID */}
          {filteredEvents.length > 0 ? (
            <div className="events-list-grid">
              {filteredEvents.map((event, i) => (
                <article key={event.id} className="event-item">
                  <header className="event-media">
                    <img src={event.image} alt={event.title} />
                    <span className="event-date-badge">
                      <FaCalendarAlt /> {event.displayDate}
                    </span>
                    <span className="event-category-pill">{event.category}</span>
                  </header>

                  <div className="event-body">
                    <div className="event-meta">
                      <span><FaClock /> {event.time}</span>
                      <span>
                        {event.isVirtual
                          ? <><FaVideo /> Virtual</>
                          : <><FaMapMarkerAlt /> {event.location}</>
                        }
                      </span>
                    </div>

                    <h3>{event.title}</h3>
                    <p>{event.description}</p>

                    <div className="event-footer">
                      {event.capacity > 0 && (
                        <span className="event-capacity">
                          <FaUsers /> {event.registered}/{event.capacity}
                        </span>
                      )}
                      {event.tabStatus === "upcoming" ? (
                        <Button variant="primary" size="sm" onClick={() => openModal(event)}>
                          Register Now
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">See Recap</Button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="events-empty-state">
              <FaCalendarAlt />
              <h3>No {activeTab} events found</h3>
              <p>
                {allEvents.length === 0
                  ? "The admin hasn't published any events yet. Check back soon."
                  : "Try adjusting your search or category filter."
                }
              </p>
              {search || category !== "All" ? (
                <button
                  className="clear-filters-btn"
                  onClick={() => { setSearch(""); setCategory("All"); }}
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {selectedEvent && (
        <div className="form-overlay" onClick={closeModal}>
          <div className="form-container" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <header className="form-header">
              <h2>Register for Event</h2>
              <p className="form-subtitle">{selectedEvent.title}</p>
              <button type="button" className="form-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </header>

            {submitted ? (
              <div className="form-success-message">
                <h3><FaCheckCircle /> You're registered!</h3>
                <p>A confirmation has been sent to your email. We look forward to seeing you at {selectedEvent.title}.</p>
              </div>
            ) : (
              <form className="event-registration-form" onSubmit={handleRegister}>
                <div className="form-section">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="reg-name">Full Name</label>
                      <input id="reg-name" type="text" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reg-email">Email Address</label>
                      <input id="reg-email" type="email" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="reg-phone">Phone Number</label>
                      <input id="reg-phone" type="tel" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reg-guests">Number of Guests</label>
                      <select id="reg-guests" defaultValue="1">
                        <option value="1">Just me</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-notes">Notes (optional)</label>
                    <textarea id="reg-notes" placeholder="Accessibility needs, dietary requirements, etc." />
                  </div>
                </div>
                <div className="form-actions">
                  <Button variant="outline" onClick={closeModal}>Cancel</Button>
                  <Button type="submit" variant="primary">Confirm Registration</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Events;