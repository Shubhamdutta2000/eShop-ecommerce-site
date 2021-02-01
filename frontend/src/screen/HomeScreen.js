import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Products";

// Owl Carousal
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productListAction";

// Components
import Loader from "../components/Loader";
import ErrMess from "../components/ErrMessage";

// Carousal Data
import { carousalData } from "../utils/carousalData";

// Styling
import "../styles/Screen/HomeScreen.css";
import { Link } from "react-router-dom";

export default function Home() {
  // option for card carousal
  const options = {
    loop: false,
    dots: false,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-2x fa-angle-left'></i>",
      "<i class='fa fa-2x fa-angle-right'></i>",
    ],
    responsive: {
      320: {
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

  // option for hero section carousal
  const options2 = {
    loop: true,
    margin: 100,
    nav: true,
    // autoplay: true,
    autoplayTimeout: 2400,
    lazyLoad: true,
    smartSpeed: 800,
    items: 1,
  };

  //////////////////     fetching datas of productList from redux state   ////////////////////////

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
    console.log(carousalData);
  }, [dispatch]);

  return (
    <>
      {/*//////////////////////////       CAROUSAL      /////////////////////////////////////// */}

      <Row style={{ overflow: "hidden" }}>
        <OwlCarousel
          key={products.length}
          className="owl-carousel owl-theme"
          {...options2}
        >
          {carousalData.map((data, index) => (
            <Col key={index}>
              <div
                className="carousal"
                style={{
                  background: `url(${data.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1 className="carousal_heading">{data.heading}</h1>
                <h2 className="carousal_para">{data.para}</h2>
                <a href={data.id} className="carousal_button">
                  SHOP NOW
                </a>
              </div>
              {/* <img
                className="carousal_img"
                src={data.image}
                alt="electronics"
              /> */}
            </Col>
          ))}
        </OwlCarousel>
      </Row>
      {/* /////////////////    BUG: Render carusal before children ////////// */}
      {/*//////////////////    SOLUTION: ADD key to OwlCarousal  */}

      <div id="electronics" className="mx-5 px-4">
        {/* ELECTRONICS */}
        <h1 className="pt-5"> Electronics Accessories </h1>

        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrMess varient="#FC308B">{error}</ErrMess>
          ) : (
            products && (
              <OwlCarousel
                key={products.length}
                className="owl-theme"
                {...options}
              >
                {products
                  .filter((p) => p.category == "electronics")
                  .map((electronic, index) => (
                    <Col key={index}>
                      <Product product={electronic} />
                    </Col>
                  ))}
              </OwlCarousel>
            )
          )}
        </Row>

        {/* HOME APPLIANCES */}
        <h1 id="home_appliances" className="pt-5">
          Home Appliances
        </h1>

        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrMess varient="#FC308B">{error}</ErrMess>
          ) : (
            products && (
              <OwlCarousel
                key={products.length}
                className="owl-theme"
                {...options}
              >
                {products
                  .filter((p) => p.category == "home_appliances")
                  .map((home_appliance, index) => (
                    <Col key={index}>
                      <Product product={home_appliance} />
                    </Col>
                  ))}
              </OwlCarousel>
            )
          )}
        </Row>

        {/* MENS'S ACCESSORIES */}
        <h1 id="mens_accessories" className="pt-5">
          Men's Accessories
        </h1>

        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrMess varient="#FC308B">{error}</ErrMess>
          ) : (
            products && (
              <OwlCarousel
                key={products.length}
                className="owl-theme"
                {...options}
              >
                {products
                  .filter((p) => p.category == "mens_accessories")
                  .map((mens_accessory, index) => (
                    <Col key={index}>
                      <Product product={mens_accessory} />
                    </Col>
                  ))}
              </OwlCarousel>
            )
          )}
        </Row>

        {/* WOMEN'S ACCESSORIES */}
        <h1 id="womens_accessories" className="pt-5">
          Women's Accessories
        </h1>

        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrMess varient="#FC308B">{error}</ErrMess>
          ) : (
            products && (
              <OwlCarousel
                key={products.length}
                className="owl-theme"
                {...options}
              >
                {products
                  .filter((p) => p.category == "womens_accessories")
                  .map((womens_accessory, index) => (
                    <Col key={index}>
                      <Product product={womens_accessory} />
                    </Col>
                  ))}
              </OwlCarousel>
            )
          )}
        </Row>

        {/*//////////////////////////       CAROUSAL ENDS      /////////////////////////////////////// */}

        {/* ALL PRODUCTS */}
        <h1 className="pt-5">Latest Products</h1>

        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrMess varient="#FC308B">{error}</ErrMess>
          ) : (
            products.map((product, index) => (
              <Col md={4} lg={3} key={index}>
                <Product product={product} />
              </Col>
            ))
          )}
        </Row>
      </div>
    </>
  );
}
