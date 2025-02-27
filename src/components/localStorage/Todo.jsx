import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import TodoForm from "./Form";
import useTasks from "../../hooks/localStorage/useTasks";
import TaskList from "../TaskList";
import DeleteTaskModal from "../modal/DeleteTaskModal";
import useModal from "../../hooks/useModal";
import NavigationButtons from "../NavBtn";

const Todo = () => {
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    showDeleteToast,
    setShowDeleteToast,
  } = useTasks();
  const { isOpen, handleShowModal, handleCloseModal, handleConfirmDelete } =
    useModal(handleDeleteTask);

  return (
    <>
      <Container className="py-4">
        <Row className="mb-4">
          <NavigationButtons />
        </Row>

        <TodoForm handleAddTask={handleAddTask} tasks={tasks} />

        <TaskList tasks={tasks} handleShowModal={handleShowModal} />

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

export default Todo;
