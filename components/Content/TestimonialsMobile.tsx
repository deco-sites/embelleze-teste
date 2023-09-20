import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { star, starVazia } from "./svg.tsx";
import { Section } from "$store/components/Content/EmbellezeTestimonials.tsx";
import Icon from "$store/components/ui/Icon.tsx";

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
        class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 h-fit flex items-end"
        id="carousel"
      >
        <div class="flex m-auto gap-4">
          {section?.map((
            { user: { name }, opinion, rate: rating, comments },
          ) => (
            <div
              class="border border-purple-500 border-opacity-10 rounded-2xl h-fit w-[60vw] max-w-[400px] relative p-4 box-border flex flex-col gap-4 justify-start"
              id="carousel-item"
            >
              <div class="flex flex-col gap-4 justify-between h-fit">
                <div class="flex justify-between items-center h-fit">
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
                    : "Cliente não escreveu uma avaliação, apenas deu a nota do produto."}
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
