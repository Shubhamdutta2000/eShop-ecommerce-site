import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userAction";

import Message from "../components/ErrMessage";
import Loader from "../components/Loader";

import "../styles/Screen/LoginRegisterScreen.css";

const RegisterScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const register = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, isAuthenticated } = register;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    //DISPATCH REGISTER
    if (password == confirmPassword) {
      dispatch(registerUser(name, email, password));
    } else {
      setMessage("Password does not match");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form">
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label className="login__form-label">Full Name</Form.Label>
              <Form.Control
                className="login__form-input"
                type="name"
                placeholder="Enter Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

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

            <Form.Group controlId="confirmPassword">
              <Form.Label className="login__form-label">
                Confirm Password
              </Form.Label>
              <Form.Control
                className="login__form-input"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/*//////////////////////     VALIDATION ERROR MESSAGE     ////////////////////////*/}

            {error && <Message varient="error">{error}</Message>}
            {message && <Message varient="error">{message}</Message>}

            <Button
              className="btn-block login__form-button"
              type="submit"
              varient="primary"
            >
              Register
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              <h5>
                Already Logged in? &nbsp;
                <span>
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Login
                  </Link>
                </span>
              </h5>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
