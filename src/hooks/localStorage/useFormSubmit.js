import { useState } from "react";
import useValidation from "../useValidation";

const useFormSubmit = (handleAddTask, tasks) => {
  const [taskInput, setTaskInput] = useState("");
  const { error, validateTaskInput } = useValidation(tasks);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTaskInput(taskInput)) {
      return;
    }

    handleAddTask(taskInput.trim());
    setTaskInput("");
    setShowToast(true);
  };

  return {
    taskInput,
    handleChange,
    handleSubmit,
    error,
    showToast,
    setShowToast,
  };
};

export default useFormSubmit;
