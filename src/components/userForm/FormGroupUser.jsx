import React from "react";
import Form from "react-bootstrap/Form";

const FormGroupUser = ({
  label,
  type,
  name,
  value,
  onChange,
  isInvalid,
  isValid,
  feedbackInvalid,
  feedbackValid,
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      isInvalid={!!isInvalid}
      isValid={!!isValid}
    />
    <Form.Control.Feedback type="invalid">
      {feedbackInvalid}
    </Form.Control.Feedback>
    <Form.Control.Feedback type="valid">{feedbackValid}</Form.Control.Feedback>
  </Form.Group>
);

export default FormGroupUser;
