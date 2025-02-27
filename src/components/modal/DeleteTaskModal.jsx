import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteTaskModal = ({ show, handleCloseModal, handleConfirmDelete }) => {
  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTaskModal;
