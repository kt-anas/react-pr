import React from "react";
import { useField } from "informed";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

const TextAreaField = ({ label, ...props }) => {
  const { fieldState, fieldApi, render } = useField(props);

  return render(
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormControl
        as="textarea"
        rows={3}
        {...props}
        value={fieldState.value || ""}
        onChange={(e) => fieldApi.setValue(e.target.value)}
      />
    </FormGroup>
  );
};

export default TextAreaField;
