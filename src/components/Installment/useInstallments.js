import { useEffect, useState } from "react";
import { generateInstallments } from "../../utils/installmentHelpers";

const initialCount = 8;
const initialAmount = 10000;

const useInstallments = () => {
    const [recommendedAmount, setRecommendedAmount] = useState(initialAmount);
    const [installmentCount, setInstallmentCount] = useState(initialCount);

    const [installments, setInstallments] = useState(() => generateInstallments(initialCount, initialAmount));


    const [selectedInstallments, setSelectedInstallments] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setInstallments(generateInstallments(installmentCount, recommendedAmount));
    }, [installmentCount, recommendedAmount]);



    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };


    const autoFillDates = () => {
        const firstDate = installments[0]?.dueDate;
        if (!firstDate) {
            showToastMessage("Please select a date for the first installment.");
            return;
        }

        setInstallments((prev) => {
            const selectedDate = new Date(firstDate);

            // Generate new due dates (one month apart)
            const newDates = Array(installmentCount)
                .fill("")
                .map((_, i) => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(selectedDate.getMonth() + i);
                    return newDate.toISOString().split("T")[0];
                });

            return prev.map((inst, i) => ({
                ...inst,
                dueDate: newDates[i],
            }));
        });
    };




    const handleDateChange = (id, date) => {
        setInstallments((prev) => {
            const updatedInstallments = [...prev];
            const index = prev.findIndex((inst) => inst.id === id);

            const selectedDate = new Date(date);

            if (index === -1) return prev;

            const prevInstallment = index > 0 ? prev[index - 1] : null;
            const nextInstallment = index < prev.length - 1 ? prev[index + 1] : null;


            if (prevInstallment && prevInstallment.dueDate) {
                const prevDate = new Date(prevInstallment.dueDate);
                if (selectedDate <= prevDate) {
                    showToastMessage(
                        `Installment #${index + 1} must be after ${prevDate.toISOString().split("T")[0]}.`
                    );
                    return prev;
                }
            }


            if (nextInstallment && nextInstallment.dueDate) {
                const nextDate = new Date(nextInstallment.dueDate);
                if (selectedDate >= nextDate) {
                    showToastMessage(
                        `Installment #${index + 1} must be before ${nextDate.toISOString().split("T")[0]}.`
                    );
                    return prev;
                }
            }


            const isDuplicate = prev.some(
                (inst) =>
                    inst.id !== id &&
                    inst.dueDate &&
                    new Date(inst.dueDate).toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0]
            );



            if (isDuplicate) {
                console.log(isDuplicate);
                showToastMessage("This date is already selected for another installment.");
                return prev;
            }




            updatedInstallments[index] = {
                ...updatedInstallments[index],
                dueDate: date,
            };


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
        autoFillDates,
    };
};

export default useInstallments;
