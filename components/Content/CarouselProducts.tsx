import Image from "apps/website/components/Image.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { useEffect, useState } from "preact/hooks";
import { useId } from "$store/sdk/useId.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

export interface Props {
  header?: {
    title: string;
    description?: string;
  };
  list1: Array<Product[] | null>;
  categories?: Array<string>;
  mobileBigCard: boolean;
  hide?: {
    skuSelector?: boolean;
    navButtons?: boolean;
  };
  cardImage?: LiveImage;
  alt?: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  buttonColor: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  color: string;
}

export function PCard(
  { product, mobileBigCard, color, buttonColor }: {
    product: Product;
    mobileBigCard: boolean;
    color: string;
    buttonColor: string;
  },
) {
  const {
    url,
    name,
    image: images,
    offers,
    brand,
    sku,
    // category,
    additionalProperty,
  } = product;
  const { listPrice, price, installments, seller } = useOffer(offers);
  const [front] = images ?? [];

  const props = useAddToCart({
    skuId: sku,
    sellerId: seller,
    discount: price && listPrice ? listPrice - price : 0,
    price: price ?? 10000,
    productGroupId: product.isVariantOf?.productGroupID ?? "",
    name: name ?? "",
    quantity: 1,
  });

  return (
    <div class="PCARD h-full w-full relative">
      <div class="flex flex-col justify-center gap-2 flex-wrap flex-grow items-center absolute top-4 left-4 z-10">
        {additionalProperty?.filter(({ description }) =>
          description === "highlight"
        ).map(({ value }) => (
          <span class="bg-primary p-2 rounded-lg text-white text-sm font-medium max-h-7 uppercase flex items-center justify-center">
            {value}
          </span>
        ))}
      </div>
      <div
        class={`py-2 flex hover:shadow-2xl transition flex-col justify-between ${
          mobileBigCard ? "max-w-60" : "max-w-40"
        } border-[2px] border-[#552B9A1A] border-opacity-10 border-solid rounded-[10px] relative h-full `}
      >
        <div class="px-2 rounded-[10px] h-full flex-col justify-between flex">
          <a href={url}>
            <figure class="flex object-contain w-[200px] h-[260px] items-center justify-center mx-auto">
              <Image
                class="h-[200px] object-contain"
                src={front.url!}
                alt={name}
                loading="lazy"
                width={200}
                fit="contain"
              />
            </figure>
          </a>
          <p class="font-[700] pb-3" style={{ color }}>{brand?.name}</p>
          {name && (
            <>
              <p class="block md:hidden text-[12px] text-[#00000080]">
                {`${name.length <= 45 ? name : name.slice(0, 42)}...`}
              </p>
              <p class="hidden md:block text-[12px] text-[#00000080] h-10">
                {`${name.length <= 70 ? name : name.slice(0, 60)}...`}
              </p>
            </>
          )}
          <div class="block md:hidden">
            <span class="flex items-center gap-2 mt-2">
              {listPrice && (
                <p class="line-through text-[#00000066] text-sm">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </p>
              )}
              {price && listPrice && (
                <p class="bg-secondary text-white rounded-lg font-medium text-xs py-1 px-2">
                  {(((listPrice - price) / listPrice) * 100).toString().split(
                    ".",
                  )[0]}% OFF
                </p>
              )}
            </span>
            <p class="font-[700] text-lg rounded-[10px]" style={{ color }}>
              {formatPrice(price, offers!.priceCurrency!)}
            </p>
          </div>
          <div class="md:flex hidden items-center gap-3">
            <p class="font-[700] text-lg rounded-[10px]" style={{ color }}>
              {formatPrice(price, offers!.priceCurrency!)}
            </p>
            <span class="flex items-center gap-3 mt-2">
              {listPrice && (
                <p class="line-through text-[#00000066] text-sm">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </p>
              )}
              {price && listPrice && (
                <p class="bg-secondary text-white rounded-lg font-medium text-xs py-1 px-2">
                  {(((listPrice - price) / listPrice) * 100).toString().split(
                    ".",
                  )[0]}% OFF
                </p>
              )}
            </span>
          </div>

          <p class="text-[12px] pb-2 text-[#00000066]">ou {installments}</p>
          <a href={url}>
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .buyButton:hover {
                  color: white !important;
                }
              `,
              }}
            />
            <Button
              data-deco="add-to-cart"
              {...props}
              class="btn-primary buyButton hover:bg-[#17A087] border-2 hover:text-white flex-grow-1 max-h-8 min-h-[35px] uppercase border-solid bg-white w-full rounded-[5px]"
              style={{ borderColor: buttonColor, color: buttonColor }}
            >
              Adicionar à sacola
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCarousel(
  {
    header,
    list1,
    categories,
    mobileBigCard,
    hide,
    cardImage,
    alt,
    color,
    buttonColor,
  }: Props,
) {
  const [currentIndex1, setCurrentIndex] = useState(0);
  const id = useId();
  const moveCarouselToIndex = (index: number) => {
    const carouselContainer = document.querySelector(
      "#carousel-product" + id,
    ) as
      | HTMLElement
      | null;
    const itemWidth = carouselContainer?.querySelectorAll(
      `${list1.length > 1 ? "#carousel-item-product" : ".PCARD"}`,
    )[index]
      ?.clientWidth ?? 0;

    console.log({ index, itemWidth, carouselContainer });

    const newPosition = itemWidth * index;
    if (carouselContainer) {
      carouselContainer.scrollTo({
        left: newPosition,
        behavior: "smooth", // Use 'auto' para scroll instantÃ¢neo
      });
    }
  };

  const prevSlide = () => {
    const length = (list1.length > 1 ? list1.length : list1[0]?.length) ?? 1;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  const nextSlide = () => {
    const length = (list1.length > 1 ? list1.length : list1[0]?.length) ?? 1;
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % length;
    });
  };

  useEffect(() => {
    moveCarouselToIndex(currentIndex1);
  }, [currentIndex1]);

  return (
    <div class="py-8 w-11/12 m-auto max-w-[1300px]">
      <div class="flex flex-col gap-6 lg:gap-8 text-base-content lg:py-5 relative">
        {hide?.navButtons ? <></> : (
          <button
            class="hidden lg:flex items-center prev-btn absolute 2xl:-left-14 -left-11 bottom-0 top-0 m-auto transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
            onClick={prevSlide}
          >
            {"<"}
          </button>
        )}
        <div class="flex items-center justify-center flex-col ">
          <h3
            class={`${
              header?.title ? "block" : "hidden"
            } text-center text-[1.5em] font-semibold md:text-[35px] uppercase`}
            style={{ color }}
          >
            {header?.title}
          </h3>
          <p
            class={`${
              header?.title ? "block" : "hidden"
            } text-[#00000099] text-center text-base`}
          >
            {header?.description}
          </p>
        </div>
        {categories && (
          <div
            class={"carousel carousel-start md:m-auto lg:flex-wrap flex items-center gap-4"}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                class={`${
                  currentIndex1 === index
                    ? "bg-secondary text-white"
                    : "bg-secondary-content text-primary"
                } uppercase rounded-lg py-[10px] px-4 text-sm font-[700] carousel-item`}
                onClick={() => setCurrentIndex(index)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        <div
          class={`carousel carousel-start gap-4 lg:gap-6 w-full h-[551px]`}
          id={"carousel-product" + id}
        >
          {list1?.map((product, index) => (
            <div
              class="flex gap-8 carousel-item h-[480px]"
              id={"carousel-item-product"}
              key={index + "subdiv"}
            >
              {!!cardImage && (
                <Image src={cardImage} alt={alt} width={317} height={481} />
              )}
              {product?.map((a, i) => (
                <div class="w-[284px]">
                  <PCard
                    product={a}
                    mobileBigCard={mobileBigCard}
                    key={i}
                    color={color}
                    buttonColor={buttonColor}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        {hide?.skuSelector
          ? <></>
          : (
            <div class="items-center justify-center m-auto lg:hidden flex">
              {list1.length > 1
                ? list1.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`${
                      index === currentIndex1
                        ? "w-6 bg-primary"
                        : "w-2 bg-gray-300"
                    } h-2 rounded-full mx-1`}
                  />
                ))
                : list1[0]?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`${
                      index === currentIndex1
                        ? "w-6 bg-primary"
                        : "w-2 bg-gray-300"
                    } h-2 rounded-full mx-1`}
                  />
                ))}
            </div>
          )}
        {hide?.navButtons ? <></> : (
          <button
            class="hidden lg:flex items-center next-btn absolute 2xl:-right-14 -right-11 bottom-0 top-0 m-auto transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
            onClick={nextSlide}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCarousel;
