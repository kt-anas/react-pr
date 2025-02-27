import { useState } from "react";
import useFormValidation from "./useFormValidation";
import statesData from "../../../states_districts.json";

const useForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    country: "India",
    pincode: "",
    state: "",
    district: "",
    phoneNumber: "",
    countryCode: "+91",
    messages: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedState, setSelectedState] = useState(null);

  const { errors, validate, validateField } = useFormValidation(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleStateSelect = (state) => {
    const selectedStateData = statesData.states.find((s) => s.state === state);
    setFormData({ ...formData, state });
    setSelectedState(selectedStateData);
    validateField("state", state);
  };

  const handleDistrictSelect = (district) => {
    setFormData({ ...formData, district });
    validateField("district", district);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setFormData(initialState);
      console.log(formData);
    } else {
      console.log(errors);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleStateSelect,
    handleDistrictSelect,
    selectedState,
  };
};

export default useForm;
