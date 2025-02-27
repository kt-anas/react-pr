import React from "react";
import ToastContainer from 'react-bootstrap/ToastContainer' 
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import useDataSubmit from "../../hooks/dataBase/useDataSubmit";
function FormDb({ handleAddTaskToDB, tasks }) {
  const {
    taskInput,
    handleChange,
    handleSubmit,
    loading,
    error,
    showToast,
    setShowToast,
   
  } = useDataSubmit(handleAddTaskToDB, tasks);

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
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
            className="ms-2 border border-primary"
            disabled={loading}
            style={{ width: "100px", height: "40px" }}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              </>
            ) : (
              "Add"
            )}
          </Button>
        </InputGroup>
      </Form.Group>

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

export default FormDb;
