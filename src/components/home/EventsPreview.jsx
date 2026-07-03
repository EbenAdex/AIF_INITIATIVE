import "../../styles/events-preview.css";
import SectionHeader from "../common/SectionHeader";
function EventsPreview() {
  return (
    <section className="events-preview">
      <div className="container">
        <SectionHeader
  tag="Upcoming Events"
  title="Join Our Outreach & Community Programs"
  light
  icon="events"
/>

        <div className="events-grid">
          <div className="event-card">
            <span>June 2026</span>

            <h3>
              Community Healthcare Outreach
            </h3>

            <p>
              Providing medical support and awareness campaigns
              for underserved communities.
            </p>
          </div>

          <div className="event-card">
            <span>August 2026</span>

            <h3>
              Scholarship Support Conference
            </h3>

            <p>
              Engaging students and mentors through empowerment
              and educational support initiatives.
            </p>
          </div>

          <div className="event-card">
            <span>October 2026</span>

            <h3>
              Youth Empowerment Summit
            </h3>

            <p>
              Inspiring young leaders through mentorship,
              leadership, and development programs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventsPreview;