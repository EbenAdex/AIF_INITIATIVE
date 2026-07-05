import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Pages that are always public (no auth needed)
const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password", "/admin-login"];

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in — redirect to landing page
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Logged in but trying to access admin-only route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;