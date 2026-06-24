import { useState, useEffect, useMemo } from "react";

import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaVideo,
  FaTimes,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

import PageBanner from "../../components/common/PageBanner";
import SectionHeader from "../../components/common/SectionHeader";
import Button from "../../components/common/Button";

// SHARED IMAGES (reused from existing asset library)
import EventsBanner from "../../assets/images/Hero-image.jpg";
import HealthcareImg from "../../assets/images/Healthcare2.jpg";
import EducationImg from "../../assets/images/Education2.jpg";
import CommunityImg from "../../assets/images/Community2.jpg";
import EmpowermentImg from "../../assets/images/empowerment.jpg";

import "../../styles/events.css";
import "../../styles/forms.css"; // reused modal + form-group styles

/* ------------------------------------------------------------------ *
 * MOCK DATA
 * Shaped exactly like an API response so the array can later be
 * swapped for `useEffect(() => { fetch(...) }, [])` with no UI change.
 * ------------------------------------------------------------------ */
const EVENTS = [
  {
    id: 1,
    title: "Community Healthcare Outreach",
    description:
      "Free medical screenings, awareness campaigns, and essential care for underserved communities.",
    category: "Community Outreach",
    status: "upcoming",
    date: "2026-07-18",
    time: "9:00 AM",
    location: "Lagos Mainland Community Hall",
    isVirtual: false,
    image: HealthcareImg,
    capacity: 300,
    registered: 184,
  },
  {
    id: 2,
    title: "Annual Scholarship Fundraiser Gala",
    description:
      "An evening of impact celebrating donors and raising funds for the next cohort of scholars.",
    category: "Fundraisers",
    status: "upcoming",
    date: "2026-08-09",
    time: "6:00 PM",
    location: "Eko Convention Centre",
    isVirtual: false,
    image: EducationImg,
    capacity: 500,
    registered: 421,
  },
  {
    id: 3,
    title: "Youth Empowerment & Leadership Seminar",
    description:
      "A virtual seminar connecting young leaders with mentors across leadership and career development.",
    category: "Seminars",
    status: "upcoming",
    date: "2026-09-02",
    time: "2:00 PM",
    location: "Virtual",
    isVirtual: true,
    image: EmpowermentImg,
    capacity: 1000,
    registered: 612,
  },
  {
    id: 4,
    title: "Back-to-School Supplies Drive",
    description:
      "Volunteers distributed learning kits to over 800 students ahead of the new academic session.",
    category: "Community Outreach",
    status: "past",
    date: "2026-01-15",
    time: "10:00 AM",
    location: "Ikeja Civic Centre",
    isVirtual: false,
    image: CommunityImg,
    capacity: 400,
    registered: 400,
  },
  {
    id: 5,
    title: "Donor Appreciation Fundraiser Dinner",
    description:
      "A recap of our most successful fundraising night, surpassing the annual target by 30%.",
    category: "Fundraisers",
    status: "past",
    date: "2025-12-05",
    time: "7:00 PM",
    location: "Victoria Island Banquet Hall",
    isVirtual: false,
    image: EducationImg,
    capacity: 350,
    registered: 350,
  },
  {
    id: 6,
    title: "Digital Skills for Educators Webinar",
    description:
      "A recorded seminar equipping rural teachers with practical digital classroom tools.",
    category: "Seminars",
    status: "past",
    date: "2025-11-20",
    time: "3:00 PM",
    location: "Virtual",
    isVirtual: true,
    image: EmpowermentImg,
    capacity: 800,
    registered: 745,
  },
];

// Category options driven from the data shape, with an "All" default.
const CATEGORIES = ["All", "Fundraisers", "Community Outreach", "Seminars"];

