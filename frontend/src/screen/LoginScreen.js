import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

import Message from "../components/ErrMessage";
import Loader from "../components/Loader";

import "../styles/Screen/LoginRegisterScreen.css";

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const login = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, isAuthenticated } = login;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    //DISPATCH LOGIN
    dispatch(loginUser(email, password));
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form">
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label className="login__form-label">
                Email Address
              </Form.Label>
              <Form.Control
                className="login__form-input"
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="login__form-label">Password</Form.Label>
              <Form.Control
                className="login__form-input"
                type="password"
                value={password}
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/*//////////////////////     VALIDATION ERROR MESSAGE     ////////////////////////*/}
            {error && <Message varient="error">{error}</Message>}

            <Button
              className="btn-block login__form-button"
              type="submit"
              varient="primary"
            >
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              <h5>
                Haven't Registered yet? &nbsp;
                <span>
                  <Link to={"/register"}>Register</Link>
                </span>
              </h5>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
