import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <select
      id="sort"
      name="sort"
      onInput={applySort}
      class="w-min p-4 px-1 rounded ml-2 cursor-pointer outline-none flex-grow justify-between font-bold text-primary uppercase max-w-[284px] h-[55px] max-h-[55px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
    >
      {sortOptions.map(({ value, label }) => ({
        value,
        label: portugueseMappings[label as keyof typeof portugueseMappings],
        backSort: label,
      })).filter(({ label, value }) => label).map((
        { value, label, backSort },
      ) => (
        <option key={value} value={backSort} selected={backSort === sort}>
          <span class="text-sm">{label}</span>
        </option>
      ))}
    </select>
  );
}

export default Sort;
