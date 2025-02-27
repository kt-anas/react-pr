import { useState } from "react";
import useValidation from "../useValidation";

const useDataSubmit = (handleAddTaskToDB, tasks) => {
  const { error, validateTaskInput } = useValidation(tasks);
  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTaskInput(taskInput)) {
      return;
    }

    setLoading(true);

    try {
      await handleAddTaskToDB(taskInput.trim());
      setTaskInput("");
      setShowToast(true);
    } catch (err) {
      console.error("Error while adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    taskInput,
    handleChange,
    handleSubmit,
    loading,
    error,
    showToast,
    setShowToast,
  };
};

export default useDataSubmit;
