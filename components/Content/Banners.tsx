import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Dots from "$store/components/Content/Dots.tsx";
import Image from "deco-sites/std/packs/image/components/Image.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  href: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  /** @description Logo Image for Lps */
  logo?: LiveImage;
  alt?: string;
  href?: string;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;

  return (
    <a
      href={href}
      class="relative h-fit max-h-[375px] overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={375}
          height={375}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={340}
        />
        <img
          class="object-cover w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Banners({ images, preload, interval, logo, alt, href }: Props) {
  const id = useId();
  return (
    <div
      id={id}
      class={`grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] h-fit  ${
        (images?.length ?? 0) > 1 ? "mb-[50px]" : ""
      } relative`}
    >
      {logo && (
        <div
          class="absolute inset-1 flex h-fit justify-center z-10"
          href={href}
        >
          <Image src={logo} alt={alt} width={140} height={50} />
        </div>
      )}

      <Slider
        class="carousel carousel-center w-full col-span-full row-span-full gap-6"
        id="carousel-banner"
      >
        {images?.map((image, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-full carousel-banner-item"
          >
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      {(images?.length ?? 0) > 1 && (
        <div class="absolute -bottom-10 left-1/2 right-1/2 z-10 w-fit">
          <Dots
            images={images}
          />
        </div>
      )}

      <SliderJS
        rootId={id}
        interval={interval && interval * 1e3}
        infinite
      />
    </div>
  );
}

export default Banners;
