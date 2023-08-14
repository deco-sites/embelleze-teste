import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/embelleze/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import IconChevronLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-left.tsx";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/x.tsx";
import ImageComponent from "deco-sites/std/components/Image.tsx";
import type { Image } from "deco-sites/std/components/types.ts";

const Menu = lazy(() => import("$store/components/embelleze/header/Menu.tsx"));
// const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));
const MenuProducts = lazy(() =>
  import("$store/components/embelleze/header/MenuProducts.tsx")
);
const MenuProductsChild = lazy(() =>
  import("$store/components/embelleze/header/MenuProductsChild.tsx")
);

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  logo?: { src: Image; alt: string };
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  paths: { loginHref: string; favouriteHref: string; myBagHref: string };
}

const Aside = (
  { logo, onClose, children, chevronClick, title, displayMenu, open }: {
    logo?: { src: Image; alt: string };
    onClose?: () => void;
    chevronClick?: () => void;
    children: ComponentChildren;
    title?: string;
    displayMenu: boolean;
    open: boolean;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y">
    <div
      class={`${
        !displayMenu ? "bg-primary" : "bg-base-100"
      } min-h-[10vh] relative`}
    >
      <div class="flex h-full justify-between items-center w-[90%] m-auto">
        {!displayMenu && (
          <>
            <Button
              class="text-white btn-ghost bg-primary-content rounded-full h-fit p-2 bg-white/20"
              onClick={chevronClick}
            >
              <IconChevronLeft class="w-5 h-5" />
            </Button>
            <h1 class="px-4 py-3">
              <span class="font-medium text-2xl text-white">{title}</span>
            </h1>
          </>
        )}
        {displayMenu && logo && (
          <a
            href="/"
            class="top-0 bottom-0 m-auto left-0 right-0"
            aria-label="Store logo"
          >
            <ImageComponent
              src={logo.src}
              alt={logo.alt}
              width={130}
              height={30}
            />
          </a>
        )}
        {onClose && (
          <Button
            class={`${!displayMenu && "text-white"} ${
              open ? "block" : "hidden"
            } btn-ghost ${
              displayMenu ? "bg-primary-content" : "bg-white/20"
            } h-fit p-2 rounded-full`}
            onClick={onClose}
          >
            <IconX class="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, logo, children, paths }: Props) {
  const {
    displayMenu,
    displayMenuProducts,
    productsChild,
    displayMenuProductsChild,
    productsChild2,
  } = useUI();

  return (
    <Drawer
      open={displayMenu.value || displayMenuProductsChild.value}
      onClose={() => {
        displayMenu.value = false;
        displayMenuProductsChild.value = false;
      }}
      aside={
        <Aside
          displayMenu={displayMenu.value}
          logo={logo}
          onClose={() => {
            displayMenu.value = false;
            displayMenuProductsChild.value = false;
          }}
          open={displayMenu.value || displayMenuProductsChild.value}
          title={productsChild2.value.label}
          chevronClick={() => {
            displayMenuProductsChild.value = false;
            displayMenuProducts.value = true;
          }}
        >
          {displayMenu.value && <Menu {...menu} paths={paths} />}
          {displayMenuProductsChild.value && <MenuProductsChild />}
        </Aside>
      }
    >
      <Drawer
        open={displayMenuProducts.value}
        onClose={() => displayMenuProducts.value = false}
        aside={
          <Aside
            displayMenu={displayMenu.value}
            title={productsChild.value.label}
            onClose={() => displayMenuProducts.value = false}
            chevronClick={() => {
              displayMenuProducts.value = false;
              displayMenu.value = true;
            }}
            open={displayMenuProducts.value}
          >
            <MenuProducts />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
