import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({});
  const user = sessionStorage.getItem("id");
  useEffect(() => {
    fetch(`https://web-assessment.apps.ocp.tmrnd.com.my/api/user/${user}`, {
      headers: {
        "Content-Type": "application/json",
        "api-key": "swathivarma.14@gmail.com",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setUserDetails(res);
      });
  }, [user]);
  if (!userDetails) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return children;
};

export default UserProtectedRoute;
