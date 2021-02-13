import React from "react";

import { Skeleton } from "@material-ui/lab";
import { Col, Row } from "react-bootstrap";

const ProductScreenSkeleton = () => {
  return (
    <>
      <Row>
        <Col md={6}>
          <Skeleton animation="wave" variant="rect" height={440} />
        </Col>
        <Col md={3}>
          <Skeleton variant="rect" height={320} />
        </Col>
        <Col md={3}>
          <Skeleton variant="rect" height={200} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={6}>
          <Skeleton variant="text" height={60} width={360} />
          <Skeleton variant="rect" height={16} width={180} />
          <div className="mt-4 ml-4 mb-3">
            <Skeleton variant="text" height={30} width={180} />
            <Skeleton variant="text" height={16} width={190} />
            <Skeleton variant="text" height={24} width={300} />
          </div>

          <Skeleton variant="text" height={60} width={360} />
          <Skeleton variant="rect" height={30} width={500} />
        </Col>
      </Row>
    </>
  );
};

export default ProductScreenSkeleton;
