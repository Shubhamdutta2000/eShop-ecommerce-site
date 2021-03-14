import React, { useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
  Form,
} from "react-bootstrap";

//////////////////    COMPONENTS     //////////////////////////
import Message from "../components/Message";

/////////////////     REDUX    ///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import { Link } from "react-router-dom";

//////////////////   CSS style   //////////////////////////////

import "../styles/Screen/CartScreen.css";
import Meta from "../components/Meta";

const CartScreen = ({ match, location, history, isMobile, API }) => {
  const productId = match.params.id;
  const category = match.params.category;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  /// User Login Credentials  ///
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  ///  cart reducer  ///
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (productId) {
      dispatch(addToCart(API, productId, category, qty));
    }
  }, [dispatch, productId, qty, category, userInfo, history, API]);

  ///    remove cart Handler  ///
  const removecartHandler = (productId) => {
    console.log(productId);
    dispatch(removeFromCart(productId));
  };

  ///   Checkout Process Handler  ///
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
    console.log("CHECKOUT");
  };

  ///  GO BACK   ///
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {/* /// add custom title in Cart Screen / */}
      <Meta title="Shopping Cart" />
      {/*///  BREADCRUMB OF NAV  /*/}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            CART
          </li>
        </ol>
      </nav>

      <Button onClick={goBack} className="btn btn-light mt-2">
        Go Back
      </Button>
      {/*///////////////////////////  CART WHOLE SECTION  /////////////////////////////*/}

      <Row className="mt-4">
        {/*//////////////////////////   1. CART LEFT SECTION   //////////////////////////////*/}
        <Col md={8}>
          <h1 className="cart__name ">
            YOUR CART ({cartItems && cartItems.length})
            <span className="cart__name__span"> ITEM</span>
          </h1>

          <br />

          {/*//////////////    CART == EMPTY -> ErrMess => Else => loop through cartItems   ////////////*/}

          {cartItems.length === 0 ? (
            <Message varient="info">
              <span className="cart__empty">Your cart is empty </span>
              <Link to="/">Keep Shopping</Link>
            </Message>
          ) : (
            <ListGroup varient="flush" className="shadow-lg">
              {!isMobile ? (
                <ListGroup.Item className="cart__left__heading">
                  <Row>
                    <Col sm={3}>
                      <h3>Image</h3>
                    </Col>
                    <Col sm={3}>
                      <h3>Name</h3>
                    </Col>
                    <Col sm={2}>
                      <h3>Price</h3>
                    </Col>
                    <Col sm={2}>
                      <h3>Quantity</h3>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ) : null}
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col sm={3}>
                      <Image
                        className="cart__left__item__image"
                        width={isMobile ? "360" : "200"}
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col className="mt-4" sm={3}>
                      <Link
                        className="cart__left__item__name"
                        to={`/products/${item.category}/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col sm={2} className="cart__left__item__price">
                      ${item.price}
                    </Col>
                    <Col className={isMobile ? "mt-3" : ""} sm={2}>
                      <Form.Control
                        as="select"
                        style={{ border: "none", outline: "none" }}
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(
                              item.product,
                              item.category,
                              Number(e.target.value)
                            )
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((q) => (
                          <option key={q + 1} value={q + 1}>
                            {q + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col className={isMobile ? "mt-3 mb-2" : ""} sm={2}>
                      <Button
                        className="cart__left__item__remove"
                        type="button"
                        variant="light"
                        onClick={() => removecartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        {/*//////////////////////////   2. CART RIGHT SECTION    /////////////////////////////*/}
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item className={isMobile ? "pt-4" : "pb-4"}>
                <Button
                  className="btn-block p-2 cart__right__checkout"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  PROCEED TO PAY
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4 className="cart__right__order__heading">
                  <strong>ORDER SUMMARY</strong>
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4 className="cart__right__subtotal">Subtotal:</h4>
                  </Col>
                  <Col>
                    <h5 className="cart__right__subtotal--value">
                      ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4 className="cart__right__price">Price:</h4>
                  </Col>
                  <Col>
                    <h5 className="cart__right__price--value">
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4 className="cart__right__delivery">Delivery:</h4>
                  </Col>
                  <Col>
                    <h5 className="cart__right__delivery--value">Free</h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4 className="cart__right__total__price">Total:</h4>
                  </Col>
                  <Col>
                    <h5 className="cart__right__total__price--value">
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
