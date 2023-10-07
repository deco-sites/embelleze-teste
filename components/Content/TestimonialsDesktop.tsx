import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { star, starVazia } from "./svg.tsx";
import { useEffect, useState } from "preact/hooks";
import { Section } from "$store/components/Content/EmbellezeTestimonials.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  title?: string;
  description?: string;
  section: Array<Section>;
  isStore?: boolean;
}

function TestimonialsDesktop({ section, isStore }: Props) {
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
    <div class="relative">
      <button
        class="flex items-center prev-btn absolute -left-12 bottom-1/2 top-1/2 transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
        onClick={prevSlide}
      >
        {"<"}
      </button>
      <div
        class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 h-fit flex items-end"
        id="carousel"
      >
        <div class=" flex gap-4 carousel-content transition-transform duration-300 ease-in-out w-full">
          {newSections.map((section, index) => (
            <div
              key={index}
              class="flex justify-between gap-4 carousel-item w-full"
              id="carousel-item"
            >
              {section?.map((
                { comments, user: { name }, opinion, rate: rating },
              ) => (
                <div
                  class={`border border-purple-500 border-opacity-10 rounded-2xl ${
                    isStore ? "h-auto" : "h-[400px]"
                  } w-[70vw] relative p-4 box-border flex flex-col gap-4 justify-start`}
                  id="carousel-item"
                >
                  <div
                    class={`flex flex-col gap-4 justify-between ${
                      comments.length > 0 ? "h-[200px]" : "h-full"
                    }`}
                  >
                    <div class="flex justify-between items-center">
                      <div class="h-[40px] w-[40px]">
                        <Icon id="Opiniao" />
                      </div>
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
                    </div>
                    <p class="text-start">
                      {opinion !== undefined
                        ? opinion
                        : "Cliente não escreveu uma avaliação, apenas deu a nota."}
                    </p>
                    <h2 class="text-primary text-base uppercase text-end">
                      {name}
                    </h2>
                  </div>
                  {comments.length > 0 && (
                    <>
                      <div
                        class="inline-block h-[1px] w-full"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
                      >
                      </div>
                      <div>
                        <div class="flex justify-start items-center gap-2">
                          <Icon id="EmbellezeLogo" size={40} />
                          <h2 class="font-bold">
                            Resposta da Embelleze:
                          </h2>
                        </div>
                        {comments.length > 0 ? comments[0].text : ""}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          class="flex items-center next-btn absolute -right-12 bottom-1/2 top-1/2 transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default TestimonialsDesktop;
