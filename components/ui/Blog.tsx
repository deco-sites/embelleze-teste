import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface Image {
  /**
   * @description This field is a constant. Is here only to help you to now the type. Don't change
   * @default Image
   */
  type: string;
  img: LiveImage;
  alt: string;
  alignment: "left" | "right";
  isBigImage: boolean;
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor: string;
  title: string;
  text: string;
}

export interface BigImage {
  /**
   * @description This field is a constant. Is here only to help you to now the type. Don't change
   * @default BigImage
   */
  type: string;
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
}

export interface Text {
  /**
   * @description This field is a constant. Is here only to help you to now the type. Don't change
   * @default Text
   */
  type: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor: string;
  title: string;
  message: string;
}

export type ContentType = Image | Text | BigImage;

export interface Props {
  section: { type: ContentType }[];
}

function Blog({ section }: Props) {
  return (
    <div class="bg-gray-100 flex flex-col m-auto w-11/12 p-4 gap-8">
      {section.map(({ type }) => {
        switch (true) {
          case (type as Image).type === "Image": {
            const { text, alignment, alt, img, titleColor, title, isBigImage } =
              type as Image;
            return (
              <div class="flex justify-center lg:justify-between gap-4 flex-wrap lg:flex-nowrap">
                <div class="flex flex-col items-start justify-center gap-4 w-fit">
                  <h2
                    style={{ color: titleColor }}
                    class="uppercase text-2xl font-medium"
                  >
                    {title}
                  </h2>
                  <p>{text}</p>
                </div>
                <Image
                  src={img}
                  width={isBigImage ? 565 : 250}
                  alt={alt}
                  height={375}
                  class={`${
                    alignment === "left" ? "-order-1" : "lg:order-5"
                  } rounded-lg -order-1`}
                />
              </div>
            );
          }

          case (type as Text).type === "Text": {
            const { title, message, titleColor } = type as Text;
            return (
              <div class="flex flex-col items-start justify-center gap-4 w-fit">
                <h2
                  style={{ color: titleColor }}
                  class="uppercase text-2xl font-medium"
                >
                  {title}
                </h2>
                <p>{message}</p>
              </div>
            );
          }

          case (type as BigImage).type === "BigImage": {
            const { mobile, alt, desktop } = type as BigImage;
            return (
              <div class="relative h-[577px] w-full">
                <Picture preload={false}>
                  <Source
                    media="(max-width: 767px)"
                    fetchPriority={"auto"}
                    src={mobile}
                    width={375}
                    height={577}
                  />
                  <Source
                    media="(min-width: 768px)"
                    fetchPriority={"auto"}
                    src={desktop}
                    width={1172}
                    height={577}
                  />
                  <img
                    class="flex m-auto object-fill w-full h-full rounded-lg"
                    loading={"lazy"}
                    src={desktop}
                    alt={alt}
                  />
                </Picture>
              </div>
            );
          }

          default:
            return <></>; // Lidar com tipos desconhecidos ou inválidos
        }
      })}
    </div>
  );
}

export default Blog;
