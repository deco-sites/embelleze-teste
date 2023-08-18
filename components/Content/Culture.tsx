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
  const hideStringEnd = (input: string, visibleChars: number): string => {
    return input.length <= visibleChars
      ? input
      : input.slice(0, visibleChars) + "...";
  };

  return (
    <div class="flex m-auto md:w-85 md:flex-row w-11/12 flex-col flex-wrap justify-between relative">
      {section?.map(({ title, icon, text, alt }, index) => (
        <div
          class="flex flex-row justify-start items-start gap-4 md:w-[328px] mb-9 h-32 w-[100%]"
          key={index}
        >
          <img src={icon} alt={alt} width={36} height={36} />
          <div>
            <h2 class="uppercase text-tertiary font-bold">{title}</h2>
            <p class="text-start text-sm">{hideStringEnd(text, 183)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Culture;