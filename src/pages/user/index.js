import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../componnets/loader";
import TxnDetailsPopup from "../admin/txn-details-popup";
import CreateTxnPopup from "./create-txn-popup";

const UserDashBoard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [txnDetails, setTxnDetails] = useState([]);

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

  const clearSession = async () => {
    const obj = {
      loginId: state?.name,
    };
    const res = await fetch(
      "https://web-assessment.apps.ocp.tmrnd.com.my/api/auth/logout",
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
        <h6>Login User: {state?.name}</h6>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          onClick={clearSession}
        >
          Logout
        </button>
      </div>
      {state ? (
        <>
          <div className="container-fluid">
            <table className="table table-striped table-hover table-bordered mt-5">
              <thead>
                <tr>
                  {tableHeader.map((header, index) => {
                    return (
                      <th scope="col" key={index}>
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr key={state.id}>
                  <td>{state?.name}</td>
                  <td>{state?.idNo}</td>
                  <td>{state?.bankAccountNo}</td>
                  <td>{Number(state?.bankAccountBalance).toFixed(2)}</td>
                  <td>{state?.email}</td>
                  <td>
                    {state?.address1}, {state?.address2}, {state?.city},{" "}
                    {state?.postcode}, {state?.state}, {state?.country}
                  </td>
                  <td>
                    {new Date(state?.createDate).toLocaleDateString("en-CA")}{" "}
                    {new Date(state?.createDate).getHours()}:
                    {new Date(state?.createDate).getMinutes()}:
                    {new Date(state?.createDate).getSeconds()}
                  </td>
                  <td>
                    {new Date(state?.lastUpdate).toLocaleDateString("en-CA")}{" "}
                    {new Date(state?.lastUpdate).getHours()}:
                    {new Date(state?.lastUpdate).getMinutes()}:
                    {new Date(state?.lastUpdate).getSeconds()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-center">
            <button
              className="btn btn-primary"
              onClick={() => setShowPopup(true)}
            >
              Transfer
            </button>
            <button
              className="btn btn-info ms-2"
              onClick={() => fetchTxnDetails(state.id)}
            >
              Transaction History
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
      {showPopup && (
        <CreateTxnPopup
          open={showPopup}
          hidePopup={() => setShowPopup(false)}
          values={state}
        />
      )}
      {visiblePopup && (
        <TxnDetailsPopup
          hidePopup={() => setVisiblePopup(false)}
          open={visiblePopup}
          data={txnDetails}
        />
      )}
    </>
  );
};

export default UserDashBoard;
