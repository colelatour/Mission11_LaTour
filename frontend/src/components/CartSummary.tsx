import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Floating cart button shown on the book list page
const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      className="btn btn-outline-dark position-fixed top-0 end-0 m-3 d-flex align-items-center gap-2 shadow-sm"
      style={{ zIndex: 1050 }}
      onClick={() => navigate("/cart")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
      Cart
      {totalItems > 0 && (
        <span className="badge rounded-pill bg-primary">{totalItems}</span>
      )}
      <span className="fw-semibold">${totalAmount.toFixed(2)}</span>
    </button>
  );
};

export default CartSummary;
