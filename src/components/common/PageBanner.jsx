import "../../styles/page-banner.css";

function PageBanner({
  title,
  subtitle,
  backgroundImage,
}) {
  return (
    <section
      className="page-banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="page-banner-overlay"></div>

      <div className="container page-banner-content">
        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default PageBanner;