import React, { useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";

import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../redux/actions/orderAction";
import { ORDER_PAY_RESET } from "../redux/actionTypes/orderConstants";

import axios from "axios";
import Loader from "./Loader";

export const PayPalCheckout = ({ orderId }) => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { orders } = orderDetails;

  // PAYPAL PAYMENT INTEGRATION
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/config/paypal");
    console.log(clientId);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
    }

    if (orders && !orders.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    }
  }, [dispatch, orders, successPay]);

  // On payment successfully completed
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
    // alert("Transaction completed by " + paymentResult.payer.name.given_name);
    alert("Transaction completed by " + orders.user.name);
  };

  // Error handling in payment
  const errorPaymentHandler = (err) => {
    console.log(err);
    alert(err);
  };

  // On cancel of payment
  const cancelPaymentHandler = (msg) => {
    alert("Order " + msg.orderID + " Cancelled");
    console.log(msg);
  };

  return (
    <>
      {loadingPay ? (
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
