import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar className="navbar py-3" sticky="top" expand="lg" collapseOnSelect>
        <Container>
          {/* Home Page Link */}
          <LinkContainer to="/">
            <Navbar.Brand className="text-white" style={{ fontSize: "1.8rem" }}>
              eShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto pr-4">
              {/* Cart Page Link */}
              <LinkContainer to="/cart">
                <Nav.Link className="nav_link text-white pr-4">
                  <i
                    className="fa fa-shopping-cart pr-1"
                    aria-hidden="true"
                  ></i>
                  CART
                </Nav.Link>
              </LinkContainer>

              {/* Link to Login Page */}
              <LinkContainer to="/login">
                <Nav.Link className="nav_link text-white">
                  <i className="fa fa-user-plus pr-1" aria-hidden="true"></i>
                  SIGN IN
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <FormControl
                className="search_box"
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-secondary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
