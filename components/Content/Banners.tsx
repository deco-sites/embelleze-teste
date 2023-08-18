import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Dots from "$store/components/Content/Dots.tsx";
import { useEffect, useRef, useState } from "preact/hooks";

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
      href={`/s?q=${href}`}
      class="relative h-[375px] overflow-y-hidden w-full"
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
          class="object-fill w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Banners({ images, preload, interval }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeoutId = useRef<number | null>(null);

  const moveCarouselToIndex = (index: number) => {
    // if (index > (images?.length || 0 - 1)) {
    //   index = (currentIndex + 1) % (images?.length || 0);
    // }

    const buttons = document.querySelectorAll(".carousel-button");
    buttons.forEach((button, buttonIndex) => {
      if (buttonIndex === index) {
        button.className =
          "carousel-button w-6 h-2 rounded-full mx-1 bg-primary";
      } else {
        button.className =
          "carousel-button w-2 h-2 rounded-full mx-1 bg-gray-300";
      }
    });
  };

  useEffect(() => {
    moveCarouselToIndex(currentIndex);
  }, [currentIndex]);

  const id = useId();
  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] h-[450px]"
    >
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

      <Dots
        images={images}
        setCurrentIndex={setCurrentIndex}
      />

      <SliderJS
        rootId={id}
        interval={interval && interval * 1e3}
        infinite
      />
    </div>
  );
}

export default Banners;
