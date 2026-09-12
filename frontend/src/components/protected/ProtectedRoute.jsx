import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still restoring session — don't redirect yet
  if (loading) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Admin-only route — check both "admin" (local) and "ADMIN"/"SUPER_ADMIN" (backend)
  if (adminOnly) {
    const role = user.role?.toLowerCase();
    const isAdmin = role === "admin" || role === "super_admin";
    if (!isAdmin) return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;