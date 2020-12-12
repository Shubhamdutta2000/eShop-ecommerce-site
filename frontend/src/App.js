import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Home from "./screen/Home";
import "./index.css";

function App() {
  return (
    <>
      <div className="body">
        <Header />
        <main className="py-4">
          <Container>
            <Home />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
