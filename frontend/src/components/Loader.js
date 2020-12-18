import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <Spinner
      animation="border"
      variant="primary"
      role="status"
      style={{
        width: "60px",
        height: "60px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}
