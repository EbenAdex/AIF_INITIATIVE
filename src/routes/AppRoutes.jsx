import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Scholarship from "../pages/Scholarship/Scholarship";
import Donors from "../pages/Donors/Donors";
import Events from "../pages/Events/Events";
import Contact from "../pages/Contact/Contact";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;