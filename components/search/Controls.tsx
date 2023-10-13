import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions" | "pageInfo"
  >
  & {
    displayFilter?: boolean;
    productsInPage: number;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, pageInfo, productsInPage }:
    Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-start gap-4 items-center bg-primary px-2 h-[71px]">
              <Button
                class="btn btn-ghost rounded-full bg-white bg-opacity-10 "
                onClick={() => open.value = false}
              >
                <Icon id="XMark" class="text-white" size={24} strokeWidth={2} />
              </Button>
              <h2 class="md:hidden flex-row gap-4 items-center flex">
                <Icon id="sliders" class="text-secondary" size={20} />
                <span class="font-medium text-2xl uppercase text-white">
                  filtros
                </span>
              </h2>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 p-4 md:mb-0 md:p-0 md:gap-4 md:flex-row md:h-[53px] md:border-b md:border-base-200">
        <p
          id="return-fill"
          class="font-medium md:hidden"
          style={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          Mostrando <span class="font-bold">{productsInPage}</span> de{" "}
          <span class="font-bold">
            {(pageInfo.records) ?? productsInPage}
          </span>{" "}
          resultados
        </p>

        <div class="flex flex-row items-center justify-between border-b border-base-200 md:gap-4 md:border-none w-full pb-8">
          <div class="md:flex flex-row gap-4 items-center hidden">
            <Icon id="sliders" class="text-primary" size={20} />
            <span class="uppercase font-bold text-primary text-lg">
              filtros
            </span>
          </div>
          <Button
            class={displayFilter
              ? "btn-ghost flex-grow"
              : "btn-ghost md:hidden flex-grow justify-between font-bold text-primary uppercase h-[55px] max-h-[55px]"}
            onClick={() => {
              open.value = true;
            }}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
          >
            Filtrar
            <Icon id="sliders" class="text-primary" size={20} />
          </Button>
          <p
            id="return-fill"
            class="font-medium md:block hidden"
            style={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            Mostrando <span class="font-bold">{productsInPage}</span> de{" "}
            <span class="font-bold">
              {(pageInfo.records) ?? productsInPage}
            </span>{" "}
            resultados
          </p>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions.sort((a, b) => {
    if (a.label === "relevance:desc") return -1; // "relevance:desc" vem primeiro
    if (b.label === "relevance:desc") return 1; // "relevance:desc" vem primeiro
    return a.label.localeCompare(b.label); // Ordenar os outros itens
  })} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
