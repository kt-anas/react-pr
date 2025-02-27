import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const useDatabase = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:5000/todos",
    fetcher
  );
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const handleAddTaskToDB = async (newTask) => {
    try {
      const response = await axios.post("http://localhost:5000/todos", {
        text: newTask,
      });

      mutate((tasks) => [...tasks, response.data], false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${taskId}`);
      setShowDeleteToast(true);
      mutate();
    } catch (err) {
      console.error(err.message);
    }
  };

  return {
    data,
    error,
    isLoading,
    handleAddTaskToDB,
    handleDeleteTask,
    showDeleteToast,
    setShowDeleteToast,
  };
};

export default useDatabase;
