import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrMessage({ varient, children }) {
  return <Alert varient={varient}>{children}</Alert>;
}

ErrMessage.defaultProps = {
  varient: "info",
};
