import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold" to="/">
        Cole's Book Store
      </Link>
      <div className="navbar-nav ms-auto gap-2">
        <Link className="nav-link" to="/books">
          Books
        </Link>
        <Link className="nav-link" to="/adminbooks">
          Admin
        </Link>
        <Link className="nav-link d-flex align-items-center gap-1" to="/cart">
          Cart
          {totalItems > 0 && (
            <span className="badge rounded-pill bg-primary">{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
