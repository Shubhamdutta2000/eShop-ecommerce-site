import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { cartReducer } from './reducers/cart';
import {
  allOrdersReducer,
  createOrderReducer,
  myOrdersReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer
} from './reducers/order';
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productUpdateReducer
} from './reducers/productDetails';
//// Reducers
import { productListsReducer } from './reducers/productLists';
import {
  userAuthToken,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer
} from './reducers/user';

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
  orderDeliver: orderDeliverReducer // for admin user only
});

// GET all cart Items from local Storage
const cartsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// GET shippingAddress from local Storage
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// GET user info from local Storage
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: {
    cartItems: cartsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage
  },
  userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
