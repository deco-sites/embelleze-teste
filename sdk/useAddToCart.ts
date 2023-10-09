import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useUI } from "deco-sites/fashion/sdk/embelleze/useUI.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";

export interface Options {
  skuId: string;
  sellerId?: string;
  price: number;
  discount: number;
  /**
   * sku name
   */
  name: string;
  productGroupId: string;
  quantity: number;
}

export const useAddToCart = (
  { skuId, sellerId, price, discount, name, productGroupId, quantity }: Options,
) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItems } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sellerId) {
      return;
    }

    try {
      isAddingToCart.value = true;
      await addItems({
        orderItems: [{ id: skuId, seller: sellerId, quantity: quantity }],
      });

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            item_id: productGroupId,
            quantity,
            price,
            discount,
            item_name: name,
            item_variant: skuId,
          }],
        },
      });

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [skuId, sellerId, quantity]);

  return { onClick, loading: isAddingToCart.value };
};
