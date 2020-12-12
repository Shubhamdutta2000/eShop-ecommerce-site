import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar className="navbar py-3" sticky="top" expand="lg" collapseOnSelect>
        <Container>
          {/* Home Page Link */}
          <NavLink to="/">
            <Navbar.Brand className="text-white" style={{ fontSize: "1.8rem" }}>
              eShop
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* Cart Page Link */}
              <NavLink to="/cart">
                <Nav.Link className="nav_link text-white pr-4">
                  <i
                    className="fa fa-shopping-cart pr-1"
                    aria-hidden="true"
                  ></i>
                  CART
                </Nav.Link>
              </NavLink>

              {/* Link to Login Page */}
              <NavLink to="/login">
                <Nav.Link className="nav_link text-white">
                  <i className="fa fa-user-plus pr-1" aria-hidden="true"></i>
                  SIGN IN
                </Nav.Link>
              </NavLink>
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
