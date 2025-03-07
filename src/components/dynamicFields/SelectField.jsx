import React from "react";
import { useField } from "informed";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

const SelectField = ({ label, options, required, ...props }) => {
  const validate = (value) => {
    if (required && !value) return "This field is required";
    return undefined;
  };

  const { fieldState, fieldApi, render } = useField({
    ...props,
    validate,
  });

  return render(
    <FormGroup>
      <FormLabel>
        {label} {required && <span className="text-danger">*</span>}
      </FormLabel>
      <FormSelect
        {...props}
        value={fieldState.value ?? ""}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        isInvalid={!!fieldState.error}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>
      {fieldState.error && <div className="text-danger mt-1">{fieldState.error}</div>}
    </FormGroup>
  );
};

export default SelectField;
