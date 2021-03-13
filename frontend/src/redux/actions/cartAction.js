import axios from "axios";

import {
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ITEM_RESET,
} from "../actionTypes/cartConstants";

///*     ACTIONS      ///

const addCart = (data, qty) => ({
  type: CART_ITEM_ADD,
  payload: {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    category: data.category,
    countInStock: data.countInStock,
    qty,
  },
});

const removeCart = (id) => ({
  type: CART_ITEM_REMOVE,
  payload: id,
});

const shippingAddress = (data) => ({
  type: CART_SAVE_SHIPPING_ADDRESS,
  payload: data,
});

const paymentMethod = (data) => ({
  type: CART_SAVE_PAYMENT_METHOD,
  payload: data,
});

///*     ACTION CREATOR    ///

///   ADD TO CART   ///
export const addToCart = (API, id, category, qty) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`${API}/products/${category}/${id}`);
  dispatch(addCart(data, qty));
  // Adding cartItems to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

///   REMOVE FROM CART   ///
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(removeCart(id));
  // Adding to localStorage after removing particular product
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

///   SAVE SHIPPING ADDRESS   ///
export const addShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddress(data));

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

///   SAVE PAYMENT METHOD   ///
export const addPaymentMethod = (data) => (dispatch) => {
  dispatch(paymentMethod(data));

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

///   RESET CART ITEMS   ///
export const emptyCart = () => (dispatch) => {
  dispatch({ type: CART_ITEM_RESET });

  localStorage.removeItem("cartItems");
};
