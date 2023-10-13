import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Item {
  title: string;
  image: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor?: string;
  title?: string;
  description?: string;
  sections: {
    section: Array<Item>;
    /**
     * @description You only need to add this field if you put more than one section
     */
    category?: string;
  }[];
  /**
   * @format color
   * @default #FFFFF
   */
  borderColor: string;
  /**
   * @format color
   * @default #FFFFF
   */
  textColor: string;
  /**
   * @format color
   * @default #FFFFF
   */
  categoryBg?: string;
  /**
   * @format color
   * @default #FFFFF
   */
  categoryText?: string;
}

function Section(
  { borderColor, href, image, alt, textColor, title }: {
    borderColor: string;
    href: string;
    image: string;
    alt: string;
    textColor: string;
    title: string;
  },
) {
  return (
    <div
      class="border rounded-t-full rounded-b-2xl h-[182px] w-36 md:h-56 md:w-48 p-2 hover:shadow-xl hover:-translate-y-4 transition duration-300 relative"
      style={{ borderColor }}
    >
      <a href={href} class="flex flex-col justify-between items-center">
        <Image
          src={image}
          alt={alt}
          class="rounded-full mb-2"
          width={162}
          height={162}
        />
        <h2
          class="md:text-base text-xs uppercase text-center font-bold"
          style={{ color: textColor }}
        >
          {title}
        </h2>
      </a>
    </div>
  );
}

function Carousel(
  {
    sections,
    title,
    description,
    borderColor,
    textColor,
    titleColor,
    categoryBg,
    categoryText,
  }: Props,
) {
  const id = useId();

  return (
    <section class="flex justify-between m-auto md:w-85 w-11/12 flex-col">
      {title && (
        <h2
          class="text-3xl uppercase text-center font-bold"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
      )}
      {description && <p class="text-sm text-center">{description}</p>}
      {sections.length > 1
        ? (
          <div id={id} class="relative">
            <div class="flex justify-center items-center flex-wrap gap-4">
              <Slider.PrevButton
                class="hidden lg:flex items-center prev-btn absolute 2xl:-left-14 -left-11 bottom-1/2 top-1/2 m-auto transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2 justify-center"
                disabled
              >
                <Icon id="ChevronLeft" width={10} height={16} />
              </Slider.PrevButton>
              {sections.map(({ category }, index) => (
                <Slider.Dot index={index}>
                  <div
                    class={`p-2 border bg-primary text-white rounded-lg hover:bg-secondary-focus hover:text-secondary-content`}
                    style={{
                      backgroundColor: categoryBg,
                      color: categoryText,
                    }}
                  >
                    {category}
                  </div>
                </Slider.Dot>
              ))}
            </div>
            <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 min-h-[240px] h-64 flex items-end">
              {sections.map(({ section }, index) => (
                <Slider.Item
                  index={index}
                  class="flex m-auto gap-4"
                >
                  <>
                    {section.map(({ title, image, alt, href }) => (
                      <Section
                        title={title}
                        image={image}
                        alt={alt}
                        href={href}
                        borderColor={borderColor}
                        textColor={textColor}
                      />
                    ))}
                  </>
                </Slider.Item>
              ))}
            </Slider>

            <Slider.NextButton
              class="hidden lg:flex items-center next-btn absolute 2xl:-right-14 -right-11 bottom-0 top-0 m-auto transform -translate-y-1/2 text-primary bg-primary-content rounded-full text-4xl h-10 w-10 p-2 justify-center"
              disabled={(sections?.length ?? 0) < 2}
            >
              <Icon id="ChevronRight" width={10} height={16} />
            </Slider.NextButton>
            <SliderJS rootId={id} />
          </div>
        )
        : (
          <div class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 min-h-[240px] h-64 flex items-end">
            <div class="flex m-auto gap-4">
              {sections[0].section.map(({ title, image, alt, href }) => (
                <Section
                  title={title}
                  image={image}
                  alt={alt}
                  href={href}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              ))}
            </div>
          </div>
        )}
    </section>
  );
}

export default Carousel;
