import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  //  Wait for /api/me to resolve
  if (loading) {
    return <div>Loading...</div>;
  }

  //  Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  Authenticated
  return <Outlet />;
}
