import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  return (
    <div className="text-center mt-4">
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>
  );
};

export default LoadingSpinner;
