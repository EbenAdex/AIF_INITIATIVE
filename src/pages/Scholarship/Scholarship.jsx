import { useState } from "react";
import ScholarshipCard from "../../components/scholarship/ScholarshipCard";
import ScholarshipDetails from "../../components/scholarship/ScholarshipDetails";
import ScholarshipApplicationForm from "../../components/scholarship/ScholarshipApplicationForm";
import Button from "../../components/common/Button";
import "../../styles/scholarship.css";

function Scholarship() {
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicatingScholarship, setApplicatingScholarship] = useState(null);

  // Sample scholarship data
  const scholarships = [
    {
      id: 1,
      title: "Full Scholarship",
      amount: "Up to 100% tuition coverage",
      description:
        "A comprehensive scholarship covering tuition, fees, and academic support for eligible students.",
      eligibility:
        "High-achieving applicants with strong academic credentials and financial need.",
      deadline: "September 30, 2024",
      category: "Full",
      fullDescription:
        "This full scholarship is awarded to outstanding students who demonstrate academic excellence, leadership, and financial need. It covers tuition, course fees, and targeted support resources through the academic year.",
      requirements: [
        "Strong academic performance",
        "Demonstrated financial need",
        "A personal statement detailing goals",
        "One academic reference letter",
      ],
      applicationSteps: [
        "Complete the full scholarship application form",
        "Upload transcripts and supporting documents",
        "Submit a personal statement",
        "Provide at least one reference letter",
      ],
      decisionDate: "October 31, 2024",
      notificationDate: "November 15, 2024",
    },
    {
      id: 2,
      title: "Partial Scholarship",
      amount: "Up to 50% tuition support",
      description:
        "A flexible scholarship offering partial funding and educational resources for eligible applicants.",
      eligibility:
        "Motivated students with demonstrated achievement and a clear academic plan.",
      deadline: "October 15, 2024",
      category: "Partial",
      fullDescription:
        "This partial scholarship provides significant tuition support to students with proven academic potential. It is designed to help scholars cover a portion of their expenses while continuing to develop their academic and leadership skills.",
      requirements: [
        "Consistent academic performance",
        "A strong personal statement",
        "Enrollment in a qualifying program",
      ],
      applicationSteps: [
        "Fill out the partial scholarship application",
        "Submit academic transcripts",
        "Provide a statement of purpose",
      ],
      decisionDate: "November 20, 2024",
      notificationDate: "December 5, 2024",
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
      {/* Hero Section */}
      <section className="scholarship-hero" aria-labelledby="scholarship-hero-title">
        <div className="container">
          <h1 id="scholarship-hero-title">Scholarships & Financial Aid</h1>
          <p>
            Explore our comprehensive scholarship programs designed to support
            your educational journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="scholarship-section" aria-label="Scholarship listings and filter options">
        <div className="container scholarship-container">
          {/* Sidebar - Filters */}
          <aside className="scholarship-sidebar" aria-labelledby="scholarship-filter-heading">
            <div className="filter-group">
              <h3 id="scholarship-filter-heading">Filter by Category</h3>
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

            <div className="sidebar-card">
              <h3>Need Help?</h3>
              <p>
                Contact our scholarship advisor for personalized guidance on
                available opportunities.
              </p>
              <Button variant="secondary" size="md">
                Contact Us
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
                  <h2>Available Scholarships</h2>
                  <p>
                    {filteredScholarships.length} scholarship
                    {filteredScholarships.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <div className="scholarships-grid">
                  {filteredScholarships.map((scholarship) => (
                    <div
                      key={scholarship.id}
                      className="scholarship-card-wrapper"
                    >
                      <ScholarshipCard
                        {...scholarship}
                        onApply={() => handleApply(scholarship)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="scholarship-cta">
        <div className="container">
          <h2>Start Your Application Today</h2>
          <p>
            Take the first step towards achieving your educational goals with
            our scholarship programs.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => handleApply(null)}
          >
            Begin Application
          </Button>
        </div>
      </section>

      {/* Scholarship Application Form Modal */}
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
