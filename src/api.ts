import type {
  Customer,
  Product,
  CartViewData,
  CardValidationResult,
  PaymentResult,
} from "./types";

const BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }
  return response.json();
}

// Customers

export function getCustomers(): Promise<Customer[]> {
  return request("/customers");
}

// Products

export function getProducts(): Promise<Product[]> {
  return request("/products");
}

export function applyDiscount(
  productId: number,
  discountPercent: number
): Promise<Product> {
  return request(`/products/${productId}/discount`, {
    method: "POST",
    body: JSON.stringify({ requestedDiscount: discountPercent }),
  });
}

// Cart

export function getCart(customerId: number): Promise<CartViewData> {
  return request(`/customers/${customerId}/cart`);
}

export function addToCart(
  customerId: number,
  productId: number,
  quantity: number
): Promise<CartViewData> {
  return request(`/customers/${customerId}/cart/add`, {
    method: "POST",
    body: JSON.stringify({ addProductId: productId, addQuantity: quantity }),
  });
}

export function removeFromCart(
  customerId: number,
  productId: number
): Promise<CartViewData> {
  return request(`/customers/${customerId}/cart/remove`, {
    method: "POST",
    body: JSON.stringify({ removeProductId: productId }),
  });
}

export function clearCart(customerId: number): Promise<CartViewData> {
  return request(`/customers/${customerId}/cart/clear`, {
    method: "POST",
  });
}

// Card validation

export function validateCard(
  cardNumber: string
): Promise<CardValidationResult> {
  return request("/validate-card", {
    method: "POST",
    body: JSON.stringify({ cardNumber }),
  });
}

// Payment

export function submitPayment(
  customerId: number,
  cardNumber: string
): Promise<PaymentResult> {
  return request("/payment", {
    method: "POST",
    body: JSON.stringify({
      paymentCustomerId: customerId,
      paymentCardNumber: cardNumber,
    }),
  });
}