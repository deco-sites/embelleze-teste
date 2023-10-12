import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { SectionProps } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { Props as CarouselProps } from "$store/components/Content/Carousel.tsx";
import Carousel from "$store/components/Content/Carousel.tsx";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /**
   * @format textarea
   * @format html
   * @description text to be rendered on top of the image */
  subtitle?: string;
  image?: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt?: string;
  };
  carousel?: CarouselProps;
}

function Banner({ banner }: SectionProps<ReturnType<typeof loader>>) {
  if (!banner) {
    return null;
  }

  const { title, subtitle, image } = banner;

  return (
    <div class="flex flex-col justify-between gap-6">
      {image && <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={360}
          height={120}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={200}
          media="(min-width: 767px)"
        />
        <img class="w-full" src={image.desktop} alt={image.alt ?? title} />
      </Picture>}

      <div class="w-11/12 flex flex-col items-center justify-center m-auto gap-4">
        <h1>
          <p class="text-3xl font-bold text-primary uppercase text-center">
            {title && title}
          </p>
        </h1>
        <h2>
          <div
            class="text-xl font-medium text-center max-w-[820px]"
            dangerouslySetInnerHTML={{ __html: subtitle ?? "" }}
          />
        </h2>
        <a href="#CategoryText">
          <button class="border p-2 rounded-lg px-4 font-semibold">
            VER MAIS +
          </button>
        </a>
      </div>
      {banner.carousel && <Carousel {...banner.carousel} />}
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = ({ banners = [] }: Props, req: Request) => {
  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
