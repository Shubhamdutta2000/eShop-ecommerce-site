import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Products";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// import products from "../products";

import axios from "axios";

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

  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState({
    electronics: [],
    home_appliances: [],
    mens_accessories: [],
    womens_accessories: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/products");

      setProducts(data);

      // filter all products by category
      setCategory({
        electronics: data.filter((p) => p.category == "electronics"),
        home_appliances: data.filter((p) => p.category == "home_appliances"),
        mens_accessories: data.filter((p) => p.category == "mens_accessories"),
        womens_accessories: data.filter(
          (p) => p.category == "womens_accessories"
        ),
      });
    };

    fetchProducts();
  }, []);

  // console.log(category);

  return (
    <>
      {/*//////////////////////////       CAROUSAL      /////////////////////////////////////// */}

      {/* /////////////////    BUG: Render carusal before children ////////// */}
      {/*//////////////////    SOLUTION: ADD key to OwlCarousal  */}

      {/* ELECTRONICS */}
      <h1 className="pt-5"> Electronics Accessories </h1>
      <Row>
        {category && (
          <OwlCarousel
            key={category.electronics.length}
            className="owl-theme"
            {...options}
          >
            {category.electronics.map((electronic, index) => (
              <Col key={index}>
                <Product product={electronic} />
              </Col>
            ))}
          </OwlCarousel>
        )}
      </Row>

      {/* HOME APPLIANCES */}
      <h1 className="pt-5">Home Appliances</h1>
      <Row>
        {category && (
          <OwlCarousel
            key={category.home_appliances.length}
            className="owl-theme"
            {...options}
          >
            {category.home_appliances.map((home_appliance, index) => (
              <Col key={index}>
                <Product product={home_appliance} />
              </Col>
            ))}
          </OwlCarousel>
        )}
      </Row>

      {/* MENS'S ACCESSORIES */}
      <h1 className="pt-5">Men's Accessories</h1>
      <Row>
        {category && (
          <OwlCarousel
            key={category.mens_accessories.length}
            className="owl-theme"
            {...options}
          >
            {category.mens_accessories.map((mens_accessory, index) => (
              <Col key={index}>
                <Product product={mens_accessory} />
              </Col>
            ))}
          </OwlCarousel>
        )}
      </Row>

      {/* WOMEN'S ACCESSORIES */}
      <h1 className="pt-5">Women's Accessories</h1>
      <Row>
        {category && (
          <OwlCarousel
            key={category.womens_accessories.length}
            className="owl-theme"
            {...options}
          >
            {category.womens_accessories.map((womens_accessory, index) => (
              <Col key={index}>
                <Product product={womens_accessory} />
              </Col>
            ))}
          </OwlCarousel>
        )}
      </Row>

      {/*//////////////////////////       CAROUSAL ENDS      /////////////////////////////////////// */}

      {/* ALL PRODUCTS */}
      <h1 className="pt-5">Latest Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col md={4} lg={3} key={index}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
