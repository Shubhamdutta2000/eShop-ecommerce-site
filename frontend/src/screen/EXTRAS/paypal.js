// import { PayPalButton } from "react-paypal-button-v2";

// const addPayPalScript = async () => {
//   const { data: clientId } = await axios.get("/config/paypal");
//   const script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//   script.async = true;
//   script.onload = () => {
//     setSdkReady(true);
//   };
//   document.body.appendChild(script);
// };

// useEffect(() => {
//   // if (!orders) {
//   // dispatch(getOrderDetails(orderId));
//   // }
//   if (!orders || successPay) {
//     dispatch(getOrderDetails(orderId));
//   }

//   // else if (!orders.isPaid) {
//   //   if (!window.paypal) {
//   //     addPayPalScript();
//   //   } else {
//   //     setSdkReady(true);
//   //   }
//   // }
// }, [dispatch, orderId, orders]);

// const successPaymentHandler = (paymentResult) => {
//   console.log(paymentResult);
//   dispatch(payOrder(orderId, paymentResult));
// };

{
  /*/////////////////////   PAYPAL BUTTON  /////////////////////////// */
}
{
  /* {!orders.isPaid && (
                <ListItem>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                  <PayPalButton
                    style={{
                      maxWidth: "100%",
                      margin: "auto",
                    }}
                    amount={`${orders.totalPrice}`}
                    onSuccess={successPaymentHandler}
                  />
                  )}
                </ListItem>
              )} */
}
