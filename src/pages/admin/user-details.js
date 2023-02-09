import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../componnets/loader";
import TxnDetailsPopup from "./txn-details-popup";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [txnDetails, setTxnDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://web-assessment.apps.ocp.tmrnd.com.my/api/users", {
      headers: {
        "Content-Type": "application/json",
        "api-key": "swathivarma.14@gmail.com",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((details) => {
        setUserDetails(details);
      });
  }, [reloadPage]);

  const tableHeader = [
    "Name",
    "ID No",
    "Account Number",
    "Balance",
    "Email",
    "Address",
    "Create Date",
    "Last Update",
  ];

  const editUserDetails = (values) => {
    navigate(`/dashboard/edit-user/${values.id}`, {
      state: { obj: values, type: "edit" },
    });
  };

  const deleteUser = (value) => {
    fetch(`https://web-assessment.apps.ocp.tmrnd.com.my/api/user/${value}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "api-key": "swathivarma.14@gmail.com",
      },
    })
      .then((data) => {
        setReloadPage(!reloadPage);
        return data.json();
      })
      .catch((err) => console.log(err));
  };

  const fetchTxnDetails = (id) => {
    fetch(
      `https://web-assessment.apps.ocp.tmrnd.com.my/api/transactions/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": "swathivarma.14@gmail.com",
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setVisiblePopup(true);
        setTxnDetails(res);
      });
  };

  return (
    <React.Fragment>
      {userDetails.length > 0 ? (
        <>
          <h4 className="text-center">User Details</h4>
          <div className="container-fluid">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  {tableHeader.map((header, index) => {
                    return (
                      <th scope="col" key={index}>
                        {header}
                      </th>
                    );
                  })}
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Txn History</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.map((obj, index) => {
                  return (
                    <tr key={obj.id}>
                      <td>{obj?.name}</td>
                      <td>{obj?.idNo}</td>
                      <td>{obj?.bankAccountNo}</td>
                      <td>{Number(obj?.bankAccountBalance).toFixed(2)}</td>
                      <td>{obj?.email}</td>
                      <td>
                        {obj?.address1}, {obj?.address2}, {obj?.city},{" "}
                        {obj?.postcode}, {obj?.state}, {obj?.country}
                      </td>
                      <td>
                        {new Date(obj?.createDate).toLocaleDateString("en-CA")}
                      </td>
                      <td>
                        {new Date(obj?.lastUpdate).toLocaleDateString("en-CA")}
                      </td>
                      <td className="text-center">
                        <i
                          className="bi bi-pencil-square text-primary"
                          role={"button"}
                          onClick={() => editUserDetails(obj)}
                        ></i>
                      </td>
                      <td className="text-center">
                        <i
                          className="bi bi-trash text-danger"
                          role={"button"}
                          onClick={() => deleteUser(obj.id)}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="bi bi-card-list text-secondary"
                          role={"button"}
                          onClick={() => fetchTxnDetails(obj.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loader />
      )}

      {visiblePopup && (
        <TxnDetailsPopup
          hidePopup={() => setVisiblePopup(false)}
          open={visiblePopup}
          data={txnDetails}
        />
      )}
    </React.Fragment>
  );
};

export default UserDetails;
