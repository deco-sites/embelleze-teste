import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  image: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  images?: Banner[];
  isCarrousel: boolean;
  title?: string;
  description?: string;
}

function Images({ images, isCarrousel, title, description }: Props) {
  return (
    <section class="flex m-auto w-11/12 flex-col gap-4 py-4">
      {title && (
        <h2 class="text-primary text-2xl uppercase text-center">{title}</h2>
      )}
      {description && <p class="text-sm text-center">{description}</p>}
      {isCarrousel
        ? (
          <div class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 flex items-end flex-nowrap md:justify-between md:flex-wrap m-auto md:py-4">
            {images?.map(({ image, alt, href }) => (
              <a href={href} width={382} height={246} class="relative">
                <img
                  src={image}
                  alt={alt}
                  class="object-fill min-w-[70vw] min-h-[246px] md:min-w-[382px] rounded-2xl hover:opacity-"
                />
              </a>
            ))}
          </div>
        )
        : (
          <div class="flex justify-between flex-wrap w-full m-auto gap-4 py-4">
            {images?.map(({ image, alt, href }) => (
              <a href={href} width={382} height={246}>
                <img src={image} alt={alt} />
              </a>
            ))}
          </div>
        )}
    </section>
  );
}

export default Images;
