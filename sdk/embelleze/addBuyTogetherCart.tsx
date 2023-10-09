import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useUI } from "deco-sites/fashion/sdk/embelleze/useUI.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";

export interface Options {
  /**
   * skuId
   */
  id: string;
  /**
   * sellerId
   */
  seller?: string;
  quantity: number;

  price: number;
  discount: number;
  /**
   * sku name
   */
  name: string;
  productGroupId: string;
}

export interface Props {
  orderItems: Options[];
}

export const useAddToCart = (
  { orderItems }: Props,
) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItems } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log({ orderItems });
    if (orderItems.length <= 0) {
      return;
    }

    try {
      isAddingToCart.value = true;
      await addItems({
        orderItems: orderItems.map(({ id, seller = "", quantity = 1 }) => ({
          id,
          seller,
          quantity,
        })),
        // orderItems: [{ id, seller, quantity }],
      });

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [
            //   {
            //   // item_id: productGroupId,
            //   // quantity,
            //   // price,
            //   // discount,
            //   // item_name: name,
            //   // item_variant: skuId,
            // }
          ],
        },
      });

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [orderItems]);

  return { onClick, loading: isAddingToCart.value };
};
