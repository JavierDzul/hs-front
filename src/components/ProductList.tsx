import { useEffect, useState } from "react";
import { getProducts, applyDiscount } from "../api";
import type { Product } from "../types";

interface Props {
  customerId: number | null;
  onAddToCart: (productId: number) => void;
}

export default function ProductList({ customerId, onAddToCart }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [discountInputs, setDiscountInputs] = useState<Record<number, string>>(
    {}
  );

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  function handleApplyDiscount(productId: number) {
    const raw = discountInputs[productId] ?? "";
    const value = parseInt(raw, 10);
    if (isNaN(value)) return;

    applyDiscount(productId, value).then((updated) => {
      setProducts((prev) =>
        prev.map((p) => (p.productId === updated.productId ? updated : p))
      );
    });
  }

  return (
    <section>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Set Discount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.productId}>
              <td>{p.productName}</td>
              <td>${(p.priceInCents / 100).toFixed(2)}</td>
              <td>{p.discountPercent}%</td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="%"
                  value={discountInputs[p.productId] ?? ""}
                  onChange={(e) =>
                    setDiscountInputs((prev) => ({
                      ...prev,
                      [p.productId]: e.target.value,
                    }))
                  }
                />
                <button onClick={() => handleApplyDiscount(p.productId)}>
                  Apply
                </button>
              </td>
              <td>
                <button
                  disabled={customerId === null}
                  onClick={() => onAddToCart(p.productId)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}