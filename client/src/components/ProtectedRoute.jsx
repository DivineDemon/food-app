import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.user);
  const { isExpired } = useJwt(token);

  if (Object.keys(user).length === 0 || isExpired) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
