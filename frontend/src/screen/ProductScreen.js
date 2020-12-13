import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

export default function ProductScreen({ match }) {
  const product = products.find(
    (p) => p.category == match.params.category && p._id == match.params.id
  );
  console.log(product);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image
            className="shadow"
            src={product.image}
            alt={product.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup className="shadow" varient="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> {product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    <strong>
                      ${product.countInStock ? "In Stock" : "Out Of Stck"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block p-3"
                  type="button"
                  disabled={product.countInStock < 0}
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
