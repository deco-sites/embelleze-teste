import type { INavItem } from "./NavItem.tsx";
import Button from "$store/components/ui/Button.tsx";
import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import IconShoppingBag from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/shopping-bag.tsx";
import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";

export interface Props {
  items: INavItem[];
  paths: { loginHref: string; favouriteHref: string; myBagHref: string };
}

function Menu({ items, paths }: Props) {
  const { displayMenuProducts, displayMenu, productsChild } = useUI();

  return (
    <div class="flex flex-col h-full w-[85vw]">
      <ul class="flex flex-col uppercase text-xs">
        {items.map((item, index) => (
          <li class="font-medium">
            {item.children !== undefined && item.children?.length > 0
              ? (
                <Button
                  class={`flex border-b-[1px] items-center justify-between py-3 uppercase m-auto w-full bg-white ${
                    items.length - 1 === index
                      ? "text-secondary"
                      : "text-primary"
                  } hover:bg-inherit`}
                  onClick={() => {
                    displayMenuProducts.value = true;
                    displayMenu.value = false;
                    productsChild.value = {
                      label: item.label,
                      children: item.children,
                      href: item.href,
                      // deno-lint-ignore no-explicit-any
                    } as any;
                  }}
                >
                  {item.label}
                  <IconChevronRight class="w-5 h-5" />
                </Button>
              )
              : (
                <a
                  href={item.href}
                  class={`flex border-b-[1px] items-center justify-between font-semibold px-4 py-4 uppercase m-auto w-full bg-white ${
                    index === items.length - 1
                      ? "text-secondary"
                      : "text-primary"
                  }`}
                >
                  {item.label}
                  <IconChevronRight class="w-5 h-5" />
                </a>
              )}
          </li>
        ))}
      </ul>

      <ul class="flex flex-col text-primary">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2 border-b-[1px]"
            href={paths.loginHref}
          >
            <span class="rounded-full p-2 bg-primary-content">
              <IconUser class="w-4 h-4" />
            </span>
            <span class="text-sm">Entre ou Cadastre-se</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2 border-b-[1px]"
            href={paths.favouriteHref}
          >
            <span class="rounded-full p-2 bg-primary-content">
              <IconHeart class="w-4 h-4" />
            </span>
            <span class="text-sm">Favoritos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2 border-b-[1px]"
            href={paths.myBagHref}
          >
            <span class="rounded-full p-2 bg-primary-content">
              <IconShoppingBag class="w-4 h-4" />
            </span>
            <span class="text-sm">Minha sacola</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
