import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Home from "./screen/HomeScreen";
import "./index.css";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";

function App() {
  return (
    <Router>
      <div className="body">
        <Header />
        <main className="mx-5 px-4 py-4">
          <Route path="/" component={Home} exact />
          <Route path="/products/:category/:id" component={ProductScreen} />
          <Route path="/cart/:category?/:id?" component={CartScreen} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
