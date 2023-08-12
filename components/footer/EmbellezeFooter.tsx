import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useEffect } from "preact/hooks";

export interface Props {
  logo?: {
    image: LiveImage;
    description?: string;
  };
  text?: string[];
  imagens?: Array<{
    image: LiveImage;
    description?: string;
  }>;
}

export default function EmbellezeFooter({ text, imagens, logo }: Props) {
  return (
    <div class="bg-primary flex items-center flex-col">
      {logo?.image && (
        <img src={logo?.image} alt={logo?.description} width="250px" />
      )}
      {text?.map((text) => (
        <p class="text-base-100 mt-4 text-center">
          {text}
        </p>
      ))}
      <ul class="flex justify-evenly flex-wrap">
        {imagens?.map((item) => (
          <li class="mr-5 mt-3">
            <img src={item.image} alt={item.description} max-height="120px" />
          </li>
        ))}
      </ul>
    </div>
  );
}
