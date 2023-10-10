import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/embelleze/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <Button
              class="btn-outline"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full py-2"
            >
              {items.map((item, index) => (
                <li key={index} class="flex flex-col gap-4 w-11/12 m-auto">
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                  <div class="block h-[2px] w-full bg-black opacity-10" />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-11/12 flex flex-col m-auto">
              {/* Subtotal */}
              <div class="block h-[2px] w-full bg-black opacity-10" />

              <div class="py-2 flex flex-col">
                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between px-4 text-sm">
                  <span class="uppercase font-bold text-[#00000099] opacity-70">Subtotal:</span>
                  <span class="px-4 text-primary font-bold text-xl">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
                <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
              </div>

              <div class="block h-[2px] w-full bg-black opacity-10" />

              {/* Total */}
              <div class="pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                <div class="flex justify-between items-center w-full">
                  <span class="uppercase font-bold text-[#00000099] opacity-70">Total</span>
                  <span class="font-bold text-xl text-primary">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                <span class="text-sm text-base-300">
                  Taxas e fretes serão calculados no checkout
                </span>
              </div>

              <div class="p-4 flex flex-col gap-4">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="bg-[#17A087] btn-block text-white"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    FINALIZAR COMPRA
                  </Button>
                </a>
                <Button
                    data-deco="buy-button"
                    class="text-[#17A087] btn-block bg-white border border-[#17A087]"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      displayCart.value = false
                    }}
                  >
                    CONTINUAR COMPRANDO
                  </Button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
