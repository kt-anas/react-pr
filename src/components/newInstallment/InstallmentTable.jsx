import React from "react";
import { Table } from "react-bootstrap";
import useInstallmentActions from "./useInstallmentActions";

const TableIn = ({ installments, setInstallments }) => {
  const { handleUndo, onCheckboxChange, onDateChange, handleAutoFill } =
    useInstallmentActions(installments, setInstallments);

  console.log(installments);

  return (
    <div>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Installment No</th>
            <th>Amount</th>
            <th>
              Due Date{" "}
              <span onClick={handleAutoFill} style={{ cursor: "pointer" }}>
                ⬇️
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {installments.length > 0 ? (
            installments
              .filter((inst) => inst.show)
              .map((installment) => (
                <tr key={installment.insNumber}>
                  <td>
                    <input
                      type="checkbox"
                      checked={installment.checked}
                      onChange={() => onCheckboxChange(installment.insNumber)}
                      disabled={
                        installment.isSplited ||
                        installment.isMerged ||
                        installment.dueDate === ""
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        installment.dueDate === "" &&
                          alert("Please select a date for this installment.");
                      }}
                    />
                    {installment.isSplited && (
                      <span>
                        s{" "}
                        <span
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleUndo(installment)}
                        >
                          🔄
                        </span>
                      </span>
                    )}

                    {installment.isMerged && (
                      <span>
                        m{" "}
                        <span
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleUndo(installment)}
                        >
                          🔄
                        </span>
                      </span>
                    )}
                  </td>
                  <td>{installment.insNumber}</td>
                  <td>{installment.amount}</td>
                  <td>
                    <input
                      type="date"
                      value={installment.dueDate}
                      onChange={(e) =>
                        onDateChange(installment.insNumber, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Installments Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableIn;
