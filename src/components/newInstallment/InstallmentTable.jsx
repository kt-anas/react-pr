import React from "react";
import { Table } from "react-bootstrap";

const TableIn = ({ installments }) => {
  console.log('Installments:', installments);
  const onDateChange = (insNumber, value) => {
    const updatedInstallments = [...installments];
    updatedInstallments[insNumber - 1].dueDate = value;
    console.log('Updated Installments:', updatedInstallments);
    
  }
  return (
    <div>
      <Table key={installments} bordered striped hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Installment No</th>
            <th>Amount</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {installments.length > 0 ? (
            installments.map((installment) => (
              <tr key={installment.insNumber}>
                <td>
                  <input type="checkbox"  value={installment.insNumber}/>
                </td>
                <td>{installment.insNumber}</td>
                <td>{installment.amount}</td>
                <td>
                  {" "}
                  <input
                    type="date"
                    value={installment.dueDate}
                    onChange={(e) => onDateChange(installment.insNumber, e.target.value)}
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
