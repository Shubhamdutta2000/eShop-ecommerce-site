import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screen/HomeScreen";
import "./index.css";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import ShippingScreen from "./screen/ShippingScreen";
import PaymentMethod from "./screen/PaymentMethod";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import { useEffect } from "react";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./redux/actions/userAction";
import { verifyAuthToken } from "./api/authToken";

function App() {
  // MOBILE BREAKPOINT
  const isMobile = window.innerWidth <= 768;
  const API = process.env.REACT_APP_API;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // verify if auth token expired or not (if not logout)
  useEffect(() => {
    verifyAuthToken(userInfo && userInfo.token, dispatch, userLogout, API);
  }, [API, dispatch, userInfo]);

  return (
    <Router>
      <div className="body">
        <Header isMobile={isMobile} />
        <main>
          <Route
            path="/search"
            render={({ location }) => (
              <Home location={location} API={API} isMobile={isMobile} />
            )}
          />
          <Route
            path="/"
            render={({ location }) => (
              <Home location={location} API={API} isMobile={isMobile} />
            )}
            exact
          />
          <div className={!isMobile ? "mx-5 px-4 py-4" : "mx-3 px-3 py-4"}>
            <Route
              path="/placeorder"
              render={({ history }) => (
                <PlaceOrderScreen
                  history={history}
                  API={API}
                  isMobile={isMobile}
                />
              )}
            />
            <Route
              path="/orders/:id"
              render={({ history, match }) => (
                <OrderScreen
                  match={match}
                  history={history}
                  API={API}
                  isMobile={isMobile}
                />
              )}
            />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/paymentMethod" component={PaymentMethod} />
            <Route
              path="/login"
              render={({ location, history }) => (
                <LoginScreen location={location} history={history} API={API} />
              )}
            />
            <Route
              path="/register"
              render={({ location, history }) => (
                <RegisterScreen
                  location={location}
                  history={history}
                  API={API}
                />
              )}
            />
            <Route
              path="/profile"
              render={({ history }) => (
                <ProfileScreen history={history} API={API} />
              )}
            />
            <Route
              path="/products/:category/:id"
              render={({ history, match }) => (
                <ProductScreen
                  history={history}
                  API={API}
                  match={match}
                  isMobile={isMobile}
                />
              )}
            />
            <Route
              path="/cart/:category?/:id?"
              component={({ history, match, location }) => (
                <CartScreen
                  history={history}
                  match={match}
                  isMobile={isMobile}
                  API={API}
                  location={location}
                />
              )}
            />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
