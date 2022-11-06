import { useEffect } from 'react';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import { USER_CHECK_TOKEN_RESET } from './redux/actionTypes/userConstants';
import { checkUserAuthToken, userLogout } from './redux/actions/userAction';
import CartScreen from './screen/CartScreen';
import Home from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import OrderListScreen from './screen/OrderListScreen';
import OrderScreen from './screen/OrderScreen';
import PaymentMethod from './screen/PaymentMethod';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import ProductListScreen from './screen/ProductListScreen';
import ProductScreen from './screen/ProductScreen';
import ProfileScreen from './screen/ProfileScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingScreen from './screen/ShippingScreen';
import UserEditScreen from './screen/UserEditScreen';
// for admin user
import UserListScreen from './screen/UserListScreen';
///  STYLE   ///
import './styles/styles.css';

function App() {
  // MOBILE BREAKPOINT
  const isMobile = window.innerWidth <= 768;
  const API = process.env.REACT_APP_API;

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { error } = useSelector(state => state.userAuthToken);

  // verify if auth token expired or not
  useEffect(() => {
    dispatch(checkUserAuthToken(API));
  }, [API, dispatch, userInfo]);

  // if jwt token expired then logged out
  useEffect(() => {
    if (userInfo && error === 'jwt expired') {
      alert('Logged out!! Again login to do shopping!!');
      dispatch(userLogout());
      dispatch({ type: USER_CHECK_TOKEN_RESET });
    }
  }, [dispatch, userInfo, error]);

  return (
    <Router>
      <div className="body">
        <Header isMobile={isMobile} />
        <main className="screens">
          <Route
            path="/search"
            render={({ location, history }) => (
              <Home location={location} API={API} isMobile={isMobile} history={history} />
            )}
          />
          <Route
            path="/"
            render={({ location }) => (
              <Home location={location} API={API} isMobile={isMobile} />
            )}
            exact
          />
          <div className={!isMobile ? 'mx-5 px-4 py-4' : 'mx-3 px-3 py-4'}>
            <Route
              path="/placeorder"
              render={({ history }) => (
                <PlaceOrderScreen history={history} API={API} isMobile={isMobile} />
              )}
            />
            <Route
              path="/orders/:id"
              render={({ history, match }) => (
                <OrderScreen match={match} history={history} API={API} isMobile={isMobile} />
              )}
            />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/paymentMethod" component={PaymentMethod} />
            <Route
              path="/login"
              render={({ location, history }) => (
                <LoginScreen
                  isMobile={isMobile}
                  location={location}
                  history={history}
                  API={API}
                />
              )}
            />
            <Route
              path="/register"
              render={({ location, history }) => (
                <RegisterScreen
                  isMobile={isMobile}
                  location={location}
                  history={history}
                  API={API}
                />
              )}
            />
            <Route
              path="/profile"
              render={({ history }) => <ProfileScreen history={history} API={API} />}
            />
            <Route
              path="/products/:category/:id"
              render={({ history, match }) => (
                <ProductScreen history={history} API={API} match={match} isMobile={isMobile} />
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

            <Route
              path="/admin/userlist"
              component={({ history }) => <UserListScreen history={history} API={API} />}
            />
            <Route
              path="/admin/user/:id/edit"
              component={({ history, match }) => (
                <UserEditScreen history={history} match={match} API={API} />
              )}
            />

            <Route
              path="/admin/productlist"
              component={({ history }) => <ProductListScreen history={history} API={API} />}
            />

            <Route
              path="/admin/product/:category/:id/edit"
              component={({ history, match }) => (
                <ProductEditScreen history={history} match={match} API={API} />
              )}
            />

            <Route
              path="/admin/orderlist"
              component={({ history }) => <OrderListScreen history={history} API={API} />}
            />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
