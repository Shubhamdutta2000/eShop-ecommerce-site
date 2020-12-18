import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//// Reducers
import { productList } from "./reducers/productLists";
import { productDetails } from "./reducers/productDetails";

const reducer = combineReducers({
  productList: productList,
  productDetails: productDetails,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
