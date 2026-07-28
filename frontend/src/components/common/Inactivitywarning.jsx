import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/inactivity.css";

const TIMEOUT_MS = 30 * 60 * 1000; // 30 min
const WARNING_MS = 29 * 60 * 1000; // warn at 29 min — 1 min to act

export default function InactivityWarning() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown]     = useState(60);
  const timerRef      = useRef(null);
  const warningRef    = useRef(null);
  const countdownRef  = useRef(null);

  const clearAll = useCallback(() => {
    clearTimeout(timerRef.current);
    clearTimeout(warningRef.current);
    clearInterval(countdownRef.current);
  }, []);

  const doLogout = useCallback(() => {
    clearAll();
    setShowWarning(false);
    logout();
    localStorage.removeItem("aif_user");
    navigate(user?.role === "admin" ? "/admin-login" : "/login", {
      state: { sessionExpired: true },
    });
  }, [clearAll, logout, navigate, user]);

  const resetTimers = useCallback(() => {
    if (!user) return;
    clearAll();
    setShowWarning(false);

    // Show warning at 29 min
    warningRef.current = setTimeout(() => {
      setShowWarning(true);
      setCountdown(60);
      // Countdown every second
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, WARNING_MS);

    // Hard logout at 30 min
    timerRef.current = setTimeout(doLogout, TIMEOUT_MS);
  }, [user, clearAll, doLogout]);

  const stayLoggedIn = () => {
    resetTimers();
  };

  useEffect(() => {
    if (!user) { clearAll(); return; }

    const EVENTS = ["mousemove","mousedown","keydown","touchstart","scroll","click","wheel"];
    const onActivity = () => { if (!showWarning) resetTimers(); };

    EVENTS.forEach(e => window.addEventListener(e, onActivity, { passive: true }));
    resetTimers();

    return () => {
      EVENTS.forEach(e => window.removeEventListener(e, onActivity));
      clearAll();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || !showWarning) return null;

  return (
    <div className="inactivity-overlay">
      <div className="inactivity-modal">
        <div className="inactivity-icon">⏱</div>
        <h3>Still there?</h3>
        <p>
          You've been inactive for a while. For your security,
          you'll be logged out in <strong>{countdown} second{countdown !== 1 ? "s" : ""}</strong>.
        </p>
        <div className="inactivity-bar">
          <div
            className="inactivity-bar-fill"
            style={{ width: `${(countdown / 60) * 100}%` }}
          />
        </div>
        <div className="inactivity-actions">
          <button className="inactivity-logout-btn" onClick={doLogout}>
            Log Out Now
          </button>
          <button className="inactivity-stay-btn" onClick={stayLoggedIn}>
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
}