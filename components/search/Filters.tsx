import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox checkbox-primary" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-6 py-4 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const id = useId();

  const filteredArrays = filters
    .map((filter) => (filter.values as []).filter(({ selected }) => selected))
    .filter((array) => array.length > 0);

  const flatArray = [...filteredArrays.flat()];

  const removeAllFilters = () => {
    try {
      const urlObject = new URL(window.location.href);
      const searchParams = urlObject.searchParams;
  
      // Verifica se o parâmetro 's?q' existe na URL
      if (searchParams.has('s?q')) {
        const searchTerm = searchParams.get('s?q');
        return `/s?q=${searchTerm}`;
      } else {
        // Verifica se o parâmetro 'q' existe na URL
        if (searchParams.has('q')) {
          const searchTerm = searchParams.get('q');
          return `/s?q=${searchTerm}`;
        } else {
          return "/";
        }
      }
    } catch (error) {
      return "/";
    }
  };

  return (
    <ul class="flex flex-col gap-6 p-4">
      {flatArray.length > 0 && (
        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between gap-6">
            <p class="font-bold">Selecionados:</p>

            <a href={removeAllFilters()} class="md:hidden">
              <button class="flex border flex-grow md:hidden justify-center items-center p-1 rounded-lg uppercase gap-4 max-w-[200px]">
                <Icon id="trash-alt" size={20} class="text-secondary" />
                <span>limpar filtros</span>
              </button>
            </a>
          </div>
          {flatArray.map(({ label, url }) => (
            <a href={url}>
              <span class="flex gap-4 items-center font-medium">
                <Icon id="Close" size={20} class="text-secondary" />
                <p>
                  {label}
                </p>
              </span>
            </a>
          ))}

          <a href={removeAllFilters()} class="hidden md:block">
            <button class="hidden border flex-grow md:flex justify-center items-center p-1 rounded-lg uppercase gap-4">
              <Icon id="trash-alt" size={20} class="text-secondary" />
              <span>limpar filtros</span>
            </button>
          </a>
        </div>
      )}
      {filters
        .filter(isToggle)
        .map((filter, index) => (
          <div class="flex flex-col gap-4 w-full">
            <div
              class="collapse rounded-none"
              onClick={() => {
                const inputColletion = document.getElementsByClassName(
                  "pdc-filters" + id,
                ) as HTMLCollectionOf<HTMLInputElement>;
                const isChecked = inputColletion[index].checked;

                const IconCollectionPlus = document.getElementsByClassName(
                  "pdc-plus" + id,
                ) as HTMLCollectionOf<SVGSVGElement>;

                const IconCollectionMinus = document.getElementsByClassName(
                  "pdc-minus" + id,
                ) as HTMLCollectionOf<SVGSVGElement>;

                IconCollectionPlus[index].style.display = isChecked
                  ? "none"
                  : "block";
                IconCollectionMinus[index].style.display = isChecked
                  ? "block"
                  : "none";
              }}
            >
              <input
                type="checkbox"
                name="pdc-filters"
                class={`${"pdc-filters" + id} min-h-[0px]`}
                aria-label="Filtros"
              />
              <div
                class="collapse-title flex justify-between cursor-pointer px-2 p-2 min-h-[0px] rounded-lg"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
              >
                <span class="flex content-center flex-wrap h-9 font-bold text-primary uppercase">
                  {filter.label}
                </span>

                <span class="flex content-center flex-wrap">
                  <Icon
                    class={`${
                      "pdc-plus" + id
                    } text-gray-medium h-[30px] w-[35px] transition-all duration-500 rounded-full p-1 text-primary font-bold`}
                    size={30}
                    width={35}
                    strokeWidth={2.5}
                    id={"ChevronDown"}
                  />
                  <Icon
                    class={`${
                      "pdc-minus" + id
                    } text-gray-medium h-[30px] w-[35px] transition-all duration-500 rounded-full p-1 text-primary font-bold`}
                    size={30}
                    width={35}
                    strokeWidth={2.5}
                    id={"ChevronUp"}
                    style={{ display: "none" }}
                  />
                </span>
              </div>
              <div class="collapse-content transition-all duration-700 overflow-auto p-0 scrollbar-none">
                <FilterValues {...filter} />
              </div>
            </div>
          </div>
        ))}
    </ul>
  );
}

export default Filters;
