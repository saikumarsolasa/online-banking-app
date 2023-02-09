import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const CreateTxnPopup = ({ open, hidePopup, values }) => {
  const [txnDetails, setTxnDetails] = useState({});

  const handler = (e) => {
    const { name, value } = e.target;
    setTxnDetails({
      ...txnDetails,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const obj = {
      recipient: values?.bankAccountNo,
    };
    const finalObj = { ...txnDetails, ...obj };
    if (Number(values.bankAccountBalance) >= Number(finalObj.amount)) {
      const res = await fetch(
        "https://web-assessment.apps.ocp.tmrnd.com.my/api/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": "swathivarma.14@gmail.com",
          },
          body: JSON.stringify(finalObj),
        }
      );
      const parseRes = await res.json();
      if (parseRes) {
        hidePopup();
        return window.alert("Transaction Created Successfully");
      }
    } else {
      return window.alert("You do not have sufficient funds to transfer");
    }
  };

  return (
    <>
      <Modal
        show={open}
        onHide={hidePopup}
        backdrop="static"
        keyboard={false}
        size="sm"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Create Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-field">
              <input
                type="text"
                name="recipient"
                placeholder="Recipient Account Number"
                disabled={true}
                className="form-control my-3"
                onChange={(e) => handler(e)}
                value={values?.bankAccountNo}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="sender"
                placeholder="Recipient Account Number"
                className="form-control my-3"
                onChange={(e) => handler(e)}
              />
            </div>
            <div className="input-field">
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="form-control my-3"
                onChange={(e) => handler(e)}
                step=".01"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onSubmitHandler} className="btn btn-primary btn-sm">
            Transfer
          </button>
          <button onClick={hidePopup} className="btn btn-danger btn-sm">
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTxnPopup;
