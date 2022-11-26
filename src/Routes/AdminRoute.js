import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loader/Loading";
import { UserContext } from "../Context/Auth/AuthContext";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  const [userRole, roleLoading] = useRole(user?.email);

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  console.log(userRole);

  if (user && userRole === "admin") {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default AdminRoute;
