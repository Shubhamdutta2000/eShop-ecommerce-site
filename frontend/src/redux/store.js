import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//// Reducers
import { productListsReducer } from "./reducers/productLists";
import { productDetailsReducer } from "./reducers/productDetails";
import { cartReducer } from "./reducers/cart";
import { userLoginReducer } from "./reducers/userLogin";

const reducer = combineReducers({
  productList: productListsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

// GET all cart Items from local Storage

const cartsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// GET user info from local Storage

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const initialState = {
  cart: { cartItems: cartsFromLocalStorage },
  userLogin: { user: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
