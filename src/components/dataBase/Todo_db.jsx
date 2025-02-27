import React from "react";
import Toast from 'react-bootstrap/Toast'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ToastContainer from 'react-bootstrap/ToastContainer'
import FormDb from "./FormDb";
import useDatabase from "../../hooks/dataBase/useDataBase";
import TaskList from "../TaskList";
import DeleteTaskModal from "../modal/DeleteTaskModal";
import useModal from "../../hooks/useModal";
import NavigationButtons from "../NavBtn";

const TodoDB = () => {
  const {
    data: tasks,
    handleDeleteTask,
    handleAddTaskToDB,
    isLoading,
    error,
    showDeleteToast,
    setShowDeleteToast,
  } = useDatabase();
  const { isOpen, handleShowModal, handleCloseModal, handleConfirmDelete } =
    useModal(handleDeleteTask);

  return (
    <>
      <Container className="py-4">
        <Row className="mb-4">
          <NavigationButtons />
        </Row>
        {error && <div className="text-danger">Error: {error}</div>}

        <FormDb handleAddTaskToDB={handleAddTaskToDB} tasks={tasks} />
        <TaskList
          tasks={tasks}
          handleShowModal={handleShowModal}
          loading={isLoading}
        />

        <DeleteTaskModal
          show={isOpen}
          handleCloseModal={handleCloseModal}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Container>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowDeleteToast(false)}
          show={showDeleteToast}
          delay={2000}
          autohide
          bg="danger"
        >
          <Toast.Body>Task deleted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default TodoDB;
