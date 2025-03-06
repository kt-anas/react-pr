import React from "react";
import { useField } from "informed";
import { Form } from "react-bootstrap";

const RadioField = ({ label, options, ...props }) => {
  const { fieldState, fieldApi, render, ref } = useField(props);

  return render(
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">{label}</Form.Label>
      <div className="d-flex flex-column">
        {options.map((option) => (
          <Form.Check
            key={option.value}
            type="radio"
            id={`${props.id}-${option.value}`}
            name={props.id}
            label={option.label}
            value={option.value}
            checked={fieldState.value === option.value}
            onChange={(e) => fieldApi.setValue(e.target.value)}
            ref={ref}
            className="custom-radio"
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default RadioField;
