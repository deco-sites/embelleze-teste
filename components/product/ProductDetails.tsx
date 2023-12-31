import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Component from "$store/islands/WishlistButton.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import Image from "deco-sites/std/components/Image.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ClipBord from "$store/components/ui/ClipBord.tsx";
import ProductAbout from "$store/components/product/ProductAbout.tsx";
import Opinioes from "deco-sites/fashion/components/product/Opinioes.tsx";
import Beneficios, {
  Props as IBeneficios,
} from "deco-sites/fashion/components/ui/Beneficios.tsx";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import BuyTogether from "./BuyTogether.tsx";
"$store/components/product/ProductAbout.tsx";
import BuyProductScroll from "$store/components/product/BuyProductScroll.tsx";
import Rating from "$store/islands/Rating.tsx";

export interface Props {
  page: ProductDetailsPage | null;
  beneficios: IBeneficios;
  buyTogether: Product[] | null;
}

const WIDTH = 500;
const HEIGHT = 560;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
    additionalProperty,
    aggregateRating,
    brand,
  } = product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );

  return (
    <>
      {/* Breadcrumb */}
      <div class="order-1 row-span-1 row-start-1 pb-2 lg:col-start-3 h-fit flex flex-col gap-4">
        {/* Code and name */}
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 font-bold">
              {brand?.name}
            </span>
            <Rating />
          </div>
          <h1>
            <span class="font-bold text-xl text-primary">{name}</span>
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: description ?? "",
            }}
          />
        </div>

        <div class="flex justify-between gap-2 flex-row w-full items-center">
          <div class="flex justify-start gap-2 flex-wrap flex-grow items-center">
            {additionalProperty?.filter(({ description }) =>
              description === "highlight"
            ).map(({ value }) => (
              <span class="bg-primary p-2 rounded-lg text-white text-sm font-medium max-h-7 uppercase flex items-center justify-center">
                {value}
              </span>
            ))}
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
        {/* Prices */}
      </div>

      <div class="order-3 row-span-3 lg:col-start-3 row-start-3 lg:row-span-2 h-fit">
        <div class="hidden md:block">
          <div class="flex flex-row gap-2 items-center">
            <span class="font-bold text-xl text-primary">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
            <span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>
          </div>
          <span class="text-sm text-base-300">
            ou {installments}
          </span>
        </div>

        <div
          class="hidden lg:inline-block h-[1px] w-full"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
        >
        </div>

        {/* Sku Selector */}
        <div class="">
          <ProductSelector product={product} />
        </div>
        {/* Add to Cart and Favorites button */}
        <div class="flex-col gap-2 hidden md:flex">
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
        {/* Shipping Simulation */}
        <div class="py-4">
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller ?? "1",
            }]}
          />
        </div>

        <div
          class="hidden lg:inline-block h-[1px] w-full"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
        >
        </div>
        {/* Description card */}
        {
          /* <div class="">
          <span class="text-sm">
            {description && (
              <details>
                <summary class="cursor-pointer">Descrição</summary>
                <div class="ml-2 mt-2">{description}</div>
              </details>
            )}
          </span>
        </div> */
        }
      </div>

      <BuyProductScroll product={product} />

      <div
        class="fixed bottom-0 z-10 bg-white flex flex-col gap-2 p-4 w-full left-0 md:hidden"
        style={{ borderTop: "3px solid rgba(0, 0, 0, 0.12)" }}
      >
        <div class="flex justify-between gap-2">
          <h2 class="max-w-[161px]">
            <span class="font-medium text-sm text-primary">{name}</span>
          </h2>

          <div class="block h-[auto] w-[2px] bg-black"></div>

          <div>
            <div class="flex flex-row gap-2 items-center">
              <span class="font-medium text-xl text-secondary">
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
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};
  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  beneficios,
  buyTogether,
}: {
  page: ProductDetailsPage;
  beneficios: IBeneficios;
  buyTogether: Product[] | null;
}) {
  const { product } = page;
  const id = useId();
  const images = product.image ?? [];
  const { price = 1, listPrice = 1 } = useOffer(product.offers);

  const percent = Math.floor(
    ((listPrice - price) / listPrice) * 100,
  );
  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  return (
    <>
      <div class="flex flex-col w-11/12 m-auto relative max-w-[1300px]">
        <Breadcrumb
          itemListElement={page.breadcrumbList?.itemListElement.slice(0, -1)}
        />
        <div
          id={id}
          class="flex flex-col xl:grid xl:grid-cols-[auto] xl:grid-rows-[auto] xl:justify-between w-full h-fit gap-y-8 xl:gap-x-8 xl:gap-y-0"
        >
          {/* Image Slider */}
          <div class="order-2 relative row-span-2 sm:col-start-2 sm:row-start-1 sm:row-end-3 h-fit xl:max-w-[680px] xl:w-[600px] w-full">
            <Slider class="carousel carousel-center gap-6 w-full">
              {images?.map((img, index) => {
                return (
                  <Slider.Item
                    index={index}
                    class={`carousel-item border relative md:w-[500px] w-fit `}
                  >
                    <Image
                      class="w-full h-full object-cover"
                      sizes="(max-width: 640px) 100vw, 40vw"
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    {index === 0 && percent > 0 && (
                      <p class="absolute left-4 top-4 uppercase bg-secondary text-white p-2 rounded-lg">
                        {`${percent}% off`}
                      </p>
                    )}
                  </Slider.Item>
                );
              })}
            </Slider>
            {images.length > 1 &&
              (
                <>
                  <Slider.PrevButton
                    class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
                    disabled
                  >
                    <Icon size={24} id="ChevronLeft" strokeWidth={3} />
                  </Slider.PrevButton>

                  <Slider.NextButton
                    class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
                    disabled={(images?.length ?? 0) < 2}
                  >
                    <Icon size={24} id="ChevronRight" strokeWidth={3} />
                  </Slider.NextButton>
                </>
              )}
          </div>

          {/* Dots */}
          <ul class="carousel-vertical overflow-auto hidden h-[500px] w-fit xl:block lg:justify-start lg:flex-col lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-end-3">
            {images.map((img, index) => (
              <li class="max-h-fit w-[90px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border rounded "
                    width={63}
                    height={87.5}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>

          {/* Product Info */}
          <ProductInfo page={page} />
        </div>
      </div>

      <Beneficios {...beneficios} />

      {buyTogether && buyTogether?.length > 0 && (
        <BuyTogether products={buyTogether} />
      )}

      <div class="flex flex-col w-11/12 m-auto relative">
        <div class="max-w-[772px] m-auto flex flex-col gap-6 items-center  py-8">
          <h2 class="uppercase text-primary font-bold text-2xl">
            SOBRE O PRODUTO
          </h2>
          <div
            class="text-center"
            dangerouslySetInnerHTML={{
              __html: product.description ?? "",
            }}
          />
          <ProductAbout
            additionalProperty={product.isVariantOf?.additionalProperty}
          />
        </div>
        <Opinioes
          productId={product.isVariantOf?.productGroupID ?? ""}
          productName={product.name ?? ""}
          urlImage={product.url ?? ""}
        />
        <SliderJS rootId={id}></SliderJS>
      </div>
    </>
  );

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
}

function ProductDetails({ page, beneficios, buyTogether }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  return (
    <div>
      {page
        ? (
          <Details
            page={page}
            beneficios={beneficios}
            buyTogether={buyTogether}
          />
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
