import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import VideoComponent from "deco-sites/fashion/components/embelleze/content/Video.tsx";

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
  /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  text: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  ButtonColor?: string;
  buttonText?: string;
  href?: string;
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
  /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  message: string;
}

export interface Video {
  /**
   * @description This field is a constant. Is here only to help you to now the type. Don't change
   * @default Video
   */
  type: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  color: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  ButtonColor: string;
  videos: {
    videoId: string;
    isCollum: boolean;
    title?: string;
    /**
     * @format textarea
     * @format html
     * @description text to be rendered */
    text?: string;
    href?: string;
    buttonText?: string;
  }[];
}

export type ContentType = Image | Text | BigImage | Video;

export interface Props {
  section: { type: ContentType }[];
  /**
   * @format color
   * @default #FFFF
   */
  backgroundColor?: string;
}

function Blog({ section, backgroundColor }: Props) {
  return (
    <div
      class="bg-gray-100 flex flex-col m-auto w-11/12 p-4 gap-8 max-w-[1300px] my-16"
      style={{ backgroundColor }}
    >
      {section.map(({ type }) => {
        switch (true) {
          case (type as Image).type === "Image": {
            const {
              text,
              alignment,
              alt,
              img,
              titleColor,
              title,
              isBigImage,
              ButtonColor,
              buttonText,
              href,
            } = type as Image;
            return (
              <div class="flex justify-center lg:justify-between gap-4 flex-wrap lg:flex-nowrap">
                <div class="flex flex-col items-start justify-center gap-4 w-fit">
                  <h2
                    style={{ color: titleColor }}
                    class="uppercase text-2xl font-bold"
                  >
                    {title}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: text,
                    }}
                  />
                  {buttonText && (
                    <a
                      class="text-white p-3 rounded-xl"
                      style={{ backgroundColor: ButtonColor }}
                      href={href}
                    >
                      {buttonText}
                    </a>
                  )}
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
                  class="uppercase text-2xl font-bold"
                >
                  {title}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: message,
                  }}
                />
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

          case (type as Video).type === "Video": {
            const { videos, color, ButtonColor } = type as Video;
            return (
              <div class={`flex justify-between gap-4 flex-wrap`}>
                {videos.map((
                  { videoId, buttonText, text, title, href, isCollum },
                ) => (
                  <div
                    class={`flex ${
                      isCollum ? "flex-col items-center" : ""
                    } justify-center md:justify-between gap-4 flex-wrap md:flex-nowrap ${
                      title && text
                        ? "w-full"
                        : `w-full ${isCollum ? "" : "md:w-[48%]"}`
                    }`}
                  >
                    <div
                      class={`${
                        title && text
                          ? `w-full ${isCollum ? "" : "md:w-[48%]"} h-[355px]`
                          : `w-full`
                      } ${isCollum ? "h-[462px]" : "h-[355px]"}`}
                      style={{ maxWidth: "830px" }}
                    >
                      <VideoComponent videoId={videoId} />
                    </div>
                    {title && text && (
                      <div
                        class={`flex flex-col items-center justify-center gap-4 w-full ${
                          isCollum ? "" : "md:w-[48%]"
                        }`}
                      >
                        <h2
                          style={{ color }}
                          class="uppercase text-2xl font-bold"
                        >
                          {title}
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: text,
                          }}
                        />
                        {buttonText && (
                          <a
                            class="text-white p-3 rounded-xl"
                            style={{ backgroundColor: ButtonColor }}
                            href={href}
                          >
                            {buttonText}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
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
