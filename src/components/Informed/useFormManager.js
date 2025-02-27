import { useState } from "react";

const useFormManager = (statesData) => {
  const [districts, setDistricts] = useState([]);

  const validateRequired = (value) =>
    !value ? "This field is required" : undefined;

  const validateName = (value) => {
    if (!value) return "This field is required";
    return /^[a-zA-Z\s]+$/.test(value) ? undefined : "Only letters are allowed";
  };

  const validatePincode = (value) =>
    /^\d{6}$/.test(value) ? undefined : "Pincode must be exactly 6 digits";

  const validatePhone = (value) => {
    const trimmedValue = value.replace(/\s+/g, "").replace(/^\+91/, "");
    return /^\d{10}$/.test(trimmedValue)
      ? undefined
      : "Enter a valid 10-digit phone number";
  };

  const validateFileUpload = (value) =>
    value && value.length > 0 ? undefined : "Please upload a file";

  const validateInterests = (value) =>
    value && Object.values(value).some((v) => v)
      ? undefined
      : "Select at least one interest";

  const validateDropdown = (value) =>
    !value ? "Please select an option" : undefined;

  const handleStateChange = (selectedState) => {
    const stateName = selectedState?.value || "";
    const selectedStateObj = statesData.states.find(
      (item) => item.state === stateName
    );
    setDistricts(selectedStateObj ? selectedStateObj.districts || [] : []);
  };

  const getStateOptions = () =>
    statesData.states.map((state) => ({
      value: state.state,
      label: state.state,
    }));

  const getDistrictOptions = () =>
    districts.map((district) => ({
      value: district,
      label: district,
    }));

  return {
    districts,
    handleStateChange,
    getStateOptions,
    getDistrictOptions,
    validateRequired,
    validateName,
    validatePincode,
    validatePhone,
    validateFileUpload,
    validateInterests,
    validateDropdown,
  };
};

export default useFormManager;
