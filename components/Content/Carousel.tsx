import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Section {
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
  section: Array<Section>;
  /**
   * @format color
   * @default #FFFFFF
   */
  borderColor: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  textColor: string;
}

function Carousel(
  { section, title, description, borderColor, textColor, titleColor }: Props,
) {
  return (
    <section class="flex justify-between m-auto md:w-85 w-11/12 flex-col">
      {title && (
        <h2
          class="text-2xl uppercase text-center"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
      )}
      {description && <p class="text-sm text-center">{description}</p>}
      <div class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 min-h-[240px] h-64 flex items-end">
        <div class="flex m-auto gap-4">
          {section.map(({ title, image, alt, href }) => (
            <div
              class="border rounded-t-full rounded-b-2xl h-56 w-48 p-2 hover:shadow-xl hover:-translate-y-4 transition duration-300 relative"
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
                  class="text-base uppercase text-center"
                  style={{ color: textColor }}
                >
                  {title}
                </h2>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
