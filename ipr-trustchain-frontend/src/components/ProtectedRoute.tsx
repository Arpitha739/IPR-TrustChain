import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps) => {

  const {
    isAuthenticated,
    user,
  } = useAuth();

  // User is not logged in
  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Check role if allowedRoles is provided
  if (
    allowedRoles &&
    (
      !user ||
      !allowedRoles.includes(user.role)
    )
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;