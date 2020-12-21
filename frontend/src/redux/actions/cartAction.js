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
    countInStock: data.countInStock,
    qty,
  },
});

////////////////////////////       ACTION CREATOR     //////////////////////////

export const addToCart = (id, category, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${category}/${id}`);

  dispatch(addCart(data, qty));

  // Adding cartItems to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
