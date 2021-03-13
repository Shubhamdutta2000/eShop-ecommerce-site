import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//// Reducers
import { productListsReducer } from "./reducers/productLists";
import {
  productDetailsReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productDetails";
import { cartReducer } from "./reducers/cart";

import {
  userAuthToken,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/user";

import {
  createOrderReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrdersReducer,
  allOrdersReducer,
  orderDeliverReducer,
} from "./reducers/order";

const reducer = combineReducers({
  productList: productListsReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer, // for admin user only
  productDelete: productDeleteReducer, // for admin user only
  productUpdate: productUpdateReducer, // for admin user only
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAuthToken: userAuthToken,
  userList: userListReducer, // for admin user only
  userDelete: userDeleteReducer, // for admin user only
  userUpdate: userUpdateReducer, // for admin user only
  order: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer, // for admin user only
  orderDeliver: orderDeliverReducer, // for admin user only
});

// GET all cart Items from local Storage
const cartsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// GET shippingAddress from local Storage
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// GET user info from local Storage
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
