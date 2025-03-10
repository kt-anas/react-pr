import React from "react";
import TableIn from "./InstallmentTable";
import useInstallments from "./useInstallments";
import useInstallmentActions from "./useInstallmentActions";
import { Toast, ToastContainer } from "react-bootstrap";

const InstallmentPage = () => {
  const { total,handleTotalChange, count,handleCountChange, installments, setInstallments } =
    useInstallments("", "");

  const { handleSplit, handleMerge, showToast, toastMessage, setShowToast } =
    useInstallmentActions(installments, setInstallments);

  return (
    <div>
      <form>
        <label>Amount</label>
        <input
          type="number"
          name="total"
          onChange={(e) => handleTotalChange(e.target.value)}
          value={total}
        />

        <label>Count</label>
        <input
          type="number"
          name="count"
          onChange={(e) =>  handleCountChange(e.target.value)}
          value={count}
        />
      </form>
      <TableIn installments={installments} setInstallments={setInstallments} />
      <button onClick={handleMerge}>Merge</button>
      <button onClick={handleSplit}>Split</button>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="warning"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default InstallmentPage;
