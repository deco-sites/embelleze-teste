import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

export interface Props {
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor: string;
  title: string;
  description: string;
  /** @description if the height of this container pass 400px in some devices, one button to see more will apper*/
  sections: { question: string; awnser: string }[];
}

function Questions({ title, description, sections, titleColor }: Props) {
  const button = useRef<HTMLButtonElement | null>(null);
  const card = useRef<HTMLDivElement | null>(null);
  const isRender = useSignal<boolean>(false);

  useEffect(() => {
    const height = card.current?.offsetHeight ?? 0;
    isRender.value = height >= 400 ? true : false;
    if (!card.current) return;
    height < 400
      ? card.current.classList.add("active")
      : card.current.classList.remove("active");
  }, []);

  addEventListener("resize", () => {
    const height = card.current?.offsetHeight ?? 0;
    isRender.value = height >= 400 ? true : false;
    if (!card.current) return;
    height < 400
      ? card.current.classList.add("active")
      : card.current.classList.remove("active");
    // Seu código a ser executado quando a janela é redimensionada
  });

  return (
    <div class="flex justify-start items-center m-auto w-11/12 flex-col relative gap-4 py-4">
      {title && (
        <h2
          class="text-primary text-2xl uppercase text-center font-medium"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
      )}
      {description && <p class="text-sm text-center">{description}</p>}
      <div
        class="questions flex justify-between gap-4 flex-wrap overflow-hidden max-h-[400px] relative"
        ref={card}
        onClick={() => console.log(card.current?.offsetHeight)}
      >
        {sections?.map(({ awnser, question }, index) => (
          <div class="flex justify-center items-center p-4 gap-4 flex-grow md:max-w-[45%] lg:w-[45%] lg:max-w-[50%] border rounded-lg min-h-[84px]">
            <span class="border rounded-full h-14 w-14 flex items-center justify-center">
              {index + 1}
            </span>
            <div>
              <h2 style={{ color: titleColor }} class="font-bold">
                {question}
              </h2>
              <p>{awnser}</p>
            </div>
          </div>
        ))}
      </div>
      {isRender.value && (
        <button
          ref={button}
          onClick={() => {
            if (!card.current) return;

            card.current.classList.toggle("active");
            const isActive = card.current.classList.contains("active");
            if (button.current) {
              button.current.textContent = isActive
                ? "Ver menos -"
                : "Ver mais +";
            }
          }}
          class="btn bg-transparent border md:max-w-fit"
        >
          Ver mais +
        </button>
      )}
    </div>
  );
}

export default Questions;
