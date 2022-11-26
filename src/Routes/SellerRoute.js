import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loader/Loading";
import { UserContext } from "../Context/Auth/AuthContext";
import useRole from "../Hooks/useRole";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  const [userRole, roleLoading] = useRole(user?.email);

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  console.log(userRole);

  if (user && userRole === "seller") {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default SellerRoute;
