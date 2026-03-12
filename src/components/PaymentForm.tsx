import { useState } from "react";
import { submitPayment } from "../api";
import type { PaymentResult } from "../types";

interface Props {
  customerId: number | null;
  cartIsEmpty: boolean;
  onPaymentComplete: () => void;
}

export default function PaymentForm({
  customerId,
  cartIsEmpty,
  onPaymentComplete,
}: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(false);

  function handlePay() {
    if (customerId === null || !cardNumber.trim()) return;
    setLoading(true);
    setResult(null);
    submitPayment(customerId, cardNumber)
      .then((res) => {
        setResult(res);
        if (res.paymentSuccess) {
          setCardNumber("");
          onPaymentComplete();
        }
      })
      .finally(() => setLoading(false));
  }

  const disabled = customerId === null || cartIsEmpty || loading;

  return (
    <section>
      <h2>Payment</h2>
      <div className="card-form">
        <input
          type="text"
          placeholder="4111 1111 1111 1111"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <button disabled={disabled} onClick={handlePay}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
      {result && (
        <p className={result.paymentSuccess ? "valid" : "invalid"}>
          {result.paymentSuccess ? "✓" : "✗"} {result.paymentMessage}
          {result.paymentSuccess &&
            ` — $${(result.paymentTotalInCents / 100).toFixed(2)} charged`}
        </p>
      )}
    </section>
  );
}