import React from "react";
import { useField } from "informed";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

const SelectField = ({ label, options, value, onChange, ...props }) => {
  const { fieldState, fieldApi, render } = useField(props);

  return render(
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormSelect
        {...props}
        value={value ?? fieldState.value ?? ""}
        onChange={(e) => {
          fieldApi.setValue(e.target.value);
          onChange && onChange(e); 
        }}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export default SelectField;
