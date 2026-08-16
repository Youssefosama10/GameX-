"use client";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div className="qty-selector">
      <button
        type="button"
        className="qty-btn"
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="qty-value">{quantity}</span>
      <button
        type="button"
        className="qty-btn"
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
