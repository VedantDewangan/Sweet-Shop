import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "./Loading";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
