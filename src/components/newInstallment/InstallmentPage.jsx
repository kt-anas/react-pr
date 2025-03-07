import React, { useState, useEffect } from "react";
import TableIn from "./InstallmentTable";

const InstallmentPage = () => {
  const [total, setTotal] = useState("");  
  const [count, setCount] = useState("");  
  
  const [installments, setInstallments] = useState(
    () => Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        insNumber: index + 1,
        isChecked: false,
        amount: (total / count),  
        dueDate: "",  
        show: false,
      }))

  );
  
    

  return (
    <div>
      <form>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          onChange={(e) => setTotal(e.target.value)}
          value={total}
        />
        <label>Count</label>
        <input
          type="number"
          name="count"
          onChange={(e) => setCount(e.target.value)}
          value={count}
        />
      </form>

      <TableIn installments={installments} />
    </div>
  );
};

export default InstallmentPage;
