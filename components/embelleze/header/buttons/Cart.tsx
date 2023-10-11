import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import IconShoppingBag from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/shopping-bag.tsx";

export default function CartButton() {
  const { displayCart, displayMenu } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    displayMenu.value = false;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <div class="indicator">
      {totalItems && (
        <span class="indicator-item badge badge-secondary badge-sm">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
      <Button
        class="btn-circle btn-sm btn-ghost bg-primary-content p-1 w-9 h-9"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading.value}
        onClick={onClick}
      >
        <IconShoppingBag class="w-6 h-6 text-base-300" />
      </Button>
    </div>
  );
}
