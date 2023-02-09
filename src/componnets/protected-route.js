import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = sessionStorage.getItem("loginId");
  if (!user) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
