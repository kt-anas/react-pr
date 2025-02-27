import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import useFormSubmit from "../../hooks/localStorage/useFormSubmit";

function TodoForm({ handleAddTask, tasks }) {
  const {
    taskInput,
    handleChange,
    handleSubmit,
    error,
    showToast,
    setShowToast,
  } = useFormSubmit(handleAddTask, tasks);

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup hasValidation>
        <Form.Control
          type="text"
          placeholder="Enter a task"
          value={taskInput}
          onChange={handleChange}
          isInvalid={!!error}
          style={{ width: "300px", height: "40px" }}
        />
        <Button
          variant="primary"
          type="submit"
          className="ms-2 "
          style={{ width: "100px", height: "40px" }}
        >
          Add
        </Button>
      </InputGroup>

      {error && <div className="text-danger mt-2">{error}</div>}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
          bg="success"
        >
          
          <Toast.Body>Task added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Form>
  );
}

export default TodoForm;
