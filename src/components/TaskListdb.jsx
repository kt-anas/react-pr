import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { AiOutlineDelete } from "react-icons/ai";
const TaskListdb = ({ tasks, handleShowModal, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!tasks.length) {
    return <p className="text-muted text-center mt-4">No tasks available.</p>;
  }

  return (
    <Table striped bordered hover responsive className="mt-3 shadow-sm">
      <thead className="bg-light">
        <tr>
          <th>Task</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks
          .slice()
          .reverse()
          .map((task) => (
            <tr key={task._id}>
              <td>{task.text}</td>
              <td className="text-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowModal(task._id)}
                >
                  <AiOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TaskListdb;
