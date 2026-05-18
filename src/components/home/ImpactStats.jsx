import "../../styles/impact-stats.css";

function ImpactStats() {
  return (
    <section className="impact-stats">
      <div className="container stats-container">
        <div className="stats-card">
          <h2>1000+</h2>
          <p>Lives Reached</p>
        </div>

        <div className="stats-card">
          <h2>20+</h2>
          <p>Communities Impacted</p>
        </div>

        <div className="stats-card">
          <h2>50+</h2>
          <p>Volunteers</p>
        </div>

        <div className="stats-card">
          <h2>15+</h2>
          <p>Programs & Initiatives</p>
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;