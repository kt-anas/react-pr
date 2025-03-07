import React, { useRef } from "react";
import { Form } from "informed";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import CheckboxField from "./CheckboxField";
import RadioField from "./RadioField";
import formData from "../../../formData.json";
import CustomInput from "./CustomInput";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import FileUploadField from "./FileUploadField";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateTerms,
  validateSkills,
} from "./validations";

const DynamicForm = () => {
  const formApiRef = useRef();
  const fileInputRef = useRef();
  const fileResetRef = useRef(null); 

  const handleSubmit = ({ values }) => {
    console.log("Submitted Values:", values);
    formApiRef.current.reset();

    if (fileResetRef.current) {
      fileResetRef.current();  
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <Form
          onSubmit={handleSubmit}
          formApiRef={formApiRef}
          focusOnInvalid={true}
        >
          <Row className="gy-2">
            <Col md={6}>
              <CustomInput
                id="name"
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
                validate={validateName}
                required
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                validate={validateEmail}
                required
              />
            </Col>
          </Row>

          <CustomInput
            id="phone"
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            validate={validatePhone}
            required={false}
          />
          <RadioField
            id="gender"
            label="Select Your Gender"
            name="gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            required
          />
          <CustomInput
            id="dob"
            label="Date of Birth"
            name="dob"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            required={true}
          />

          <SelectField
            id="country"
            label="Country"
            name="country"
            options={[
              { label: "India", value: "in" },
              { label: "USA", value: "us" },
              { label: "UK", value: "uk" },
              { label: "Canada", value: "ca" },
            ]}
            required={true}
          />

          <TextAreaField
            id="address"
            label="Address"
            name="address"
            placeholder="Enter your address"
            required={false}
          />

          <FileUploadField
            id="resume"
            label="Upload Resume"
            name="resume"
            accept=".pdf,.jpg,.png"
            required
            inputRef={fileInputRef}
            onReset={(resetFunc) => (fileResetRef.current = resetFunc)}
          />

          <CheckboxField
            id="skills"
            label="Select Your Skills"
            name="skills"
            options={[
              { label: "JavaScript", value: "javascript" },
              { label: "Python", value: "python" },
              { label: "Java", value: "java" },
              { label: "React", value: "react" },
            ]}
            validate={validateSkills}
          />

          <CheckboxField
            id="terms"
            label="I accept the Terms & Conditions"
            name="terms"
            validate={validateTerms}
          />

          <div className="text-center mt-3">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default DynamicForm;
