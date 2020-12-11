import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Products";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import {
  electronics,
  mens_accessories,
  womens_accessories,
  home_appliances,
} from "../products";

export default function Home() {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
  return (
    <>
      <h1> Electronics Accessories </h1>
      <Row>
        <OwlCarousel className="owl-theme" {...options}>
          {electronics.map((electronic) => (
            <Col>
              <Product product={electronic} />
            </Col>
          ))}
        </OwlCarousel>
      </Row>
    </>
  );
}
