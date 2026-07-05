import Hero from "../../components/home/Hero";
import AboutSection from "../../components/home/AboutSection";
import ImpactAreas from "../../components/home/ImpactAreas";
import ImpactStats from "../../components/home/ImpactStats";
import Programs from "../../components/home/Programs";
import EventsPreview from "../../components/home/EventsPreview";
import CallToAction from "../../components/home/CallToAction";

// NOTE: Do NOT import the full Scholarship page here.
// It brings its own page-level padding (padding-top: 90px)
// which creates the white gap. Instead, the scholarship
// preview section should be its own home component:
// import ScholarshipPreview from "../../components/home/ScholarshipPreview";

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ImpactAreas />
      <ImpactStats />
      <Programs />
      <EventsPreview />
      <CallToAction />
    </>
  );
}

export default Home;