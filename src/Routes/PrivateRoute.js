import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loader/Loading";
import { UserContext } from "../Context/Auth/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.uid) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default PrivateRoute;
