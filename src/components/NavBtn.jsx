import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router";

const NavigationButtons = () => {
  const location = useLocation();

  const getButtonVariant = (path) => {
    return location.pathname === path ? "primary" : "";
  };

  return (
    <Col className="d-flex justify-content-between">
      <Link to={"/localStorage"}>
        <Button
          variant={getButtonVariant("/localStorage")}
          className="border border-primary"
        >
          LocalStorage
        </Button>
      </Link>
      <Link to={"/mongodb"}>
        <Button
          variant={getButtonVariant("/mongodb")}
          className="border border-primary"
        >
          MongoDB
        </Button>
      </Link>
    </Col>
  );
};

export default NavigationButtons;
