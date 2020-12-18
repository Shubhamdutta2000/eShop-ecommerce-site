import React from "react";
import { Alert } from "react-bootstrap";

const ErrMessage = ({ varient, children }) => {
  return (
    <Alert
      style={{
        marginTop: "16px",
        fontSize: "1.4em",
        width: "100%",
        backgroundColor: `${varient}`,
      }}
      dismissible
    >
      {children}
    </Alert>
  );
};

ErrMessage.defaultProps = {
  varient: "info",
};

export default ErrMessage;
