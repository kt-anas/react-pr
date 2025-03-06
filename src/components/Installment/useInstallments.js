import { useEffect, useState } from "react";

const initialCount = 8;
const initialAmount = 10000;

const useInstallments = () => {
  const [recommendedAmount, setRecommendedAmount] = useState(initialAmount);
  const [installmentCount, setInstallmentCount] = useState(initialCount);

  const [installments, setInstallments] = useState([]);

  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const newInstallments = Array.from(
      { length: installmentCount },
      (_, i) => ({
        id: i + 1,
        amount: Math.floor(recommendedAmount / installmentCount) || 0,
        dueDate: "",
      })
    );
    setInstallments(newInstallments);
  }, [installmentCount, recommendedAmount]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDateChange = (id, date) => {
    setInstallments((prev) => {
      const updatedInstallments = [...prev];
      const index = prev.findIndex((inst) => inst.id === id);

      // Extract year and month from selected date
      const selectedDate = new Date(date);
      const selectedYearMonth = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}`;

      // Check if the month-year already exists in another installment (except itself)
      const isDuplicate = prev.some(
        (inst) =>
          inst.id !== id && // Exclude the current installment
          inst.dueDate &&
          new Date(inst.dueDate).getFullYear() === selectedDate.getFullYear() &&
          new Date(inst.dueDate).getMonth() === selectedDate.getMonth()
      );

      if (isDuplicate) {
        showToastMessage(
          "This month is already selected for another installment."
        );
        return prev;
      }

      if (index === 0) {
        // Auto-fill subsequent months
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

      const restoredInstallments = installmentToUndo.mergedFrom.map(
        (originalId) => {
          const originalDueDateEntry = installmentToUndo.originalDueDates?.find(
            (entry) => entry.id === originalId
          );

          return {
            id: originalId,
            amount:
              installmentToUndo.amount / installmentToUndo.mergedFrom.length,
            dueDate: originalDueDateEntry ? originalDueDateEntry.dueDate : "",
          };
        }
      );

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
  };

  const splitInstallment = () => {
    setInstallments((prev) => {
      if (selectedInstallments.length !== 1) return prev;

      const id = selectedInstallments[0];
      const installmentToSplit = prev.find((inst) => inst.id === id);
      if (!installmentToSplit) return prev;

      const index = prev.findIndex((inst) => inst.id === id);
      const newAmount = installmentToSplit.amount / 2;
      const newInstallment1 = {
        id: `${id}.1`,
        amount: newAmount,
        dueDate: installmentToSplit.dueDate,
        splitFrom: id,
      };
      const newInstallment2 = {
        id: `${id}.2`,
        amount: newAmount,
        dueDate: installmentToSplit.dueDate,
        splitFrom: id,
      };
      const newInstallments = [...prev];
      newInstallments.splice(index, 1, newInstallment1, newInstallment2);

      return newInstallments;
    });

    setSelectedInstallments([]);
  };

  const mergeInstallments = () => {
    if (selectedInstallments.length < 2) return;

    const sortedIds = [...selectedInstallments].sort((a, b) => a - b);

    for (let i = 1; i < sortedIds.length; i++) {
      if (sortedIds[i] !== sortedIds[i - 1] + 1) {
        showToastMessage("You can only merge consecutive installments.");
        return;
      }
    }

    const mergedInstallments = installments.filter((inst) =>
      sortedIds.includes(inst.id)
    );

    if (mergedInstallments.length < 2) return;

    const originalDueDates = mergedInstallments.map((inst) => ({
      id: inst.id,
      dueDate: inst.dueDate,
    }));

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
      originalDueDates, // Store previous dates
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
    undoSplitInstallment,
    toastMessage,
    showToast,
    setShowToast,
    showToastMessage,
  };
};

export default useInstallments;
