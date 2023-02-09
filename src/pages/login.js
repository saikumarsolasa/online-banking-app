import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({
    loginId: "",
    password: "",
  });
  const { loginId, password } = formValues;
  const history = useNavigate();
  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitvalues = async (e) => {
    e.preventDefault();
    try {
      const body = { loginId, password };
      const url =
        loginId === "admin" && password === "password"
          ? "https://web-assessment.apps.ocp.tmrnd.com.my/api/auth/loginAdmin"
          : "https://web-assessment.apps.ocp.tmrnd.com.my/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "swathivarma.14@gmail.com",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();
      if (parseRes) {
        if (parseRes?.loginId === "admin") {
          sessionStorage.setItem("loginId", parseRes?.loginId);
          sessionStorage.setItem("name", parseRes?.name);
          history("/dashboard/user-details");
        } else {
          sessionStorage.setItem("id", parseRes?.id);
          sessionStorage.setItem("name", parseRes?.name);
          history("/user", { state: parseRes });
        }
      } else {
        return window.alert("Enter valid credentials");
      }
    } catch (err) {
      window.alert("Enter valid Login Id or Password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h1 className="text-center">Login</h1>
        <form onSubmit={onSubmitvalues}>
          <div className="form-group">
            <input
              type="text"
              name="loginId"
              placeholder="Login Id"
              className="form-control my-3"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="wrapper">
            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control my-3"
                value={formValues.password}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <button className="btn btn-success btn-block">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
