import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../redux/actions/orderAction";
import { emptyCart } from "../redux/actions/cartAction";
import { ORDER_PAY_RESET } from "../redux/actionTypes/orderConstants";

import axios from "axios";
import Loader from "./Loader";

export const PayPalCheckout = ({ orderId, API }) => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { orders } = orderDetails;

  // PAYPAL PAYMENT INTEGRATION
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const [sdkReady, setSdkReady] = useState(false);

  //paypal script
  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get(`${API}/config/paypal`);
    console.log(clientId);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  // if paid successfully reset order_pay and add paypal script if order not paid and paypal is configured previously
  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      //empty cart
      dispatch(emptyCart());
    } else if (orders && !orders.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, orders, successPay]);

  // On payment successfully completed
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(API, orderId, paymentResult));
    // alert("Transaction completed by " + paymentResult.payer.name.given_name);
    alert("Transaction completed by " + orders.user.name + " through paypal");
  };

  // Error handling in payment
  const errorPaymentHandler = (err) => {
    console.log(err);
    alert(err);
  };

  // On cancel of payment
  const cancelPaymentHandler = (msg) => {
    alert("Order " + msg.orderID + " Cancelled");
  };

  return (
    <>
      {loadingPay ? (
        <Loader />
      ) : !sdkReady ? (
        <Loader />
      ) : (
        <PayPalButton
          amount={`${orders.totalPrice}`}
          onSuccess={successPaymentHandler}
          onError={errorPaymentHandler}
          onCancel={cancelPaymentHandler}
        />
      )}
    </>
  );
};
