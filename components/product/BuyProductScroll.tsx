import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Image from "apps/website/components/Image.tsx";
import ClipBord from "$store/components/ui/ClipBord.tsx";
import Component from "$store/islands/WishlistButton.tsx";
import { useRef } from "preact/hooks";

function BuyProductScroll({ product }: { product: Product }) {
  const { name, offers, productID, brand, image: images, isVariantOf } =
    product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );

  const [image] = images ?? [];

  const buyScroll = useRef<HTMLDivElement>(null);

  addEventListener("scroll", () => {
    const isElementAboveViewport = window.scrollY >= 600;
    if (isElementAboveViewport && window.innerWidth > 767) {
      buyScroll.current!.style.display = "flex";
    } else {
      buyScroll.current!.style.display = "none";
    }
  });

  return (
    <div
      class="hidden fixed items-center justify-center z-50 bg-gray-100 flex-col gap-2 p-4 w-10/12 bottom-10 left-1/2 transform -translate-x-1/2 rounded-2xl max-w-[800px]"
      ref={buyScroll}
    >
      <div class="flex justify-between gap-2">
        <div class="flex justify-start gap-4 items-center w-full">
          <Image
            src={image.url ?? ""}
            width={105}
            class="h-[105px] object-contain"
          />
          <div class="flex flex-col">
            <span class="text-sm text-gray-500 font-bold">
              {brand?.name}
            </span>
            <span class="font-bold text-sm text-primary">{name}</span>
          </div>
        </div>

        <div class="block h-[auto] w-[2px] bg-black"></div>

        <div class="flex flex-col w-full gap-4">
          <div class="flex justify-between gap-4">
            <div>
              <div class="flex flex-row gap-2 items-center">
                <span class="font-bold text-xl text-primary">
                  {formatPrice(price, offers!.priceCurrency!)}
                </span>
                <span class="line-through text-base-300 text-xs">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              </div>
              <span class="text-sm text-base-300">
                {installments}
              </span>
            </div>

            <div class="flex gap-2 justify-start items-center">
              <Component
                variant="full"
                productGroupID={isVariantOf?.productGroupID}
                productID={productID}
              />
              <ClipBord />
            </div>
          </div>
          {availability === "https://schema.org/InStock"
            ? (
              <>
                {seller && (
                  <AddToCartButton
                    skuId={productID}
                    sellerId={seller}
                    price={price ?? 0}
                    discount={price && listPrice ? listPrice - price : 0}
                    name={product.name ?? ""}
                    productGroupId={product.isVariantOf?.productGroupID ?? ""}
                    quantity={1}
                  />
                )}
              </>
            )
            : <OutOfStock productID={productID} />}
        </div>
      </div>
    </div>
  );
}

export default BuyProductScroll;
