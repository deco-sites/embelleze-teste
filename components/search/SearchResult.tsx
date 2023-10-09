import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { Layout as cardLayout } from "$store/components/product/ProductCard.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

export interface Props {
  page: ProductListingPage | null;
  layout?: Layout;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  const records = pageInfo.records ?? products.length;
  const recordPerPage = pageInfo.recordPerPage ?? 1;
  const value = Math.ceil(records / recordPerPage);

  return (
    <>
      <div class="flex flex-col w-11/12 m-auto py-10 max-w-[1300px]">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          pageInfo={pageInfo}
          productsInPage={products.length}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row justify-between">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden md:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow lg:max-w-[918px]">
            <ProductGallery products={products} />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="flex items-center justify-center p-4 rounded-full"
              style={{ backgroundColor: "rgba(95, 36, 159, 0.1)" }}
            >
              <Icon
                id="ChevronLeft"
                size={24}
                strokeWidth={2}
                class="text-primary"
              />
            </a>
            <span class="btn btn-ghost join-item">
              Página{" "}
              <strong class="text-primary">{pageInfo.currentPage + 1}</strong>
              {" "}
              de <strong class="text-primary">{value}</strong>
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="flex items-center justify-center p-4 rounded-full"
              style={{ backgroundColor: "rgba(95, 36, 159, 0.1)" }}
            >
              <Icon
                id="ChevronRight"
                size={24}
                strokeWidth={2}
                class="text-primary"
              />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
