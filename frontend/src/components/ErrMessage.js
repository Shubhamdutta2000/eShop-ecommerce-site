import React from "react";
import { Alert } from "react-bootstrap";

const ErrMessage = ({ varient, children }) => {
  return (
    <Alert variant={varient} style={{ width: "100%" }}>
      {children}
    </Alert>
  );
};

ErrMessage.defaultProps = {
  varient: "info",
};

export default ErrMessage;
