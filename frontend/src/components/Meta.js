import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To eShop",
  description: "Buy all the best products here at very cheap price",
  keyword:
    "eShop,ecommerce,cheap products,online store,ecommerce website,shopping cart,e commerce business,e commerce sites,free shopping cart,payment,payment integration,paypal,stripe,search by products,best products,buy electronics,buy men's accessories,buy women's accessories,buy home appliances",
};

export default Meta;
