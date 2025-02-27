import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import useForm from "../../hooks/userForm/useForm";
import statesData from "../../../states_districts.json";
import FormGroupUser from "./FormGroupUser";
import ReactSelect from "./ReactSelect";  
import { Link } from "react-router-dom";

const UserForm = () => {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleStateSelect,
    handleDistrictSelect,
    selectedState,
  } = useForm();

  return (
    <>
        <Link to={'/informed'}>
          <Button>Infomed</Button>
        </Link>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-white"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <Row className="mb-3">
          <Col md={6}>
            <FormGroupUser
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={errors.firstName}
              isValid={formData.firstName && !errors.firstName}
              feedbackInvalid={errors.firstName}
              feedbackValid="Looks good!"
            />
          </Col>
          <Col md={6}>
            <FormGroupUser
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={errors.lastName}
              isValid={formData.lastName && !errors.lastName}
              feedbackInvalid={errors.lastName}
              feedbackValid="Looks good!"
            />
          </Col>
        </Row>

        <FormGroupUser
          label="Street"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          isInvalid={errors.street}
          isValid={formData.street && !errors.street}
          feedbackInvalid={errors.street}
          feedbackValid="Looks good!"
        />

        <Row className="mb-3">
          <Col md={6}>
            <FormGroupUser
              label="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              isInvalid={errors.city}
              isValid={formData.city && !errors.city}
            />
          </Col>
          <Col md={6}>
            <FormGroupUser
              label="Pincode"
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              isInvalid={errors.pincode}
              isValid={formData.pincode && !errors.pincode}
              feedbackInvalid={errors.pincode}
              feedbackValid="Looks good!"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <ReactSelect
              items={statesData.states.map((state) => state.state)}
              value={formData.state}
              onChange={handleStateSelect}
              isInvalid={errors.state}
              feedbackInvalid={errors.state}
            />
          </Col>
          <Col md={6}>
            <ReactSelect
              items={selectedState?.districts || []}
              value={formData.district}
              onChange={handleDistrictSelect}
              isInvalid={errors.district}
              feedbackInvalid={errors.district}
              disabled={!formData.state}
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <InputGroup>
            <InputGroup.Text>+91</InputGroup.Text>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              isInvalid={!!errors.phoneNumber}
              placeholder="Enter phone number"
              aria-describedby="phoneHelp"
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Messages</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="messages"
            value={formData.messages}
            onChange={handleChange}
            placeholder="Enter your message here"
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </div>
    </>
  );
};

export default UserForm;
