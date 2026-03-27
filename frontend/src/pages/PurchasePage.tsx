import { useNavigate, useParams, useLocation } from "react-router-dom";
import Welcome from "../components/Welcome";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const location = useLocation();

  // Preserve the page the user came from so "Continue Shopping" returns them there
  const returnPage = (location.state as { fromPage?: number })?.fromPage ?? 1;

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || "No Title Found",
      unitPrice: Number(price),
      quantity: 1,
    };
    addToCart(newItem);
    // Pass the page number to the cart so "Continue Shopping" can restore it
    navigate("/cart", { state: { fromPage: returnPage } });
  };

  return (
    <div className="container py-5">
      <Welcome />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm text-center">
            <div className="card-body p-4">
              <h4 className="card-title mb-2">Add to Cart?</h4>
              <p className="text-muted mb-1">{title}</p>
              <p className="fs-5 fw-semibold mb-4">${Number(price).toFixed(2)}</p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-success px-4"
                >
                  Yes, Add to Cart
                </button>
                <button
                  className="btn btn-outline-danger px-4"
                  onClick={() => navigate("/books", { state: { fromPage: returnPage } })}
                >
                  No, Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
