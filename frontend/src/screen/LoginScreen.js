import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userAction";

import Message from "../components/ErrMessage";
import Loader from "../components/Loader";

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
    dispatch(userLogin(email, password));
  };

  return (
    <Container>
      {error && <Message varient="#FC308B">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="btn-block" type="submit" varient="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Haven't Registered yet?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/"}>
            register
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
