import React from "react";
import { Alert } from "react-bootstrap";

const ErrMessage = ({ varient, children }) => {
  return (
    <Alert
      style={{
        marginTop: "10px",
        fontSize: "1.2em",
        textAlign: "center",
        width: "100%",
        backgroundColor: `${varient}`,
      }}
    >
      {children}
    </Alert>
  );
};

ErrMessage.defaultProps = {
  varient: "#77F7FF",
};

export default ErrMessage;
