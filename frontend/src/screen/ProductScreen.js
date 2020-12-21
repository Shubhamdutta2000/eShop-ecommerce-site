import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

//////////////////    SCREEN        //////////////////////////

//////////////////    COMPONENTS     //////////////////////////
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import ErrMessage from "../components/ErrMessage";

/////////////////     REDUX    ///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux/actions/productDetailsAction";

import "../styles/Screen/ProductScreen.css";

export default function ProductScreen({ history, match }) {
  const [qty, setQty] = useState(1);

  //////////////////     fetching datas of productList from redux state   ////////////////////////

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.category, match.params.id));
  }, [dispatch]);

  //////////////////////    Redirect to Cart page      ///////////////////////

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.category}/${match.params.id}?qty=${qty}`
    );
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/">{product.category}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrMessage varient="#FC308B">{error}</ErrMessage>
      ) : (
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
                <h3 className="font-weight-bold text-primary">
                  {product.name}
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <h5 className="font-weight-bold text-secondary">Price:</h5>
                </strong>
                <span>{product.price}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <h5 className="font-weight-bold text-secondary">
                    Description:
                  </h5>
                </strong>
                <p>{product.description}</p>
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
                        ${product.countInStock ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity: </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((q) => (
                            <option key={q + 1} value={q + 1}>
                              {q + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className={
                      product.countInStock == 0
                        ? "btn-block p-3 disabled"
                        : "btn-block p-3"
                    }
                    onClick={addToCartHandler}
                    type="button"
                    disabled={product.countInStock == 0}
                  >
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
