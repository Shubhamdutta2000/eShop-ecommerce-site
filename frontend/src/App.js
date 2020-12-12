import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Home from "./screen/HomeScreen";
import "./index.css";
import ProductScreen from "./screen/ProductScreen";

function App() {
  return (
    <Router>
      <div className="body">
        <Header />
        <main className="py-4">
          <Container>
            <Route path="/" component={Home} exact />
            <Route path="/products/:category/:id" component={ProductScreen} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
