import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Section {
  title: string;
  icon: LiveImage;
  text: string;
  alt: string;
}

export interface Props {
  section: Section[];
}

function Culture({ section }: Props) {
  return (
    <div class="flex m-auto md:w-85 md:flex-row w-11/12 flex-col flex-wrap justify-between">
      {section.map(({ title, icon, text, alt }) => (
        <div class="flex flex-row justify-start items-start gap-4 md:w-[328px] mb-10">
          <img src={icon} alt={alt} width={36} height={36} />
          <div>
            <h2 class="uppercase">{title}</h2>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Culture;
