import "./App.css";
import BooksPage from "./pages/BooksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchasePage from "./pages/PurchasePage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      {/* CartProvider wraps the app so cart state persists across all pages */}
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/purchase/:title/:bookID/:price"
              element={<PurchasePage />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
