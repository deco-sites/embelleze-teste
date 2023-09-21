import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Props {
  beneficio: { image: LiveImage; alt: string; text: string }[];
  /**
   * @format color
   * @default #FFFFFF
   */
  background: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  textColor: string;
}

function Beneficios({ beneficio, background, textColor }: Props) {
  console.log(background);
  return (
    <div
      class="h-[67px] w-[100vw]"
      style={{ backgroundColor: background }}
    >
      <div class="carousel flex justify-start gap-4 w-11/12 m-auto h-full items-center">
        {beneficio.map(({ alt, image, text }) => (
          <div class="flex justify-start gap-4 items-center carousel-item ">
            <Image src={image} alt={alt} width={35} height={35} />
            <p class="uppercase font-medium" style={{ color: textColor }}>
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Beneficios;
