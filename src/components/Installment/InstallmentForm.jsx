import React from "react";
import {
  Form,
  Table,
  Button,
  Container,
  Row,
  Col,
  Badge,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import useInstallments from "./useInstallments";

const Installment = () => {
  const {
    recommendedAmount,
    setRecommendedAmount,
    installmentCount,
    setInstallmentCount,
    installments,
    handleDateChange,
    toggleInstallment,
    mergeInstallments,
    selectedInstallments,
    undoSpecificMerge,
    splitInstallment,
    undoSplitInstallment,
    setShowToast,
    toastMessage,
    showToast,
    showToastMessage,
  } = useInstallments();

  return (
    <Container className="mt-4">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="warning"
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <h4 className="mb-3">Installment Plan</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Recommended Amount</Form.Label>
          <Form.Control
            type="number"
            value={recommendedAmount}
            onChange={(e) => setRecommendedAmount(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Installment Count</Form.Label>
          <Form.Select
            value={installmentCount}
            onChange={(e) => setInstallmentCount(Number(e.target.value))}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Install No</th>
            <th>Amount</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {installments.map((inst) => (
            <tr key={inst.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  disabled={inst.mergedFrom || inst.splitFrom}
                  checked={selectedInstallments.includes(inst.id)}
                  onChange={(e) => {
                    if (!inst.dueDate) {
                      showToastMessage("You must select a date first.");
                      e.preventDefault();  
                      return;
                    }
                    toggleInstallment(inst.id);
                  }}
                />
              </td>
              <td>
                {inst.mergedFrom ? (
                  <>
                    {inst.mergedFrom.map((id) => (
                      <Badge key={id} bg="info" className="me-1">
                        {id}
                      </Badge>
                    ))}
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => undoSpecificMerge(inst.id)}
                    >
                      x
                    </Button>
                  </>
                ) : inst.splitFrom ? (
                  <>
                    <Badge bg="warning" className="me-1">
                      Split from {inst.splitFrom}
                    </Badge>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => undoSplitInstallment(inst.splitFrom)}
                    >
                      x
                    </Button>
                  </>
                ) : (
                  <div>{inst.id}</div>
                )}
              </td>

              <td>{inst.amount}</td>
              <td>
                <Form.Control
                  type="date"
                  value={inst.dueDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleDateChange(inst.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-3">
        <Col>
          <Button
            variant="primary"
            className="w-100"
            onClick={mergeInstallments}
            disabled={selectedInstallments.length < 2}
          >
            Merge
          </Button>
        </Col>
        <Col>
          <Button
            variant="warning"
            className="w-100"
            onClick={splitInstallment}
            disabled={selectedInstallments.length !== 1}
          >
            Split
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Installment;
