import { useState } from "react";

const useInstallmentActions = (installments, setInstallments) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showError = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const onDateChange = (insNumber, value) => {
    const updatedInstallments = installments.map((inst) =>
      inst.insNumber === insNumber ? { ...inst, dueDate: value } : inst
    );
    setInstallments(updatedInstallments);
  };

 
  const handleAutoFill = () => {
      if (!installments[0].dueDate) {
          showError("Please select first installment date.");
          return;
        }
  
    const firstDate = new Date(installments[0].dueDate);  
    const day = firstDate.getDate(); 
    const updatedInstallments = installments.map((inst, index) => {
      if (index === 0) return inst; 
      let newDate = new Date(firstDate);
      newDate.setMonth(newDate.getMonth() + index);  
      if (newDate.getDate() !== day) {
        newDate.setDate(0);  
      }
  
      return { ...inst, dueDate: newDate.toISOString().split("T")[0] };
    });
  
    setInstallments(updatedInstallments);
  };
  

  const onCheckboxChange = (insNumber) => {
    const updatedInstallments = installments.map((inst) =>
      inst.insNumber === insNumber ? { ...inst, checked: !inst.checked } : inst
    );
    setInstallments(updatedInstallments);
  };

  const handleUndo = (installment) => {
    let newInstallments = [];

    if (installment.isMerged) {
      const originalNumbers = installment.insNumber
        .split("+")
        .map((num) => Number(num));
      newInstallments = installments
        .map((inst) =>
          originalNumbers.includes(inst.insNumber)
            ? { ...inst, show: true, checked: false }
            : inst.insNumber === installment.insNumber
            ? null
            : inst
        )
        .filter(Boolean);
    } else if (installment.isSplited) {
      const originalNumber = Math.floor(installment.insNumber);
      newInstallments = installments
        .map((inst) =>
          inst.insNumber === originalNumber
            ? { ...inst, show: true, checked: false }
            : inst.insNumber === originalNumber + 0.1 ||
              inst.insNumber === originalNumber + 0.2
            ? null
            : inst
        )
        .filter(Boolean);
    } else {
      newInstallments = [...installments];
    }

    setInstallments(newInstallments);
  };

  const handleSplit = () => {
    let newInstallments = [];
    installments.forEach((inst) => {
      if (inst.checked) {
        const halfAmount = (inst.amount / 2).toFixed(2);
        const baseNumber = inst.insNumber;
        newInstallments.push(
          { ...inst, checked: false, show: false },
          {
            ...inst,
            insNumber: baseNumber + 0.1,
            amount: halfAmount,
            checked: false,
            show: true,
            isSplited: true,
          },
          {
            ...inst,
            insNumber: baseNumber + 0.2,
            amount: halfAmount,
            checked: false,
            show: true,
            isSplited: true,
          }
        );
      } else {
        showError("Please select an installment to split.");
        newInstallments.push(inst);
      }
    });

    newInstallments.sort((a, b) => a.insNumber - b.insNumber);
    setInstallments(newInstallments);
  };

  const handleMerge = () => {
    let newInstallments = [];
    let selectedInstallments = installments.filter((inst) => inst.checked);
    selectedInstallments.sort((a, b) => a.insNumber - b.insNumber);

    for (let i = 0; i < selectedInstallments.length - 1; i++) {
      if (
        selectedInstallments[i + 1].insNumber !==
        selectedInstallments[i].insNumber + 1
      ) {
        showError("Please select consecutive installments to merge.");
        return;
      }
    }

    if (selectedInstallments.length < 2) {
      showError("Please select at least two installments to merge.");
      return;
    }

    const totalMergedAmount = selectedInstallments
      .reduce((sum, inst) => sum + parseFloat(inst.amount), 0)
      .toFixed(2);
    const mergedInsNumber = selectedInstallments
      .map((inst) => inst.insNumber)
      .join("+");
    const mergedDueDate = selectedInstallments[0].dueDate || "";

    installments.forEach((inst) => {
      if (inst.checked) {
        newInstallments.push({ ...inst, checked: false, show: false });
      } else {
        newInstallments.push(inst);
      }
    });

    newInstallments.push({
      id: selectedInstallments[0].id,
      insNumber: mergedInsNumber,
      amount: totalMergedAmount,
      dueDate: mergedDueDate,
      checked: false,
      show: true,
      isMerged: true,
    });

    newInstallments.sort((a, b) => a.id - b.id);
    setInstallments(newInstallments);
  };

  return {
    onDateChange,
    onCheckboxChange,
    handleUndo,
    handleSplit,
    handleMerge,
    showToast,
    setShowToast,
    setToastMessage,
    toastMessage,
    handleAutoFill,
  };
};

export default useInstallmentActions;
