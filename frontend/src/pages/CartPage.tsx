import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Your cart is empty!
        </div>
      ) : (
        <>
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Price</th>
                <th className="text-end">Subtotal</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-end">${item.unitPrice.toFixed(2)}</td>
                  <td className="text-end">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="table-dark">
                <th colSpan={3}>Total</th>
                <th className="text-end">${total.toFixed(2)}</th>
                <th></th>
              </tr>
            </tfoot>
          </table>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
