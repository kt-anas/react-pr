import React from "react";
import { useField } from "informed";
import { Form } from "react-bootstrap";

const CustomInput = ({ label, type = "text", validate, ...props }) => {
  const { fieldState, fieldApi, render, ref } = useField({ validate, ...props });   

  return render(
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        ref={ref}
        value={fieldState.value || ""}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        isInvalid={!!fieldState.error}  
        {...props}
      />
      {fieldState.error && (
        <Form.Control.Feedback type="invalid">{fieldState.error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CustomInput;
