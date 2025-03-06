import { useEffect, useState } from "react";

const initialCount = 8;  
const initialAmount = 10000;  

const useInstallments = () => {
  const [recommendedAmount, setRecommendedAmount] = useState(initialAmount);
  const [installmentCount, setInstallmentCount] = useState(initialCount);

  const [installments, setInstallments] = useState([]);

 useEffect(() => {
    const newInstallments = Array.from({ length: installmentCount }, (_, i) => ({
      id: i + 1,
      amount: recommendedAmount / installmentCount || 0,
      dueDate:  ''
    }));
    setInstallments(newInstallments);
  }, [installmentCount, recommendedAmount]);

  const [selectedInstallments, setSelectedInstallments] = useState([]);



  const handleDateChange = (id, date) => {
    setInstallments((prev) => {
      const updatedInstallments = [...prev];

      const index = prev.findIndex((inst) => inst.id === id);

      if (index === 0) {
        const newDates = Array(installmentCount)
          .fill("")
          .map((_, i) => {
            const currentDate = new Date(date);
            currentDate.setMonth(currentDate.getMonth() + i);
            return currentDate.toISOString().split("T")[0];
          });

        return updatedInstallments.map((inst, i) => ({
          ...inst,
          dueDate: newDates[i],
        }));
      } else {
        updatedInstallments[index] = {
          ...updatedInstallments[index],
          dueDate: date,
        };
      }

      return updatedInstallments;
    });
  };

  const toggleInstallment = (id) => {
    setSelectedInstallments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };




  const undoSpecificMerge = (id) => {
    setInstallments((prev) => {
      const installmentToUndo = prev.find((inst) => inst.id === id);

      if (!installmentToUndo || !installmentToUndo.mergedFrom) return prev;

      const restoredInstallments = installmentToUndo.mergedFrom.map((originalId) => ({
        id: originalId,
        amount: installmentToUndo.amount / installmentToUndo.mergedFrom.length,
        dueDate: installmentToUndo.dueDate,
      }));

      return prev
        .filter((inst) => inst.id !== id)
        .concat(restoredInstallments)
        .sort((a, b) => a.id - b.id);
    });
  };

  const undoSplitInstallment = (id) => {
    setInstallments((prev) => {
      const splitInstallments = prev.filter((inst) => inst.splitFrom === id);
      if (splitInstallments.length === 0) return prev;
  
      const originalAmount = splitInstallments.reduce(
        (sum, inst) => sum + inst.amount,
        0
      );
  
      const originalDueDate = splitInstallments[0].dueDate;
  
      const restoredInstallment = {
        id,
        amount: originalAmount,
        dueDate: originalDueDate,
      };
  
      return prev
        .filter((inst) => !splitInstallments.includes(inst))
        .concat(restoredInstallment)
        .sort((a, b) => a.id - b.id);
    });

    setSelectedInstallments((prev) => prev.filter((instId) => instId !== id));

  };

  const splitInstallment = () => {
    setInstallments((prev) => {
      if (selectedInstallments.length !== 1) return prev;``
  
      const id = selectedInstallments[0];
  
      const installmentToSplit = prev.find((inst) => inst.id === id);
      if (!installmentToSplit) return prev;
  
      const index = prev.findIndex((inst) => inst.id === id);
      
      const newAmount = installmentToSplit.amount / 2;

      const newInstallment1 = {
        id: Math.max(...prev.map((i) => i.id)) + 1,
        amount: newAmount,
        dueDate: installmentToSplit.dueDate,
        splitFrom: id,
      };

      const newInstallment2 = {
        id: Math.max(...prev.map((i) => i.id)) + 2,
        amount: newAmount,
        dueDate: installmentToSplit.dueDate,
        splitFrom: id,
      };

      const newInstallments = [...prev];
      newInstallments.splice(index, 1, newInstallment1, newInstallment2);

      return newInstallments;
    });
  };

  const mergeInstallments = () => {
    if (selectedInstallments.length < 2) return;

    const sortedIds = [...selectedInstallments].sort((a, b) => a - b);
    const mergedInstallments = installments.filter((inst) =>
      sortedIds.includes(inst.id)
    );

    if (mergedInstallments.length < 2) return;

    const mergedAmount = mergedInstallments.reduce(
      (sum, inst) => sum + inst.amount,
      0
    );
    const mergedDueDate = mergedInstallments[0].dueDate || "";

    const newInstallment = {
      id: Math.min(...sortedIds),
      amount: mergedAmount,
      dueDate: mergedDueDate,
      mergedFrom: sortedIds,
    };

    const newInstallments = installments
      .filter((inst) => !sortedIds.includes(inst.id))
      .concat(newInstallment)
      .sort((a, b) => a.id - b.id);

    setInstallments(newInstallments);
    setSelectedInstallments([]);
  };



  return {
    recommendedAmount,
    setRecommendedAmount,
    installmentCount,
    setInstallmentCount,
    installments,
    handleDateChange,
    toggleInstallment,
    mergeInstallments,
    selectedInstallments,
    undoSpecificMerge,
    splitInstallment,
    undoSplitInstallment
  };
};

export default useInstallments;
