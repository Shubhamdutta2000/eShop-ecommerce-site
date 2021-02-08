import {
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ITEM_RESET,
} from "../actionTypes/cartConstants";

///////////////////////    CART ADD & REMOVE TO/FROM CART  ///////////////////
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: "" },
  action
) => {
  switch (action.type) {
    case CART_ITEM_ADD:
      const { payload } = action;
      // check if cartItems exist or not
      const existItem = state.cartItems.find(
        (p) => p.product === payload.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.product === existItem.product ? payload : p
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

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_ITEM_RESET:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
