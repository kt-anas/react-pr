import { useState, useEffect } from "react";

const useInstallments = (initialTotal, initialCount) => {
  const [total, setTotal] = useState(initialTotal);
  const [count, setCount] = useState(initialCount);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    if (total > 0 && count > 0) {
      const newInstallments = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        insNumber: index + 1,
        checked: false,
        amount: Math.floor(total / count).toFixed(2),
        dueDate: "",
        show: true,
      }));
      setInstallments(newInstallments);
    } else {
      setInstallments([]);
    }
  }, [total, count]);

  return { total, setTotal, count, setCount, installments, setInstallments };
};

export default useInstallments;
