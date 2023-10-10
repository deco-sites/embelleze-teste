import { Product } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Image from "apps/website/components/Image.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";
import { useId } from "$store/sdk/useId.ts";
import { useRef } from "preact/hooks";
import { useAddToCart } from "$store/sdk/embelleze/addBuyTogetherCart.tsx";
import { Options } from "$store/sdk/embelleze/addBuyTogetherCart.tsx";
import Button from "$store/components/ui/Button.tsx";

export interface Props {
  products: Product[] | null;
}

function ProductCard({ product }: { product: Product }) {
  {
    const {
      name,
      image: images,
      offers,
      brand,
      sku,
    } = product;
    const { listPrice, price, installments } = useOffer(offers);
    const { productsBuyTogether } = useUI();
    const input = useRef<HTMLInputElement>(null);

    const [image] = images ?? [];
    const id = useId();

    return (
      <div class="flex flex-col gap-4">
        <div class="flex justify-between bg-white max-w-[374.67px] flex-grow items-center gap-4 rounded-2xl p-3">
          <Image
            src={image.url ?? ""}
            width={105}
            class="h-[105px] object-contain"
          />
          <div>
            <h2 class="text-primary font-bold uppercase">{brand?.name}</h2>
            {name && (
              <>
                <p class="block md:hidden text-[12px] text-[#00000099] font-bold">
                  {`${name.length <= 45 ? name : name.slice(0, 42)}...`}
                </p>
                <p class="hidden md:block text-[12px] text-[#00000099] font-bold h-10">
                  {`${name.length <= 50 ? name : name.slice(0, 50)}...`}
                </p>
              </>
            )}
            <div class="flex justify-start gap-4 items-center">
              <p class="font-[700] text-lg rounded-[10px] text-primary">
                {formatPrice(price, offers!.priceCurrency!)}
              </p>
              <span class="flex items-center gap-2">
                {price && listPrice &&
                  (((listPrice - price) / listPrice) * 100) > 0 && (
                  <p class="bg-secondary text-white rounded-lg font-medium text-xs py-1 px-2">
                    {(((listPrice - price) / listPrice) * 100).toString().split(
                      ".",
                    )[0]}% OFF
                  </p>
                )}
              </span>
            </div>
            <p class="text-[12px] pb-2 text-[#00000066] font-semibold">
              ou {installments}
            </p>
          </div>
        </div>
        <label
          htmlFor={id}
          class={`${
            input && input.current?.checked
              ? " bg-secondary text-white"
              : "bg-white border border-secondary text-secondary"
          } flex flex-grow justify-center rounded-lg gap-4 p-2 font-semibold`}
        >
          <input
            type="checkbox"
            id={id}
            ref={input}
            onChange={() => {
              const isProduct = productsBuyTogether.value.some((
                { sku: psku },
              ) => psku === sku);

              if (isProduct) {
                productsBuyTogether.value = productsBuyTogether.value.filter((
                  { sku: psku },
                ) => psku !== sku);
              } else {
                productsBuyTogether.value = [
                  ...productsBuyTogether.value,
                  product,
                ];
              }
              console.log(productsBuyTogether.value);
            }}
          />
          <span>
            {input && input.current?.checked ? "SELECIONADO" : "SELECIONAR"}
          </span>
        </label>
      </div>
    );
  }
}

function BuyTogether({ products }: Props) {
  const { productsBuyTogether } = useUI();
  const totalPrice = productsBuyTogether.value.reduce((acc, curr) => {
    const { price } = useOffer(curr.offers);
    console.log(price);
    acc += price ?? 0;
    return acc;
  }, 0);

  function transformArray(arr: Product[]) {
    return arr.map((obj) => {
      const { seller } = useOffer(obj.offers);
      const transformedObj = {
        seller,
        id: obj.sku,
        ...obj,
      };
      return transformedObj;
    });
  }

  const props = useAddToCart({
    orderItems: transformArray(
      productsBuyTogether.value,
    ) as unknown as Options[],
  });
  return (
    <div class="bg-gray-100 flex flex-col justify-center items-center gap-4 max-w-[1300px] m-auto w-11/12 p-8 rounded-lg">
      <h2 class="text-primary uppercase font-bold text-2xl">
        quem comprou, levou junto:
      </h2>
      <div class="flex justify-between gap-4 flex-wrap xl:flex-row flex-col items-center">
        {products?.map((product) => <ProductCard product={product} />)}
      </div>
      <span class="flex gap-2 items-center">
        <p class="uppercase font-bold">total:</p>
        <p class="text-primary font-bold text-2xl">
          {`${formatPrice(totalPrice, "BRL") ?? "R$ 0,00"}`}
        </p>
      </span>
      <Button
        data-deco="add-to-cart"
        {...props}
        class="btn-primary bg-[#17A087] flex-grow-[2] max-h-8 min-h-[43px] uppercase border-none rounded-lg"
      >
        {`Adicionar (${productsBuyTogether.value.length}) itens no carrinho`}
      </Button>
    </div>
  );
}

export default BuyTogether;
