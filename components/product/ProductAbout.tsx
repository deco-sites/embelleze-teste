import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import PopUp from "$store/components/ui/PopUp.tsx";

type ITag =
  | "Ação"
  | "Indicação"
  | "Ativos"
  | "Benefícios"
  | "Resultado"
  | "Modo de Uso";

function ProductAbout(
  { additionalProperty }: {
    additionalProperty: ProductDetailsPage["product"]["additionalProperty"];
  },
) {
  const tag = useSignal<ITag>("Indicação");
  const tags = additionalProperty?.filter(({ valueReference }) =>
    valueReference === "SPECIFICATION"
  );

  const response = tags?.filter(({ name }) => name === tag.value)[0];

  const composicao = tags?.filter(({ name }) => name === "Composição")[0];
  console.log(response);

  const tagsButtons = [
    "Indicação",
    "Ação",
    "Ativos",
    "Benefícios",
    "Resultado",
    "Modo de Uso",
  ] as ITag[];

  return (
    <div class="flex flex-col gap-4">
      <div class="flex justify-center gap-4 flex-wrap">
        {tagsButtons.map((tagName) => (
          <button
            class={`${
              tagName === tag.value
                ? "text-white"
                : "bg-opacity-10 text-secondary"
            } bg-secondary p-2  rounded-lg uppercase font-medium`}
            onClick={() => tag.value = tagName}
          >
            {tagName}
          </button>
        ))}
      </div>
      <div class="bg-gray-100 flex p-4 rounded-2xl flex-col">
        <div class="flex flex-row gap-4 items-start">
          <div>
            {tag.value === "Indicação" && <Icon id="BottleDroplet" size={20} />}
            {tag.value === "Ativos" && <Icon id="sitemap" size={20} />}
            {tag.value === "Benefícios" && <Icon id="medal" size={20} />}
            {tag.value === "Resultado" && (
              <Icon
                id="BULLSEYE-ARROW"
                size={20}
              />
            )}
            {tag.value === "Modo de Uso" && <Icon id="Hands" size={20} />}
            {tag.value === "Ação" && <Icon id="UserHairLong" size={20} />}
          </div>
          <div class="flex flex-col gap-2 items-start">
            <p class="font-bold text-black uppercase w-fit">{response?.name}</p>
            <p>{response?.value}</p>
          </div>
        </div>
        {tag.value === "Benefícios" && (
          <PopUp title="composição flex">
            {composicao?.value}
          </PopUp>
        )}
      </div>
    </div>
  );
}

export default ProductAbout;
