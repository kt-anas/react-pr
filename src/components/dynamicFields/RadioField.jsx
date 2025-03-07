import React from "react";
import { useField } from "informed";
import { Form } from "react-bootstrap";

const RadioField = ({ label, options, required, ...props }) => {
  const validate = (value) => {
    if (required && !value) return "This field is required";
    return undefined;
  };

  const { fieldState, fieldApi, render, ref } = useField({
    ...props,
    validate,
  });

  return render(
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      <div className="d-flex flex-column">
        {options.map((option) => (
          <Form.Check
            key={option.value}
            type="radio"
            id={`${props.id}-${option.value}`}
            name={props.name}
            label={option.label}
            value={option.value}
            checked={fieldState.value === option.value}
            onChange={(e) => fieldApi.setValue(e.target.value)}
            ref={ref}
            className="custom-radio"
          />
        ))}
      </div>

      {fieldState.error && <div className="text-danger mt-1">{fieldState.error}</div>}
    </Form.Group>
  );
};

export default RadioField;
