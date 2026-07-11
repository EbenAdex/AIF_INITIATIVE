import "../../styles/impact-stats.css";
import CountUpStats from "../common/CountUpStats";
function ImpactStats() {
  return (
    <section className="impact-stats">
      <div className="container stats-container">
        <div className="stats-card">
          <h2>
            <CountUpStats end={1000} suffix="+" />
          </h2>
          <p>Lives Reached</p>
        </div>

        <div className="stats-card">
          <h2>
            <CountUpStats end={20} suffix="+" />
          </h2>
          <p>Communities Impacted</p>
        </div>

        <div className="stats-card">
          <h2>
            <CountUpStats end={50} suffix="+" />
          </h2>
          <p>Volunteers</p>
        </div>

        <div className="stats-card">
          <h2>
            <CountUpStats end={15} suffix="+" />
          </h2>
          <p>Programs & Initiatives</p>
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;