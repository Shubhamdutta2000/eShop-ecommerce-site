import React from 'react'
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap"

const Header = () => {
     return (
          <header>
               <Navbar className="navbar navbar-light py-2" sticky="top" expand="lg" collapseOnSelect>
                    <Container>
                         <Navbar.Brand className="text-white" style={{fontSize: '1.8rem'}} href="/">eShop</Navbar.Brand>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                         <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="ml-auto">
                                   <Nav.Link className="nav_link text-white pr-4" href="/cart"><i className="fa fa-shopping-cart pr-1" aria-hidden="true"></i> CART</Nav.Link>
                                   <Nav.Link className="nav_link text-white"  href="/signup"><i className="fa fa-user-plus pr-1" aria-hidden="true"></i> SIGN IN</Nav.Link>
                              </Nav>
                              <Form className="pl-5" inline>
                                   <FormControl className="search_box" type="text" placeholder="Search" className="mr-sm-2" />
                                   <Button variant="outline-success">Search</Button>
                              </Form>
                         </Navbar.Collapse>
                    </Container>
               </Navbar>
          </header>
     )
}

export default Header
