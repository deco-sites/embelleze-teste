import { lazy, Suspense } from "preact/compat";

import { useUI } from "$store/sdk/embelleze/useUI.ts";
import { headerHeight } from "$store/components/header/constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const LazySearchbar = lazy(() =>
  import("$store/components/search/Searchbar.tsx")
);

export interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();
  const open = displaySearchPopup.value;

  return (
    <div
      class={`border-y border-base-200 shadow z-50 bg-base-100`}
    >
      <Suspense fallback={<span class="loading loading-ring" />}>
        <LazySearchbar {...searchbar} />
      </Suspense>
    </div>
  );
}

export default Searchbar;
