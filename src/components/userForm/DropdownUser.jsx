import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";

const DropdownUser = ({
  title,
  items,
  onSelect,
  isInvalid,
  feedbackInvalid,
  disabled,
}) => (
  <div>
    <Form.Control title={title} onSelect={onSelect} disabled={disabled}>
      {items.map((item, index) => (
        <option key={index} eventKey={item}>
          {item}
        </option>
      ))}
    </Form.Control>
    {isInvalid && (
      <div className="invalid-feedback d-block">{feedbackInvalid}</div>
    )}
  </div>
);

export default DropdownUser;
