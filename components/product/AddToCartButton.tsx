import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";

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
    <>
      <div>
        <button>
          <Icon id="Minus" size={30} />
        </button>
        {quantity}
        <button>
          <Icon id="Plus" size={30} />
        </button>
      </div>
      <Button data-deco="add-to-cart" {...props} class="btn-primary">
        Adicionar à Sacola
      </Button>
    </>
  );
}

export default AddToCartButton;
