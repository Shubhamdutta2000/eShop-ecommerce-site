import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
//////////////////    SCREEN        //////////////////////////

//////////////////    COMPONENTS     //////////////////////////
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import ErrMessage from "../components/ErrMessage";

/////////////////     REDUX    ///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../redux/actions/productDetailsAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/actionTypes/productDetailsConstants";

import "../styles/Screen/ProductScreen.css";

export default function ProductScreen({ history, match }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //////////////////     fetching datas of productList from redux state   ////////////////////////

  const dispatch = useDispatch();

  // product details
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  // create product review reducer
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productCreateReview;

  // user login credentials
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(errorProductReview);
  console.log(successProductReview);
  useEffect(() => {
    if (successProductReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      alert("Review Submitted Successfully");
      setRating(0);
      setComment("");
    } else if (errorProductReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.category, match.params.id));
  }, [dispatch, match, successProductReview, errorProductReview]);

  console.log(product.reviews);
  //////////////////////    Redirect to Cart page      ///////////////////////

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.category}/${match.params.id}?qty=${qty}`
    );
  };

  // submit product review
  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.category, match.params.id, {
        rating: rating,
        comment: comment,
      })
    );
  };

  /////////////////////    GO BACK      ////////////////////////
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active">{product.category}</li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <Button onClick={goBack} className="btn btn-light my-3">
        Go Back
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrMessage varient="#FC308B">{error}</ErrMessage>
      ) : (
        <>
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
                            {[...Array(product.countInStock).keys()].map(
                              (q) => (
                                <option key={q + 1} value={q + 1}>
                                  {q + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className={
                        product.countInStock === 0
                          ? "btn-block p-3 disabled"
                          : "btn-block p-3"
                      }
                      onClick={addToCartHandler}
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/*// list down product reviews and create review //*/}
          <Row>
            <Col md={6}>
              <h2
                className="mt-5 font-weight-bolder  text-primary display-5"
                style={{ fontSize: "2.24rem" }}
              >
                Product Reviews
              </h2>
              <Rating value={product.rating} />
              {product.reviews && product.reviews.length === 0 && (
                <ErrMessage>No Reviews</ErrMessage>
              )}

              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews.map((review) => {
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>;
                  })}
                <ListGroup.Item className="pt-4">
                  <h2
                    className="font-weight-bold display-5 mb-3 text-primary"
                    style={{ fontSize: "1.74rem" }}
                  >
                    Write Your Review
                  </h2>
                  {errorProductReview && (
                    <ErrMessage varient="error">
                      {errorProductReview}
                    </ErrMessage>
                  )}
                  {userInfo ? (
                    <Form>
                      <Form.Group controlId="rating">
                        <Form.Label
                          style={{ fontSize: "1.34rem" }}
                          className="  text-primary"
                        >
                          Rating
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option>Select Rating...</option>
                          <option value="1">1 - Very Bad</option>
                          <option value="2">2 - Not too Bad</option>
                          <option value="3">3 - Noice</option>
                          <option value="4">4 - Loved it</option>
                          <option value="5">5 - WoW Amazing</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label
                          className="  text-primary"
                          style={{ fontSize: "1.34rem" }}
                        >
                          Your Comment
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        className="review_submit"
                        onClick={submitReviewHandler}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <ErrMessage>
                      Please <Link to="/login">sign in</Link> to write a review
                    </ErrMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          {/* 
          <Row>
            <Col md={6}>
              <h2> Product Review</h2>
              <Rating value={product.rating} />
              {product.reviews.length === 0 && (
                <ErrMessage>No Reviews</ErrMessage>
              )}
 
              <ListGroup varient='flush>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <h3>
                      <strong>{review.name}</strong>
                    </h3>
                    <Rating value={review.rating} />
                    <p>Reviewed on {review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
}
