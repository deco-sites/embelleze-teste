import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

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
  const id = useId();
  return (
    <div style={{ backgroundColor: background }} class="my-8">
      <div
        class="h-[67px] w-11/12 m-auto flex justify-center max-w-[1300px]"
        id={id}
      >
        <Slider class="carousel carousel-start row-start-2 row-end-5 flex justify-start h-full items-center gap-11 w-full">
          {beneficio.map(({ alt, image, text }, index) => (
            <Slider.Item
              index={index}
              class="flex justify-start gap-4 items-center carousel-item m-auto"
            >
              <Image src={image} alt={alt} width={35} height={35} />
              <p class="uppercase font-semibold" style={{ color: textColor }}>
                {text}
              </p>
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default Beneficios;
