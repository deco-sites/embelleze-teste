import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useEffect, useState } from "preact/hooks";

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
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

export default function Dots({ images, interval = 0 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const startInterval = () => {
    if (interval > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevCurrentIndex) =>
          (prevCurrentIndex + 1) % (images?.length || 0)
        );
      }, interval * 1000);

      return () => clearInterval(timer);
    }
  };

  const stopInterval = startInterval() as (() => void);

  useEffect(() => {
    startInterval();
  }, [interval]);

  useEffect(() => tranformButtons(currentIndex), [currentIndex]);

  const tranformButtons = (index: number) => {
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
    if (interval > 0) {
      stopInterval();
    }
  };

  return (
    <>
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4 flex m-auto">
        {images?.map((_, index) => (
          <li
            class="carousel-item"
            key={index}
            onClick={() => setCurrentIndex(index)}
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
