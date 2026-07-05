import {
  FaGraduationCap,
  FaHeartbeat,
  FaHandsHelping,
  FaUsers,
  FaHandHoldingHeart,
} from "react-icons/fa";

import "../../styles/impact-areas.css";
import SectionHeader from "../common/SectionHeader";
function ImpactAreas() {
  const impactData = [
    {
      icon: <FaGraduationCap />,
      title: "Education Support",
      text: "Providing scholarship opportunities and educational assistance."
    },

    {
      icon: <FaHeartbeat />,
      title: "Healthcare Outreach",
      text: "Supporting healthcare initiatives and medical assistance programs."
    },

    {
      icon: <FaHandsHelping />,
      title: "Humanitarian Relief",
      text: "Delivering support and relief to vulnerable communities."
    },

    {
      icon: <FaUsers />,
      title: "Community Development",
      text: "Empowering communities through impactful development initiatives."
    },

    {
      icon: <FaHandHoldingHeart />,
      title: "Youth Empowerment",
      text: "Creating opportunities that help young people thrive and lead."
    },
  ];

  return (
    <section className="impact-areas">
      <div className="container">
        <SectionHeader
  tag="Our Impact Areas"
  title="Creating Lasting Impact Across Communities"
  icon="impact"
/>

        <div className="impact-grid">
          {impactData.map((item, index) => (
            <div className="impact-card" key={index}>
              <div className="impact-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactAreas;