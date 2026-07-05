import { useState, useMemo } from "react";

import {
  FaHandHoldingHeart,
  FaUsers,
  FaProjectDiagram,
  FaGlobeAfrica,
  FaCrown,
  FaMedal,
  FaAward,
  FaHeart,
} from "react-icons/fa";

import PageBanner from "../../components/common/PageBanner";
import SectionHeader from "../../components/common/SectionHeader";
import Button from "../../components/common/Button";

// SHARED IMAGE (reused from existing asset library)
import DonorsBanner from "../../assets/images/Calltoaction.jpg";

import "../../styles/donors.css";

/* ------------------------------------------------------------------ *
 * MOCK DATA
 * Structured like API responses so each block can later be replaced
 * with a fetch call without touching the rendering logic.
 * ------------------------------------------------------------------ */

// Headline achievements shown before any donor names (builds credibility).
const IMPACT_METRICS = [
  { id: 1, label: "Total Funds Raised", value: "$2.4M+", icon: "funds" },
  { id: 2, label: "Lives Impacted", value: "18,500+", icon: "lives" },
  { id: 3, label: "Active Projects", value: "32", icon: "projects" },
  { id: 4, label: "Communities Reached", value: "45", icon: "communities" },
];

// Preset donation amounts surfaced as quick-select buttons.
const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

// Donor wall, grouped by hierarchical tiers.
const DONOR_TIERS = [
  {
    id: "platinum",
    name: "Visionaries",
    level: "platinum",
    minLabel: "$10,000+",
    icon: "crown",
    donors: [
      { id: 1, name: "The Adeyemi Family Foundation", anonymous: false },
      { id: 2, name: "Horizon Capital Partners", anonymous: false },
      { id: 3, name: "Anonymous", anonymous: true },
    ],
  },
  {
    id: "gold",
    name: "Champions",
    level: "gold",
    minLabel: "$5,000+",
    icon: "medal",
    donors: [
      { id: 4, name: "Dr. & Mrs. Okonkwo", anonymous: false },
      { id: 5, name: "BrightPath Tech Ltd.", anonymous: false },
      { id: 6, name: "Grace Communities Trust", anonymous: false },
      { id: 7, name: "Anonymous", anonymous: true },
    ],
  },
  {
    id: "silver",
    name: "Supporters",
    level: "silver",
    minLabel: "$500+",
    icon: "award",
    donors: [
      { id: 8, name: "Ibrahim Sanusi", anonymous: false },
      { id: 9, name: "Chioma Eze", anonymous: false },
      { id: 10, name: "Tunde Bakare", anonymous: false },
      { id: 11, name: "Folake Martins", anonymous: false },
      { id: 12, name: "Anonymous", anonymous: true },
      { id: 13, name: "David Owens", anonymous: false },
      { id: 14, name: "Aisha Bello", anonymous: false },
      { id: 15, name: "Anonymous", anonymous: true },
    ],
  },
];

// Maps the data-driven icon key to a concrete react-icons element.
const metricIcon = (key) => {
  switch (key) {
    case "funds":
      return <FaHandHoldingHeart />;
    case "lives":
      return <FaUsers />;
    case "projects":
      return <FaProjectDiagram />;
    case "communities":
      return <FaGlobeAfrica />;
    default:
      return <FaHeart />;
  }
};

const tierIcon = (key) => {
  switch (key) {
    case "crown":
      return <FaCrown />;
    case "medal":
      return <FaMedal />;
    case "award":
      return <FaAward />;
    default:
      return <FaHeart />;
  }
};

