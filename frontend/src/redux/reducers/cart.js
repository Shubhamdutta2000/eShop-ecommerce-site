import { CART_ITEM_ADD, CART_ITEM_REMOVE } from "../actionTypes/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ITEM_ADD:
      const { payload } = action;

      // check if cartItems exist or not
      const existItem = state.cartItems.find(
        (p) => p.product == payload.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.product == existItem.product ? payload : p
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] };
      }

    case CART_ITEM_REMOVE:
      return {
        ...state,
        cartItems: state.cartItems.filter((p) => p.product !== action.payload),
      };

    default:
      return state;
  }
};
