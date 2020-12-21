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
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import ErrMessage from "../components/ErrMessage";

/////////////////     REDUX    ///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { Link } from "react-router-dom";
import { black } from "colors";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const category = match.params.category;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, category, qty));
    }
  }, [dispatch, productId, qty]);

  ////////////////////      remove cart Handler    /////////////////////////

  const removecartHandler = (productid) => {
    console.log(productId);
  };

  // console.log(cartItems);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          {category ? (
            <li className="breadcrumb-item">
              <a href={`/products/${category}/${productId}`}>{category}</a>
            </li>
          ) : null}
          <li className="breadcrumb-item active" aria-current="page">
            CART
          </li>
        </ol>
      </nav>

      <Row className="my-5">
        <Col md={10}>
          <h1>SHOPPING CART ({cartItems.length})</h1>
          <br />
          <br />
          {cartItems.length == 0 ? (
            <ErrMessage varient="#d1ecf1">
              <span style={{ color: "#3E19FA" }}>Your cart is empty</span>{" "}
              <Link to="/">Go back</Link>
            </ErrMessage>
          ) : (
            <ListGroup varient="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.category}/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
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
                    <Col md={2}>
                      <Button
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
      </Row>
    </>
  );
};

export default CartScreen;
