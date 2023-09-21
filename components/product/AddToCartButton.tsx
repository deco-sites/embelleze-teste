import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";
import { useSignal } from "@preact/signals";

export interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const quantity = useSignal(1);

  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity: quantity.value,
  });

  return (
    <div class="flex justify-between items-center relative h-fit gap-4">
      <div class="border rounded-lg flex items-center justify-between flex-grow h-[43px] p-2">
        <button
          class="rounded-full bg-primary bg-opacity-10 w-6 h-6 text-primary"
          onClick={() =>
            quantity.value > 1 ? quantity.value-- : quantity.value = 1}
        >
          -
        </button>
        {quantity.value}
        <button
          class="rounded-full bg-primary bg-opacity-10 w-6 h-6 text-primary"
          onClick={() => quantity.value++}
        >
          +
        </button>
      </div>
      <Button
        data-deco="add-to-cart"
        {...props}
        class="btn-primary flex-grow-[2] max-h-8 min-h-[43px]"
      >
        Adicionar à Sacola
      </Button>
    </div>
  );
}

export default AddToCartButton;
