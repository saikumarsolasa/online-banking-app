import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { adminForm, updateForm } from "../../componnets/data-type";
import Input from "../../componnets/input";

const CreateUser = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.type === "edit")
      return setUserDetails(location?.state?.obj);
  }, [location]);

  const handler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const accNumber = {
      bankAccountBalance: Number(userDetails?.bankAccountBalance),
    };
    const updatedObj = {
      ...userDetails,
      ...accNumber,
    };

    if (Object.values(updatedObj).every((input, index) => input !== "")) {
      const res = await fetch(
        "https://web-assessment.apps.ocp.tmrnd.com.my/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": "swathivarma.14@gmail.com",
          },
          body: JSON.stringify(updatedObj),
        }
      );
      const parseRes = await res.json();
      if (parseRes) {
        window.alert("User details registered Successfully");
        navigate("/dashboard");
      }
    } else {
      alert("Please fill all input fields");
    }
  };

  const updateFormHandler = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    const res = await fetch(
      `https://web-assessment.apps.ocp.tmrnd.com.my/api/user/${location?.state?.obj?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": "swathivarma.14@gmail.com",
        },
        body: JSON.stringify(userDetails),
      }
    );
    const parseRes = await res.json();
    if (parseRes) {
      navigate("/dashboard/user-details");
      window.alert("User details updated successfully");
    }
  };

  return (
    <>
      <h4 className="text-center">
        {location?.state?.type === "edit" ? "Edit User" : "Create User"}
      </h4>
      <div className="dashboard-wrapper">
        <div className="auth-inner">
          <div>
            <form onSubmit={formSubmitHandler}>
              {location?.state?.type !== "edit"
                ? adminForm.map(
                    ({ type, placeholder, name, ...rest }, index) => {
                      return (
                        <Input
                          type={type}
                          placeholder={placeholder}
                          name={name}
                          key={index}
                          handler={handler}
                          {...rest}
                        />
                      );
                    }
                  )
                : updateForm.map(
                    ({ type, placeholder, name, ...rest }, index) => {
                      return (
                        <Input
                          type={type}
                          placeholder={placeholder}
                          name={name}
                          key={index}
                          handler={handler}
                          values={userDetails}
                          {...rest}
                        />
                      );
                    }
                  )}
              {location?.state?.type === "edit" ? (
                <input
                  type="button"
                  value="Update"
                  className="btn btn-info"
                  onClick={updateFormHandler}
                />
              ) : (
                <input type="submit" className="btn btn-primary" />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
