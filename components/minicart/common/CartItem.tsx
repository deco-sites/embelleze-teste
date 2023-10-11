import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="flex flex-col md:grid md:grid-rows-1 md:gap-2 bg-gray-100 md:bg-transparent p-[10px] rounded-lg"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <div class="flex justify-between items-start">
      <Image
        {...image}
        style={{ aspectRatio: "120 / 120" }}
        width={120}
        height={120}
        class="h-full object-contain rounded-lg"
      />
      <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square block md:hidden"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <Icon id="Trash" size={24} class="text-secondary" />
          </Button>
            </div> 
      <span class="font-bold block md:hidden">{name}</span>

      <div class="flex flex-col gap-2">
        <div class="justify-between items-center hidden md:flex">
          <span class="font-bold">{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <Icon id="Trash" size={24} class="text-secondary" />
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-primary">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
          {
            /* <span class="line-through text-base-300 text-sm">
            {formatPrice(list, currency, locale)}
          </span> */
          }
        </div>

        <QuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const analyticsItem = itemToAnalyticsItem(index);
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analyticsItem) {
              analyticsItem.quantity = diff;

              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: { items: [analyticsItem] },
              });
            }
          })}
        />
      </div>
    </div>
  );
}

export default CartItem;
