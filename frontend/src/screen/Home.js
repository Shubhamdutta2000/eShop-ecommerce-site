import React from 'react'
import {Row, Col} from "react-bootstrap";
import Product from "../components/Products"
import {electronics, mens_accessories, womens_accessories, home_appliances} from "../products";

export default function Home() {
     return (
          <>
          <h1> Electronics Accessories </h1>
          <Row>
               {electronics.map((electronic) => (

                    <Col sm={12} md={6} lg={4} xl={3}>
                         <Product product={electronic} />
                    </Col>

               ))}
          </Row>
               
          </>
     )
}