import { useEffect, useState } from "react";
import { getCustomers } from "../api";
import type { Customer } from "../types";

interface Props {
  selected: number | null;
  onSelect: (id: number) => void;
}

export default function CustomerPicker({ selected, onSelect }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  return (
    <section>
      <h2>Customer</h2>
      <div className="button-row">
        {customers.map((c) => (
          <button
            key={c.customerId}
            className={selected === c.customerId ? "active" : ""}
            onClick={() => onSelect(c.customerId)}
          >
            {c.customerName}
          </button>
        ))}
      </div>
    </section>
  );
}