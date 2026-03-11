import type { CartViewData } from "../types";

interface Props {
  cart: CartViewData | null;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

export default function CartView({ cart, onRemove, onClear }: Props) {
  if (!cart) {
    return (
      <section>
        <h2>Cart</h2>
        <p>Select a customer to see their cart.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Cart (Customer {cart.cartCustomerId})</h2>
      {cart.cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Discount</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.map((line) => (
                <tr key={line.lineProductId}>
                  <td>{line.lineProductName}</td>
                  <td>{line.lineQuantity}</td>
                  <td>${(line.lineSubtotalInCents / 100).toFixed(2)}</td>
                  <td>-${(line.lineDiscountInCents / 100).toFixed(2)}</td>
                  <td>${(line.lineTotalInCents / 100).toFixed(2)}</td>
                  <td>
                    <button onClick={() => onRemove(line.lineProductId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-totals">
            <p>
              Subtotal: ${(cart.cartSubtotalInCents / 100).toFixed(2)}
            </p>
            <p>
              Discount: -${(cart.cartDiscountInCents / 100).toFixed(2)}
            </p>
            <p className="cart-total">
              Total: ${(cart.cartTotalInCents / 100).toFixed(2)}
            </p>
          </div>
          <button onClick={onClear}>Clear Cart</button>
        </>
      )}
    </section>
  );
}