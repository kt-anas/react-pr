import React from "react";
import { useTranslation } from "react-i18next";
import { Form, TextArea, Checkbox } from "informed";
import CustomField from "./CustomField";
import useFormManager from "./useFormManager";
import statesData from "../../../states_districts.json";
import CustomSelectField from "./CustomSelectField";
import FileUpload from "./FileUpload";

const InformedForm = () => {
  const { t, i18n } = useTranslation();
  const {
    districts,
    handleStateChange,
    getStateOptions,
    getDistrictOptions,
    validateRequired,
    validateName,
    validatePincode,
    validatePhone,
    validateDropdown,
  } = useFormManager(statesData);

  const checkboxOptions = [
    { value: "sports", label: t("sports") },
    { value: "music", label: t("music") },
    { value: "travel", label: t("travel") },
  ];

  const handleSubmit = (values) => {
    console.log("Form submitted:");
    console.log("Values:", values);

    if (values.file) {
      console.log("Uploaded file:", values.file);
    } else {
      console.log("No file uploaded.");
    }

    
    const selectedInterests = checkboxOptions
      .filter(option => values.interests && values.interests[option.value])
      .map(option => option.value);

    console.log("Selected Interests:", selectedInterests);  

    alert("Form submitted successfully!");
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => i18n.changeLanguage("en")}
          className="btn btn-outline-primary btn-sm me-2"
        >
          English
        </button>
        <button
          onClick={() => i18n.changeLanguage("hi")}
          className="btn btn-outline-primary btn-sm"
        >
          हिन्दी
        </button>
      </div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="p-4 border rounded"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <Form onSubmit={handleSubmit}>
            {({ form }) => (
              <>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <CustomField
                      name="firstName"
                      label={t("firstName")}
                      placeholder={t("firstName")}
                      validate={validateName}
                      validateOn="change"
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomField
                      name="lastName"
                      label={t("lastName")}
                      placeholder={t("lastName")}
                      validate={validateName}
                      validateOn="change"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <CustomField
                    name="street"
                    label={t("street")}
                    placeholder={t("street")}
                    validate={validateRequired}
                    validateOn="change"
                    required
                  />
                </div>
                <div className="mb-3">
                  <CustomField
                    name="city"
                    label={t("city")}
                    placeholder={t("city")}
                    validate={validateRequired}
                    validateOn="change"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <CustomField
                      name="pincode"
                      label={t("pincode")}
                      placeholder={t("pincode")}
                      validate={validatePincode}
                      validateOn="change"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <CustomField
                      name="phone"
                      label={t("phone")}
                      placeholder={t("phone")}
                      fieldType="tel"
                      validate={validatePhone}
                      validateOn="change"
                      required
                      maxLength={14}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <CustomSelectField
                    name="state"
                    label={t("state")}
                    options={[
                      { value: "", label: t("selectState") },
                      ...getStateOptions(),
                    ]}
                    onChange={handleStateChange}
                    className="form-select"
                    validate={validateDropdown}
                    validateOn="change"
                    required
                  />
                </div>
                <div className="mb-3">
                  <CustomSelectField
                    name="district"
                    label={t("district")}
                    options={[
                      { value: "", label: t("selectDistrict") },
                      ...getDistrictOptions(),
                    ]}
                    className="form-select"
                    validate={validateDropdown}
                    validateOn="change"
                    disabled={!districts.length}
                    required
                  />
                </div>
                <div className="mb-3">
                  <TextArea
                    name="messages"
                    label={t("messages")}
                    placeholder={t("messages")}
                    className="form-control"
                    validateOn="change"
                  />
                </div>

                <FileUpload
                  name="file"
                  label={t("file")}
                  required={true}
                  onChange={(file) => form.setValue("file", file)}
                />

                <div className="mb-3">
                  <label className="form-label">{t("interests")}</label>
                  {checkboxOptions.map((option) => (
                    <div className="form-check" key={option.value}>
                      <Checkbox
                        name={`interests.${option.value}`}
                        className="form-check-input"
                      />
                      <label className="form-check-label">{option.label}</label>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {t("submit")}
                </button>
              </>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default InformedForm;
