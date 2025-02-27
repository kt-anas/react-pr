import { useState } from "react";

const useTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const handleAddTask = (taskInput) => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput.trim(),
        completed: false,
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setShowDeleteToast(true);
  };

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    showDeleteToast,
    setShowDeleteToast,
  };
};

export default useTasks;
