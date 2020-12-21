import axios from "axios";

import { CART_ITEM_ADD, CART_ITEM_REMOVE } from "../actionTypes/cartConstants";

///////////////////////////        ACTIONS        /////////////////////////////////

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

////////////////////////////       ACTION CREATOR     //////////////////////////

export const addToCart = (id, category, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${category}/${id}`);

  dispatch(addCart(data, qty));

  // Adding cartItems to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(removeCart(id));

  // Adding to localStorage after removing particular product
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
