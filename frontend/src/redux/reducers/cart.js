import { CART_ITEM_ADD, CART_ITEM_REMOVE } from "../actionTypes/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ITEM_ADD:
      const item = action.payload;

      // check if cartItems exist or not
      const existItem = state.cartItems.find((p) => p.product == item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.product == existItem.product ? item : p
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};
