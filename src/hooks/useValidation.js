import { useState } from "react";

const useValidation = (tasks) => {
  const [error, setError] = useState("");

  const validateTaskInput = (taskInput) => {
    if (!taskInput.trim()) {
      setError("Please enter a valid task.");
      return false;
    }

    const isDuplicate = tasks.some(
      (task) =>
        task.text.toLowerCase().trim().replace(/\s+/g, " ") ===
        taskInput.toLowerCase().trim().replace(/\s+/g, " ")
    );

    if (isDuplicate) {
      setError("This task already exists.");
      return false;
    }

    setError("");
    return true;
  };

  return { error, validateTaskInput };
};

export default useValidation;
