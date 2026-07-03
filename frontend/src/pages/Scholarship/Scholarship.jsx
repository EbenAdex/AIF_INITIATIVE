
import { useState } from "react";
import { FiFilter, FiDownload, FiCheckCircle } from "react-icons/fi";
import ScholarshipCard from "../../components/scholarship/ScholarshipCard";
import ScholarshipDetails from "../../components/scholarship/ScholarshipDetails";
import ScholarshipApplicationForm from "../../components/scholarship/ScholarshipApplicationForm";
import Button from "../../components/common/Button";
import "../../styles/scholarship.css";
import CountUpStats from "../../components/common/CountUpStats";

function Scholarship() {
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicatingScholarship, setApplicatingScholarship] = useState(null);

  // Sample scholarship data
  const scholarships = [
    {
      id: 1,
      title: "Full Scholarship Award",
      amount: "100% Tuition Coverage",
      description:
        "Comprehensive scholarship for exceptional students covering tuition, fees, and living stipend.",
      eligibility:
        "High-achieving applicants with excellent academic record, leadership qualities, and financial need.",
      deadline: "September 30, 2024",
      category: "Full",
      fullDescription:
        "This full scholarship is awarded to outstanding students who demonstrate academic excellence, leadership, and financial need. It covers tuition, course fees, living allowance, and targeted support resources throughout the academic year.",
      requirements: [
        "Minimum 3.5 GPA or equivalent",
        "Demonstrated financial need",
        "A compelling personal statement",
        "Two academic reference letters",
        "Community service record",
      ],
      applicationSteps: [
        "Complete the scholarship application form",
        "Upload official transcripts and certificates",
        "Submit a 500-word personal statement",
        "Provide reference letters from teachers/mentors",
        "Attend the interview (if shortlisted)",
      ],
      decisionDate: "October 31, 2024",
      notificationDate: "November 15, 2024",
    },
    {
      id: 2,
      title: "Merit-Based Scholarship",
      amount: "50% Tuition Support",
      description:
        "Competitive scholarship for students with strong academics and leadership potential.",
      eligibility:
        "Students with excellent academic record and demonstrated leadership in school/community.",
      deadline: "October 15, 2024",
      category: "Partial",
      fullDescription:
        "This merit-based scholarship recognizes and rewards students with proven academic excellence and leadership capabilities. Recipients gain access to mentorship programs and networking opportunities.",
      requirements: [
        "Minimum 3.2 GPA",
        "Active participation in leadership roles",
        "Strong academic performance",
        "Personal statement highlighting achievements",
      ],
      applicationSteps: [
        "Fill out the merit-based scholarship application",
        "Submit academic transcripts",
        "Provide a statement of purpose and achievements",
        "Include evidence of leadership activities",
      ],
      decisionDate: "November 20, 2024",
      notificationDate: "December 5, 2024",
    },
    {
      id: 3,
      title: "Healthcare Professional Scholarship",
      amount: "75% Coverage + Internship",
      description:
        "Specialized scholarship for students pursuing careers in healthcare and medicine.",
      eligibility:
        "Students enrolled in healthcare, nursing, or medical science programs with financial need.",
      deadline: "November 1, 2024",
      category: "Full",
      fullDescription:
        "This scholarship supports the next generation of healthcare professionals. Recipients receive tuition support, paid internship opportunities, and mentorship from industry professionals.",
      requirements: [
        "Enrollment in approved healthcare program",
        "Minimum 3.0 GPA",
        "Personal statement on healthcare career goals",
        "One healthcare professional reference",
      ],
      applicationSteps: [
        "Complete healthcare scholarship application",
        "Submit program enrollment confirmation",
        "Write essay on healthcare aspirations",
        "Provide professional reference",
      ],
      decisionDate: "December 15, 2024",
      notificationDate: "January 10, 2025",
    },
  ];

  const categories = ["All", "Full", "Partial"];

  const filteredScholarships =
    filterCategory === "All"
      ? scholarships
      : scholarships.filter((s) => s.category === filterCategory);

  const handleApply = (scholarship) => {
    setApplicatingScholarship(scholarship);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setApplicatingScholarship(null);
  };

  return (
    <main className="scholarship-page">
      {/* Enhanced Hero Section */}
      <section className="scholarship-hero" aria-labelledby="scholarship-hero-title">
        <div className="scholarship-hero-content">
          <div className="hero-overlay"></div>
          <div className="container scholarship-hero-inner">
            <h1 id="scholarship-hero-title">Transform Your Future With Scholarships</h1>
            <p>
              Unlock educational opportunities designed for ambitious students. 
              Our comprehensive scholarship programs provide financial support, mentorship, and career development.
            </p>
            
            <div className="hero-stats">
              <div className="stat">
               <h3>
  <CountUpStats end={2000000} suffix="+" />
</h3>
                <p>Awarded Annually</p>
              </div>
              <div className="stat">
                <h3>
                  <CountUpStats end={scholarships.length} suffix="+" />
                </h3>
                <p>Active Programs</p>
              </div>
              <div className="stat">
                <h3>
                  <CountUpStats end={500} suffix="+" />
                </h3>
                <p>Recipients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="scholarship-section" aria-label="Scholarship listings and filter options">
        <div className="container scholarship-container">
          {/* Sidebar - Filters */}
          <aside className="scholarship-sidebar" aria-labelledby="scholarship-filter-heading">
            <div className="filter-group">
              <div className="filter-header">
                <FiFilter size={18} />
                <h3 id="scholarship-filter-heading">Filter</h3>
              </div>
              <div className="filter-buttons">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${
                      filterCategory === category ? "active" : ""
                    }`}
                    onClick={() => setFilterCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-card info-card">
              <FiCheckCircle size={24} className="info-icon" />
              <h3>Application Tips</h3>
              <ul className="tips-list">
                <li>Start your application early</li>
                <li>Be genuine in your personal statement</li>
                <li>Meet all submission deadlines</li>
                <li>Double-check your application</li>
                <li>Ask strong references for letters</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Need Assistance?</h3>
              <p>
                Our scholarship advisors are here to help. Get personalized guidance on opportunities matching your profile.
              </p>
              <Button variant="secondary" size="md">
                Book a Session
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="scholarship-main">
            {selectedScholarship ? (
              <>
                <button
                  className="back-btn"
                  onClick={() => setSelectedScholarship(null)}
                >
                  ← Back to All Scholarships
                </button>
                <ScholarshipDetails scholarship={selectedScholarship} />
                <div className="details-action">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleApply(selectedScholarship)}
                  >
                    Apply for This Scholarship
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="scholarships-header">
                  <div>
                    <h2>Available Opportunities</h2>
                    <p className="results-count">
                      Showing {filteredScholarships.length} of {scholarships.length} scholarships
                    </p>
                  </div>
                  <button className="download-btn">
                    <FiDownload /> Download Brochure
                  </button>
                </div>

                {filteredScholarships.length > 0 ? (
                  <div className="scholarships-grid">
                    {filteredScholarships.map((scholarship) => (
                      <div
                        key={scholarship.id}
                        className="scholarship-card-wrapper"
                      >
                        <ScholarshipCard
                          {...scholarship}
                          onApply={() => handleApply(scholarship)}
                          onClick={() => setSelectedScholarship(scholarship)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <p>No scholarships match your filters. Try adjusting your selection.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="scholarship-cta">
        <div className="container cta-content">
          <div className="cta-text">
            <h2>Ready to Take the Next Step?</h2>
            <p>
              Don't miss out on an opportunity to advance your education. 
              Apply for a scholarship today and invest in your future.
            </p>
          </div>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => handleApply(scholarships[0])}
          >
            Start Your Application
          </Button>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <ScholarshipApplicationForm
          scholarship={applicatingScholarship}
          onClose={handleCloseForm}
        />
      )}
    </main>
  );
}

export default Scholarship;
 
