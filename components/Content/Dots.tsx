import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import preact from "preact/hooks";

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
}

export default function Dots({ images }: Props) {
  return (
    <>
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4 flex m-auto">
        {images?.map((_, index) => (
          <li
            class="carousel-item"
            key={index}
          >
            <Slider.Dot index={index}>
              <div
                className={`${
                  index === 0 ? "w-6 bg-primary" : "w-2 bg-gray-300"
                } h-2 rounded-full mx-1 carousel-button`}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}
