import {
  FaStar,
  FaHandsHelping,
  FaCalendarAlt,
  FaLayerGroup,
} from "react-icons/fa";

function SectionHeader({
  tag,
  title,
  light,
  icon,
}) {
  const renderIcon = () => {
    switch (icon) {
      case "values":
        return <FaStar />;

      case "impact":
        return <FaHandsHelping />;

      case "events":
        return <FaCalendarAlt />;

      case "programs":
        return <FaLayerGroup />;

      default:
        return <FaStar />;
    }
  };

  return (
    <div className={`section-header ${light ? "light" : ""}`}>
      <span className="section-tag">
        <span className="tag-icon">
          {renderIcon()}
        </span>

        {tag}
      </span>

      <h2>{title}</h2>
    </div>
  );
}

export default SectionHeader;