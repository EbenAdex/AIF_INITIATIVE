import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  adminOnly = false,
}) {

  const user =
    JSON.parse(
      localStorage.getItem("aif_user")
    );

  if (!user) {

    return (
      <Navigate to="/login" />
    );

  }

  if (
    adminOnly &&
    user.role !== "admin"
  ) {

    return (
      <Navigate to="/admin-login" />
    );

  }

  return children;
}

export default ProtectedRoute;