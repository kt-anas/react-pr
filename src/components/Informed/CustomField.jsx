import React from "react";
import { useField } from "informed";

const CustomField = ({
  label,
  fieldType = "text",
  validate,
  required = false,
  placeholder,
  validateOn,  
  ...props
}) => {
  const { fieldState, fieldApi, render } = useField({
    ...props,
    validate,
    validateOn, // Pass validateOn to useField
  });

  const { error, value } = fieldState;
  const inputId = `${props.name}-input`;
  const errorId = `${props.name}-error`;

  // Handle phone number change and validation
  const handlePhoneChange = (e) => {
    let formattedValue = e.target.value;

    // Format the phone number to start with "+91" and limit to 10 digits
    if (formattedValue && !formattedValue.startsWith("+91")) {
      formattedValue = "+91 " + formattedValue.replace(/[^\d]/g, "").slice(0, 10);
    }

    // Set the formatted value
    fieldApi.setValue(formattedValue);

    // Validate the phone number on change
    if (validate) {
      const validationError = validate(formattedValue);
      fieldApi.setError(validationError);
    }
  };

  return render(
    <>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        {...props}  
        id={inputId}
        type={fieldType}
        value={value || ""}
        onChange={fieldType === "tel" ? handlePhoneChange : (e) => fieldApi.setValue(e.target.value)}
        onBlur={() => fieldApi.setTouched(true)}
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <div id={errorId} className="invalid-feedback">
          {error}
        </div>
      )}
    </>
  );
};

export default CustomField;