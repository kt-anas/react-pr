import { useState } from "react";

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else {
      if (name === "firstName" || name === "lastName") {
        if (!/^[a-zA-Z ]+$/.test(value)) {
          error = `Invalid ${
            name === "firstName" ? "first name" : "last name"
          }.`;
        }
      }

      if (name === "street" && !value) {
        error = "Street is required.";
      }

      if (name === "pincode" && (!/^[0-9]{6}$/.test(value) || !value)) {
        error = "Invalid pincode.";
      }

      if (name === "state" && !value) {
        error = "State is required.";
      }

      if (name === "district" && !value) {
        error = "District is required.";
      }

      if (name === "phoneNumber" && (!/^\d{10}$/.test(value) || !value)) {
        error = "Invalid phone number.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    return newErrors;
  };

  return { errors, validate, validateField };
};

export default useFormValidation;
