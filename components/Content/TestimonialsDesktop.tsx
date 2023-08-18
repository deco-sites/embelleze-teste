import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { star, starVazia } from "./svg.tsx";
import { useEffect, useState } from "preact/hooks";

export interface Section {
  image: LiveImage;
  alt: string;
  name: string;
  text: string;
  /**
   * @description Stars Rating. You can SCALE from 0 to 5.
   */
  rating: number;
}

export interface Props {
  title?: string;
  description?: string;
  section: Array<Section>;
}

function TestimonialsDesktop({ section }: Props) {
  const starArray = [1, 2, 3, 4, 5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const divideEmSubarrays = (
    array: Array<Section>,
    tamanhoSubarray: number,
  ) => {
    return Array.from(
      { length: Math.ceil(array.length / tamanhoSubarray) },
      (_, index) =>
        array.slice(index * tamanhoSubarray, (index + 1) * tamanhoSubarray),
    );
  };

  const newSections = divideEmSubarrays(section, 3);

  const moveCarouselToIndex = (index: number) => {
    const carouselContainer = document.querySelector("#carousel") as
      | HTMLElement
      | null;
    const itemWidth =
      carouselContainer?.querySelector("#carousel-item")?.clientWidth ?? 0;
    const newPosition = itemWidth * index;

    if (carouselContainer) {
      carouselContainer.scrollTo({
        left: newPosition,
        behavior: "smooth", // Use 'auto' para scroll instantâneo
      });
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + newSections.length) % newSections.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newSections.length);
  };

  useEffect(() => {
    moveCarouselToIndex(currentIndex);
  }, [currentIndex]);

  return (
    <>
      <button
        class="flex items-center prev-btn absolute -left-12 bottom-[90px] transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
        onClick={prevSlide}
      >
        {"<"}
      </button>
      <div
        class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 min-h-[300px] h-64 flex items-end"
        id="carousel"
      >
        <div class=" flex gap-4 carousel-content transition-transform duration-300 ease-in-out w-full">
          {newSections.map((section, index) => (
            <div
              key={index}
              class="flex justify-between gap-4 carousel-item w-full"
              id="carousel-item"
            >
              {section?.map(({ image, alt, name, text, rating }) => (
                <div
                  class="border border-purple-500 border-opacity-10 rounded-2xl h-60 w-96 relative p-4 box-border flex flex-col gap-4 justify-between"
                  id="carousel-item"
                >
                  <span class="flex justify-between items-center">
                    <img src={image} alt={alt} />
                    <div class="flex items-center">
                      {starArray.map((value) => (
                        <span
                          key={value}
                          class="inline-block w-5 h-5 mr-1"
                        >
                          {value <= rating ? star : starVazia}
                        </span>
                      ))}
                    </div>
                  </span>
                  <p class="text-start">{text}</p>
                  <h2 class="text-primary text-base uppercase text-end">
                    {name}
                  </h2>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          class="flex items-center next-btn absolute -right-12 bottom-[90px] transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>
    </>
  );
}

export default TestimonialsDesktop;
