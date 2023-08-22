import Image from "deco-sites/std/components/Image.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  header?: {
    title: string;
    description?: string;
  };
  list1: Array<Product[] | null>;
  categories?: Array<string>;
  mobileBigCard: boolean;
}

function PCard(
  { product, mobileBigCard }: { product: Product; mobileBigCard: boolean },
) {
  const {
    url,
    name,
    image: images,
    offers,
    brand,
    // category,
  } = product;
  const { listPrice, price, installments } = useOffer(offers);
  const [front] = images ?? [];

  return (
    <div>
      <div
        class={`py-2 flex hover:shadow-2xl transition flex-col md:w-[260px] ${
          mobileBigCard ? "w-[75vw]" : "w-40"
        } border-r-[2px] border-t-[2px] shadow-xl border-primary-content border-solid rounded-[10px] relative`}
      >
        <div class="px-2 rounded-[10px]">
          <figure>
            <Image
              class="w-full"
              src={front.url!}
              alt={name}
              width={140}
              height={175}
              loading="lazy"
            />
          </figure>
          <p class="font-[700] text-primary pb-3">{brand?.name}</p>
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
            <p class="text-primary font-[700] text-lg rounded-[10px]">
              {formatPrice(price, offers!.priceCurrency!)}
            </p>
          </div>
          <div class="md:flex hidden items-center gap-3">
            <p class="text-primary font-[700] text-lg rounded-[10px]">
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
          <a href={url} class="md:hidden"> 
            <button class="w-full py-1 uppercase rounded-[5px] border-[#17A087] text-[#17A087] border-2 border-solid hover:text-white hover:bg-[#17A087]">
            Comprar
            </button>
          </a>
          <a href={url} class="hidden md:block">
          <button class="w-full py-1 uppercase rounded-[5px] border-[#17A087] text-[#17A087] border-2 border-solid hover:text-white hover:bg-[#17A087]">
            Adicionar ao carrinho
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCarousel({ header, list1, categories, mobileBigCard }: Props) {
  const [currentIndex1, setCurrentIndex] = useState(0);

  const moveCarouselToIndex = (index: number) => {
    const carouselContainer = document.querySelector(
      "#carousel-product" + header?.title[0],
    ) as
      | HTMLElement
      | null;
    const itemWidth = carouselContainer?.querySelector("#carousel-item-product")
      ?.clientWidth ?? 0;
    const newPosition = itemWidth * index;
    if (carouselContainer) {
      carouselContainer.scrollTo({
        left: newPosition,
        behavior: "smooth", // Use 'auto' para scroll instantÃ¢neo
      });
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + list1.length) % list1.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % list1.length;
    });
  };

  useEffect(() => {
    moveCarouselToIndex(currentIndex1);
  }, [currentIndex1]);

  return (
    <div class="w-full px-4 py-8 lg:w-11/12 m-auto lg:px-14 relative">
      <div class="flex flex-col gap-6 lg:gap-8 text-base-content lg:py-5">
        <button
          class="hidden lg:flex items-center prev-btn absolute left-4 bottom-0 top-0 m-auto transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
          onClick={prevSlide}
        >
          {"<"}
        </button>
        <div class="flex items-center justify-center flex-col ">
          <h3
            class={`${
              header?.title ? "block" : "hidden"
            } text-primary text-center text-[1.5em] font-semibold md:text-[35px] uppercase`}
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
          <div class={"justify-center m-auto flex items-center gap-4" }>
            {categories.map((category, index) => (
              <button
                key={category}
                class={`${
                  currentIndex1 === index
                    ? "bg-secondary text-white"
                    : "bg-secondary-content text-primary"
                } uppercase rounded-lg py-[10px] px-4 text-sm font-[700]`}
                onClick={() => setCurrentIndex(index)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        <div
          class={`carousel carousel-start gap-4 lg:gap-6 row-start-2 row-end-5 w-full ${mobileBigCard ? 'h-[36rem]' : 'h-[27rem]'} md:h-[33rem] border-2 border-red-600 border-solid`}
          id={"carousel-product" + header?.title[0]}
        >
          {list1?.map((product, index) => (
            <div
              class="flex gap-4 carousel-item last:pr-6 lg:pl-0"
              id={"carousel-item-product"}
              key={index + "subdiv"}
            >
              {product?.map((a, i) => (
                <PCard product={a} mobileBigCard={mobileBigCard} key={i} />
              ))}
            </div>
          ))}
        </div>
        <div class="items-center justify-center m-auto lg:hidden flex">
          {list1.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${
                index === currentIndex1 ? "w-6 bg-primary" : "w-2 bg-gray-300"
              } h-2 rounded-full mx-1`}
            />
          ))}
        </div>
        <button
          class="hidden lg:flex items-center next-btn absolute right-2 bottom-0 top-0 m-auto transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default ProductCarousel;
