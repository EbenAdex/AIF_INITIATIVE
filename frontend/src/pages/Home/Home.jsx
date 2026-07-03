
import Hero from "../../components/home/Hero";
import AboutSection from "../../components/home/AboutSection";
import ImpactAreas from "../../components/home/ImpactAreas";
import ImpactStats from "../../components/home/ImpactStats";
import Programs from "../../components/home/Programs";
import EventsPreview from "../../components/home/EventsPreview";
import CallToAction from "../../components/home/CallToAction";
import Scholarship from "../Scholarship/Scholarship";

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Scholarship />
      <ImpactAreas />
      <ImpactStats />
      <Programs />
      <EventsPreview />
      <CallToAction />
    </>
  );
}

export default Home;
 
