import type { INavItem } from "./NavItem.tsx";
import Button from "$store/components/ui/Button.tsx";
import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import IconShoppingBag from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/shopping-bag.tsx";
import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";
import { CartButton } from "$store/islands/Embelleze/Buttons.tsx";

export interface Props {
  items: INavItem[];
  paths: { loginHref: string; favouriteHref: string };
}

function Menu({ items, paths }: Props) {
  const { displayMenuProducts, displayMenu, productsChild } = useUI();

  return (
    <div class="flex flex-col h-auto w-[85vw]">
      <ul class="flex flex-col uppercase text-xs">
        {items.map((item, index) => (
          <li class="font-medium">
            {item.children !== undefined && item.children?.length > 0
              ? (
                <Button
                  class={`flex border-b-[1px] items-center justify-between py-3 uppercase m-auto w-full bg-white font-bold text-[14px] leading-[17.5px] ${
                    items.length - 1 === index
                      ? "text-secondary"
                      : "text-primary"
                  } hover:bg-inherit border-black border-opacity-10`}
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
                  class={`flex border-b-[1px] items-center justify-between px-4 py-4 uppercase m-auto w-full bg-white font-bold text-[14px] leading-[17.5px] ${
                    index === items.length - 1
                      ? "text-secondary"
                      : "text-primary"
                  }`}
                >
                  {item.label}
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
            <span class="rounded-full w-9 h-9 flex items-center justify-center bg-primary-content">
              <IconUser class="w-6 h-6" />
            </span>
            <span class="text-[14px] leading-[17.5px]">
              Entre ou Cadastre-se
            </span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2 border-b-[1px]"
            href={paths.favouriteHref}
          >
            <span class="rounded-full w-9 h-9 flex items-center justify-center bg-primary-content">
              <IconHeart class="w-6 h-6" />
            </span>
            <span class="text-[14px] leading-[17.5px]">Favoritos</span>
          </a>
        </li>
        <li class="flex items-center gap-4 px-4 py-2 border-b-[1px]">
          {/* <span class="rounded-full p-2 bg-primary-content w-4 h-4"> */}
          <CartButton />
          {/* </span> */}
          <span class="text-[14px] leading-[17.5px]">Sua Sacola</span>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
