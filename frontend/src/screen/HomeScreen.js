import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Products";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import products from "../products";

import "../styles/Screen/HomeScreen.css";

export default function Home() {
  const options = {
    loop: false,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-2x fa-angle-left'></i>",
      "<i class='fa fa-2x fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 0,
      },
      480: {
        items: 1,
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
      <h1 className="pt-5"> Electronics Accessories </h1>
      <Row>
        <OwlCarousel className="owl-theme" {...options}>
          {products
            .filter((p) => p.category === "electronics")
            .map((electronic, index) => (
              <Col key={index}>
                <Product product={electronic} />
              </Col>
            ))}
        </OwlCarousel>
      </Row>

      <h1 className="pt-5">Home Appliances</h1>
      <Row>
        <OwlCarousel className="owl-theme" {...options}>
          {products
            .filter((p) => p.category == "home_appliances")
            .map((home_appliance, index) => (
              <Col key={index}>
                <Product product={home_appliance} />
              </Col>
            ))}
        </OwlCarousel>
      </Row>

      <h1 className="pt-5">Men's Accessories</h1>
      <Row>
        <OwlCarousel className="owl-theme" {...options}>
          {products
            .filter((p) => p.category == "mens_accessories")
            .map((mens_accessory, index) => (
              <Col key={index}>
                <Product product={mens_accessory} />
              </Col>
            ))}
        </OwlCarousel>
      </Row>

      <h1 className="pt-5">Women's Accessories</h1>
      <Row>
        <OwlCarousel className="owl-theme" {...options}>
          {products
            .filter((p) => p.category == "womens_accessories")
            .map((womens_accessory, index) => (
              <Col key={index}>
                <Product product={womens_accessory} />
              </Col>
            ))}
        </OwlCarousel>
      </Row>
    </>
  );
}
