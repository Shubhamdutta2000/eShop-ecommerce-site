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

function App() {
  // MOBILE BREAKPOINT
  const isMobile = window.innerWidth <= 768;

  return (
    <Router>
      <div className="body">
        <Header />
        <main>
          <Route path="/search" component={Home} />
          <Route path="/" component={Home} exact />
          <div className={!isMobile ? "mx-5 px-4 py-4" : "mx-2 px-2 py-4"}>
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/orders/:id" component={OrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/paymentMethod" component={PaymentMethod} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/products/:category/:id" component={ProductScreen} />
            <Route path="/cart/:category?/:id?" component={CartScreen} />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