function Donors() {
  /* ---------------- LOCALIZED UI STATE ---------------- */
  const [selectedAmount, setSelectedAmount] = useState(100); // preset choice
  const [customAmount, setCustomAmount] = useState(""); // free-entry amount
  const [showAnonymous, setShowAnonymous] = useState(true); // anonymous toggle

  // The active amount prefers a custom entry, else the selected preset.
  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;

  const selectPreset = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // clear custom entry when a preset wins
  };

  /* ----- DERIVED TIERS: optionally strip anonymous donors ----- */
  const visibleTiers = useMemo(() => {
    return DONOR_TIERS.map((tier) => {
      const donors = showAnonymous
        ? tier.donors
        : tier.donors.filter((d) => !d.anonymous);

      // Track how many anonymous donors are hidden for the summary note.
      const hiddenCount = tier.donors.length - donors.length;

      return { ...tier, donors, hiddenCount };
    });
  }, [showAnonymous]);

  return (
    <>
      {/* ============================================================
          HERO / BANNER
         ============================================================ */}
      <PageBanner
        title="Our Donors"
        subtitle="Behind every milestone is a community of generous partners. We honor the people and organizations making lasting impact possible."
        backgroundImage={DonorsBanner}
      />

      {/* ============================================================
          IMPACT METRICS — credibility before names
         ============================================================ */}
      <section className="donor-metrics section">
        <div className="container">
          <SectionHeader
            tag="Collective Impact"
            title="What Your Generosity Has Built"
            icon="impact"
          />

          <div className="metrics-grid">
            {IMPACT_METRICS.map((metric) => (
              <article key={metric.id} className="metric-card">
                <span className="metric-icon">{metricIcon(metric.icon)}</span>
                <h3 className="metric-value">{metric.value}</h3>
                <p className="metric-label">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          DONATION CTA BANNER — preset amounts wired to state
         ============================================================ */}
      <section className="donate-banner">
        <div className="container donate-content">
          <header className="donate-intro">
            <h2>Join Our Circle of Givers</h2>
            <p>
              Every contribution fuels education, healthcare, and community
              development. Choose an amount and become part of the change.
            </p>
          </header>

          <div className="donate-card">
            {/* Preset amount buttons */}
            <div className="amount-options">
              {PRESET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`amount-btn ${
                    !customAmount && selectedAmount === amount ? "active" : ""
                  }`}
                  onClick={() => selectPreset(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom amount entry */}
            <div className="custom-amount">
              <span className="custom-amount-symbol">$</span>
              <input
                type="number"
                min="1"
                placeholder="Other amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                aria-label="Custom donation amount"
              />
            </div>

            <Button variant="secondary" size="lg" className="donate-submit">
              Donate ${activeAmount > 0 ? activeAmount.toLocaleString() : "0"}
            </Button>

            <p className="donate-note">
              <FaHeart aria-hidden="true" /> 100% of your gift goes directly to
              our programs.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          DONOR WALL — tiered, with conditional layout sizing
         ============================================================ */}
      <section className="donor-wall section">
        <div className="container">
          <SectionHeader
            tag="Donor Wall"
            title="Honoring Those Who Give"
            icon="values"
          />

          {/* Anonymous donor toggle */}
          <div className="anonymous-toggle">
            <label htmlFor="toggle-anonymous">
              <input
                id="toggle-anonymous"
                type="checkbox"
                checked={showAnonymous}
                onChange={(e) => setShowAnonymous(e.target.checked)}
              />
              <span>Include anonymous supporters</span>
            </label>
          </div>

          {/* One block per tier; the tier level drives the layout density */}
          {visibleTiers.map((tier) => (
            <div
              key={tier.id}
              className={`tier-block tier-block--${tier.level}`}
            >
              <header className="tier-header">
                <span className="tier-icon">{tierIcon(tier.icon)}</span>
                <div>
                  <h3>{tier.name}</h3>
                  <span className="tier-min">{tier.minLabel}</span>
                </div>
              </header>

              {/* Grid modifier per tier: prominent for top, dense for base */}
              <div className={`donor-grid donor-grid--${tier.level}`}>
                {tier.donors.map((donor) => (
                  <article
                    key={donor.id}
                    className={`donor-card ${
                      donor.anonymous ? "donor-card--anonymous" : ""
                    }`}
                  >
                    <span className="donor-name">
                      {donor.anonymous ? "Anonymous Donor" : donor.name}
                    </span>
                  </article>
                ))}
              </div>

              {/* Note when anonymous donors are hidden by the toggle */}
              {!showAnonymous && tier.hiddenCount > 0 && (
                <p className="tier-hidden-note">
                  + {tier.hiddenCount} anonymous{" "}
                  {tier.hiddenCount === 1 ? "donor" : "donors"} not shown
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Donors;
