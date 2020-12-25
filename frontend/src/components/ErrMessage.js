import React from "react";
import { Alert } from "@material-ui/lab";

const ErrMessage = ({ varient, children }) => {
  return (
    <Alert className="mb-3" severity={varient}>
      {children}
    </Alert>
  );
};

export default ErrMessage;
