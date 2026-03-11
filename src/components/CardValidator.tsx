import { useState } from "react";
import { validateCard } from "../api";
import type { CardValidationResult } from "../types";

export default function CardValidator() {
  const [cardNumber, setCardNumber] = useState("");
  const [result, setResult] = useState<CardValidationResult | null>(null);

  function handleValidate() {
    if (!cardNumber.trim()) return;
    validateCard(cardNumber).then(setResult);
  }

  return (
    <section>
      <h2>Validate Card</h2>
      <div className="card-form">
        <input
          type="text"
          placeholder="4111 1111 1111 1111"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <button onClick={handleValidate}>Validate</button>
      </div>
      {result && (
        <p className={result.cardIsValid ? "valid" : "invalid"}>
          {result.cardIsValid ? "✓ Valid" : "✗ Invalid"}: {result.cardReason}
        </p>
      )}
    </section>
  );
}