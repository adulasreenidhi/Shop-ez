import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const userData = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    !userData ||
    userData.user.role !== "ADMIN"
  ) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default AdminRoute;