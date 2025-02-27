import { useState } from "react";

const useModal = (handleDeleteTask) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      handleDeleteTask(selectedId);
      handleCloseModal();
    }
  };

  return {
    isOpen,
    handleShowModal,
    handleCloseModal,
    handleConfirmDelete,
  };
};

export default useModal;
