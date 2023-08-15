import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { star, starVazia } from "./svg.tsx";

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

function TestimonialsMobile({ section }: Props) {
  const starArray = [1, 2, 3, 4, 5];

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
    const buttons = document.querySelectorAll("#carousel-button");
    buttons.forEach((button, buttonIndex) => {
      if (buttonIndex === index) {
        button.className = "w-6 h-2 rounded-full mx-1 bg-primary";
      } else {
        button.className = "w-2 h-2 rounded-full mx-1 bg-gray-300";
      }
    });
  };
  return (
    <>
      <div
        class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 min-h-[300px] h-64 flex items-end"
        id="carousel"
      >
        <div class="flex m-auto gap-4">
          {section?.map(({ image, alt, name, text, rating }) => (
            <div
              class="border border-purple-500 border-opacity-10 rounded-2xl h-72 w-[70vw] relative p-4 box-border flex flex-col gap-4 justify-between"
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
      </div>
      <span class="inline-block items-center self-center">
        {section.map((_, index) => (
          <button
            id="carousel-button"
            key={index}
            onClick={() => moveCarouselToIndex(index)}
            className={`${
              index === 0 ? "w-6 bg-primary" : "w-2 bg-gray-300"
            } h-2 rounded-full mx-1`}
          />
        ))}
      </span>
    </>
  );
}

export default TestimonialsMobile;
