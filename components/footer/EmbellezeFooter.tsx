import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  logo?: {
    image: LiveImage;
    description?: string;
  };
  text?: string[];
  imagens?: Array<{
    image: LiveImage;
    alt?: string;
    link?: string;
  }>;
}

export default function EmbellezeFooter({ text, imagens, logo }: Props) {
  return (
    <div class="bg-primary flex items-center flex-col py-8">
      {logo?.image && (
        <Image
          fit="contain"
          src={logo?.image}
          alt={logo?.description}
          width={250}
          height={65}
        />
      )}
      {text?.map((text) => (
        <p class="text-base-100 mt-4 text-center">
          {text}
        </p>
      ))}
      <ul class="flex justify-evenly flex-wrap gap-4 my-4">
        {imagens?.map((item) => (
          <li>
            <a href={item.link}>
              <Image
                fit="contain"
                src={item.image}
                alt={item.alt}
                width={90}
                height={71}
                class="object-contain max-w-[90px] max-h-20"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
