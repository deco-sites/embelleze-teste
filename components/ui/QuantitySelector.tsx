import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="flex justify-start gap-2 items-center">
      <p class="text-gray-600 uppercase font-semibold">quantidade:</p>
    <div class="inline-flex border rounded-lg max-w-[116px] items-center min-h-[43px] p-2">
      <button
        class="bg-[#EFEAF6] rounded-full h-6 w-6"
        onClick={decrement}
        disabled={disabled}
        >
        -
      </button>
      <input
        class="text-center [appearance:textfield]"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
        />
      <button
        class="bg-[#EFEAF6] rounded-full h-6 w-6"
        onClick={increment}
        disabled={disabled}
        >
        +
      </button>
    </div>
        </div>
  );
}

export default QuantitySelector;
