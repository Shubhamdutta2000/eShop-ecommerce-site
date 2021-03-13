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

//////////////////    COMPONENTS     //////////////////////////
import Rating from "../components/Rating";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Skeleton from "./skeletons/ProductScreenSkeleton";

/////////////////     REDUX    ///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../redux/actions/productDetailsAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/actionTypes/productDetailsConstants";

import "../styles/Screen/ProductScreen.css";

export default function ProductScreen({ history, match, API, isMobile }) {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  useEffect(() => {
    if (successProductReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      alert("Review Submitted Successfully");
      setRating(0);
      setComment("");
    }
    dispatch(listProductDetails(API, match.params.category, match.params.id));
  }, [dispatch, match, successProductReview, API]);

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
      createProductReview(API, match.params.category, match.params.id, {
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
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{product.category}</li>
          {!isMobile ? (
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          ) : null}
        </ol>
      </nav>

      <Button onClick={goBack} className="btn btn-light my-3">
        Go Back
      </Button>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <Message varient="#FC308B">{error}</Message>
      ) : (
        <>
          {/* /// add custom title in productScreen (of product name) / */}
          <Meta title={`${product.name}`} />
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
            <Col sm={12} md={9}>
              <h2
                className="mt-5 font-weight-bolder  text-primary display-5"
                style={isMobile ? { fontSize: "2rem" } : { fontSize: "3rem" }}
              >
                Product Reviews
              </h2>
              <Rating value={product.rating} />
              {product.reviews && product.reviews.length === 0 && (
                <Message>No Reviews</Message>
              )}

              <ListGroup className="pt-3" variant="flush">
                {product.reviews &&
                  product.reviews.map((review) => {
                    return (
                      <ListGroup.Item key={review._id}>
                        <div>
                          <h4>
                            <strong>{review.name}</strong>
                          </h4>{" "}
                          <Rating value={review.rating} />
                        </div>

                        <div>
                          <strong>{review.createdAt.substring(0, 10)} </strong>
                          <span className="pl-3"> {review.comment}</span>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>

              <ListGroup varient="flush">
                <ListGroup.Item className="pt-2 mt-4">
                  <h2
                    className="font-weight-bold pb-2 text-primary"
                    style={
                      isMobile ? { fontSize: "1.5rem" } : { fontSize: "2.3rem" }
                    }
                  >
                    Write Your Review
                  </h2>
                  {errorProductReview && (
                    <Message varient="error">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form>
                      <Form.Group controlId="rating">
                        <Form.Label
                          style={isMobile ? { fontSize: "1.3rem" } : {}}
                          className="review_form_label  text-primary"
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
                          style={isMobile ? { fontSize: "1.3rem" } : {}}
                          className="review_form_label  text-primary"
                        >
                          Your Comment
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="8"
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
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
