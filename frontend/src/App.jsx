import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import "./styles/global.css";
import "./styles/utilities.css";
import "./styles/responsive.css";

import FloatingContact from "./components/common/FloatingContact";
import Inactivitywarning from "./components/common/Inactivitywarning";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleShortcut = (e) => {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "a"
      ) {
        e.preventDefault();
        navigate("/admin-login");
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () =>
      window.removeEventListener(
        "keydown",
        handleShortcut
      );
  }, [navigate]);

  return (
    <>
      <AppRoutes />

      <FloatingContact />
       <Inactivitywarning />
    </>
  );
}

export default App;