// Small presentational helper — formats an ISO date into a readable badge.
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function Events() {
  /* ---------------- LOCALIZED UI STATE ---------------- */
  const [activeTab, setActiveTab] = useState("upcoming"); // upcoming | past
  const [category, setCategory] = useState("All"); // dropdown filter
  const [search, setSearch] = useState(""); // search bar input
  const [selectedEvent, setSelectedEvent] = useState(null); // modal target
  const [submitted, setSubmitted] = useState(false); // registration success flag

  /* ----- DERIVED LIST: tab + category + search combined ----- */
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return EVENTS.filter((event) => {
      const matchesTab = event.status === activeTab;
      const matchesCategory =
        category === "All" || event.category === category;
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      return matchesTab && matchesCategory && matchesSearch;
    });
  }, [activeTab, category, search]);

  /* ----- SIDE EFFECT: lock background scroll while the modal is open ----- */
  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  // Opening a fresh modal always starts from the form (not the success view).
  const openModal = (event) => {
    setSubmitted(false);
    setSelectedEvent(event);
  };

  const closeModal = () => setSelectedEvent(null);

  const handleRegister = (e) => {
    e.preventDefault();
    // Stub: a real submit would POST the form here before confirming.
    setSubmitted(true);
  };

  return (
    <>
      {/* ============================================================
          HERO / HEADER — title, description, and active search bar
         ============================================================ */}
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

          {/* ---------- SEARCH BAR ---------- */}
          <div className="events-search">
            <FaSearch className="events-search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search events by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search events"
            />
          </div>

          {/* ============================================================
              FILTER / TAB CONTROLS — status tabs + category dropdown
             ============================================================ */}
          <div className="events-controls">
            {/* Upcoming / Past toggle */}
            <div className="events-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === "upcoming"}
                className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Events
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "past"}
                className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
                onClick={() => setActiveTab("past")}
              >
                Past Events
              </button>
            </div>

            {/* Category dropdown filter */}
            <div className="events-filter">
              <label htmlFor="event-category">Category</label>
              <select
                id="event-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ============================================================
              EVENTS GRID — semantic cards (one <article> per event)
             ============================================================ */}
          {filteredEvents.length > 0 ? (
            <div className="events-list-grid">
              {filteredEvents.map((event) => (
                <article key={event.id} className="event-item">
                  {/* MEDIA + floating date badge */}
                  <header className="event-media">
                    <img src={event.image} alt={event.title} />
                    <span className="event-date-badge">
                      <FaCalendarAlt aria-hidden="true" />
                      {formatDate(event.date)}
                    </span>
                    <span className="event-category-pill">
                      {event.category}
                    </span>
                  </header>

                  {/* BODY */}
                  <div className="event-body">
                    {/* META: time + location/virtual */}
                    <div className="event-meta">
                      <span>
                        <FaClock aria-hidden="true" /> {event.time}
                      </span>
                      <span>
                        {event.isVirtual ? (
                          <>
                            <FaVideo aria-hidden="true" /> Virtual
                          </>
                        ) : (
                          <>
                            <FaMapMarkerAlt aria-hidden="true" />{" "}
                            {event.location}
                          </>
                        )}
                      </span>
                    </div>

                    <h3>{event.title}</h3>
                    <p>{event.description}</p>

                    {/* FOOTER: capacity + contextual action button */}
                    <div className="event-footer">
                      <span className="event-capacity">
                        <FaUsers aria-hidden="true" />
                        {event.registered}/{event.capacity}
                      </span>

                      {event.status === "upcoming" ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => openModal(event)}
                        >
                          Register Now
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          See Recap
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            // EMPTY STATE — shown when filters exclude every event
            <p className="events-empty">
              No {activeTab} events match your filters. Try adjusting your
              search or category.
            </p>
          )}
        </div>
      </section>

      {/* ============================================================
          REGISTRATION MODAL — opened by "Register Now"
          Reuses the shared forms.css overlay/field styling.
         ============================================================ */}
      {selectedEvent && (
        <div className="form-overlay" onClick={closeModal}>
          <div
            className="form-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Register for ${selectedEvent.title}`}
          >
            <header className="form-header">
              <h2>Register for Event</h2>
              <p className="form-subtitle">{selectedEvent.title}</p>
              <button
                type="button"
                className="form-close-btn"
                onClick={closeModal}
                aria-label="Close registration form"
              >
                <FaTimes />
              </button>
            </header>

            {submitted ? (
              <div className="form-success-message">
                <h3>
                  <FaCheckCircle aria-hidden="true" /> You're registered!
                </h3>
                <p>
                  A confirmation has been sent to your email. We look forward
                  to seeing you at {selectedEvent.title}.
                </p>
              </div>
            ) : (
              <form
                className="event-registration-form"
                onSubmit={handleRegister}
              >
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
                    <textarea
                      id="reg-notes"
                      placeholder="Accessibility needs, dietary requirements, etc."
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Confirm Registration
                  </Button>
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
