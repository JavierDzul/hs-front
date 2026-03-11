import { useState, useCallback } from "react";
import CustomerPicker from "./components/CustomerPicker";
import ProductList from "./components/ProductList";
import CartView from "./components/CartView";
import CardValidator from "./components/CardValidator";
import { getCart, addToCart, removeFromCart, clearCart } from "./api";
import type { CartViewData } from "./types";
import "./App.css";

export default function App() {
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartViewData | null>(null);

  const refreshCart = useCallback(
    (cid: number) => {
      getCart(cid).then(setCart);
    },
    []
  );

  function handleSelectCustomer(cid: number) {
    setCustomerId(cid);
    refreshCart(cid);
  }

  function handleAddToCart(productId: number) {
    if (customerId === null) return;
    addToCart(customerId, productId, 1).then(setCart);
  }

  function handleRemove(productId: number) {
    if (customerId === null) return;
    removeFromCart(customerId, productId).then(setCart);
  }

  function handleClear() {
    if (customerId === null) return;
    clearCart(customerId).then(setCart);
  }

  return (
    <div className="app">
      <h1>🛒 Store</h1>
      <CustomerPicker selected={customerId} onSelect={handleSelectCustomer} />
      <ProductList customerId={customerId} onAddToCart={handleAddToCart} />
      <CartView cart={cart} onRemove={handleRemove} onClear={handleClear} />
      <CardValidator />
    </div>
  );
}