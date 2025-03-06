


export const generateInstallments = (count, amount) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        amount: Math.floor(amount / count) || 0,
        dueDate: "",
    }));
};