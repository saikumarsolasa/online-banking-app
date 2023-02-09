import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const DashBoard = () => {
  const loginUser = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const clearSession = async () => {
    const obj = {
      loginId: "admin",
    };
    const res = await fetch(
      "https://web-assessment.apps.ocp.tmrnd.com.my/api/auth/logoutAdmin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "swathivarma.14@gmail.com",
        },
        body: JSON.stringify(obj),
      }
    );
    const parseRes = await res;
    if (parseRes) {
      sessionStorage.clear();
      navigate("../", { replace: true });
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "10px 10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h6>Login User: {loginUser}</h6>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          onClick={clearSession}
        >
          Logout
        </button>
      </div>
      <div className="d-flex justify-content-center my-3">
        <button type="button" className="btn btn-primary btn-sm me-2">
          <Link to={"create-user"}>Create User</Link>
        </button>
        <button type="button" className="btn btn-success btn-sm me-2">
          <Link to={"user-details"}>User Details</Link>
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default DashBoard;
