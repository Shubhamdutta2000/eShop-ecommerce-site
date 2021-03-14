import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <p className="text-center py-3" style={{ opacity: 0.8 }}>
              Copyright &copy; 2021 by Shubham Dutta
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
