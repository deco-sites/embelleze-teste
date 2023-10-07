import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Banner {
  image: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  images?: Banner[];
  isCarrousel: boolean;
  title?: string;
  instagramUser?: string;
  description?: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  backgroundColor?: string;
}

function Images(
  { images, isCarrousel, title, description, backgroundColor, instagramUser }: Props,
) {
  return (
    <section
      class="flex m-auto w-11/12 flex-col gap-4 p-4 rounded-lg"
      style={{ backgroundColor }}
    >
      {title && (
        <h2 class="text-primary text-3xl font-bold uppercase text-center">{instagramUser && <span class="text-secondary">{instagramUser + ' '}</span>}{title}</h2>
      )}
      {description && <p class="text-base text-center">{description}</p>}
      {isCarrousel
        ? (
          <div class="carousel gap-4 row-start-2 row-end-5 items-end md:py-4 w-full">
            {images?.map(({ image, alt, href }) => (
              <a
                href={href}
                width={280}
                height={280}
                class="relative carousel-item"
              >
                <Image
                  width={280}
                  height={280}
                  src={image}
                  alt={alt}
                  class="object-fill h-[280px] rounded-2xl w-full"
                />
              </a>
            ))}
          </div>
        )
        : (
          <div class="flex justify-between flex-wrap w-full m-auto gap-4 py-4 relative">
            {images?.map(({ image, alt, href }) => (
              <a
                href={href}
                class="flex justify-center w-full md:w-[47%] h-full rounded-lg"
              >
                <Image
                  width={574}
                  height={355}
                  src={image}
                  alt={alt}
                  class="rounded-lg w-full"
                />
              </a>
            ))}
          </div>
        )}
    </section>
  );
}

export default Images;
