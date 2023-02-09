import React from "react";
import Modal from "react-bootstrap/Modal";

const TxnDetailsPopup = ({ hidePopup, data, open }) => {
  const headerColumnns = ["ID", "Recipient", "Sender", "Amount", "Date"];
  return (
    <>
      <Modal
        show={open}
        onHide={hidePopup}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered={true}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Transaction Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                {headerColumnns.map((header, index) => {
                  return <th scope="col">{header}</th>;
                })}
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px" }}>
              {data.map((obj, index) => {
                return (
                  <tr>
                    <td>{obj?.id}</td>
                    <td>{obj?.recipient}</td>
                    <td>{obj?.sender}</td>
                    <td>{Number(obj?.value).toFixed(2)}</td>
                    <td>
                      {new Date(obj?.datetime).toLocaleDateString("en-CA")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TxnDetailsPopup;
