import React from "react";
import { Alert } from "@material-ui/lab";

const ErrMessage = ({ children }) => {
  return (
    <Alert className="mb-3" severity="error">
      {children}
    </Alert>
  );
};

export default ErrMessage;
