export interface Customer {
  customerId: number;
  customerName: string;
}

export interface Product {
  productId: number;
  productName: string;
  priceInCents: number;
  discountPercent: number;
}

export interface CartLine {
  lineProductId: number;
  lineProductName: string;
  linePriceInCents: number;
  lineDiscountPercent: number;
  lineQuantity: number;
  lineSubtotalInCents: number;
  lineDiscountInCents: number;
  lineTotalInCents: number;
}

export interface CartViewData {
  cartCustomerId: number;
  cartItems: CartLine[];
  cartSubtotalInCents: number;
  cartDiscountInCents: number;
  cartTotalInCents: number;
}

export interface CardValidationResult {
  cardIsValid: boolean;
  cardReason: string;
}

export interface PaymentResult {
  paymentSuccess: boolean;
  paymentMessage: string;
  paymentTotalInCents: number;
}