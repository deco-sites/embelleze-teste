import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  href: string;
}

function MainBanner({ alt, mobile, href, desktop }: Props) {
  return (
    <div>
      <a
        href={href}
        class="relative h-[230px] w-[100vw] md:h-[340px] max-w-[1300px] "
      >
        <Picture preload={false}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={"auto"}
            src={mobile}
            width={375}
            height={230}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={"auto"}
            src={desktop}
            width={1440}
            height={340}
          />
          <img
            class="flex m-auto object-fill w-full h-full md:w-11/12 md:rounded-3xl max-w-[1300px]"
            loading={"lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

export default MainBanner;
