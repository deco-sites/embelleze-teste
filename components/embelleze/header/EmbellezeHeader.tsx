import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Embelleze/Drawers.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";
import Alert from "../alert/Alert.tsx";
import NavBar from "./NavBar.tsx";
import NavItem from "./NavItem.tsx";
import IconPhone from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/phone.tsx";
import IconBrandLine from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-line.tsx";
import IconBrandYoutube from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-youtube.tsx";
import IconBrandInstagram from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-instagram.tsx";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import Button from "$store/components/ui/Button.tsx";

export interface NavItem {
  label: string;
  href?: string;
  children?: Array<{
    label: string;
    href?: string;
    children?: Array<{
      label: string;
      href?: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Social {
  Whatsapp: { href: string };
  Blog?: { href: string; blogName: string };
  Instagram: { href: string };
  Youtube: { href: string };
}

export interface Props {
  alerts: string[];

  /**
   * @title Social Media
   */
  social: Social;

  /** @title Search Bar */
  searchbar?: SearchbarProps;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: Image; alt: string };

  paths: { loginHref: string; favouriteHref: string };
}

function EmbellezeHeader({
  alerts = ["alerts-0", "alerts-1"],
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
  social,
  paths,
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };
  const id = useId();
  return (
    <>
      <header class="xl:h-[160px] h-[125px]">
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          logo={logo}
          paths={paths}
        >
          <div class="bg-base-100 fixed w-full z-20 
              h-auto border-b border-[#552B9A1A] border-opacity-10">
            <div class="w-screen bg-primary">
              <div class="w-11/12 max-w-[1300px] gap-6  flex m-auto items-center justify-between">
                <Alert alerts={alerts} />
                <ul class="hidden xl:flex items-center text-[0.56em] gap-6 justify-end uppercase text-white">
                  <li>
                    <a
                      href={social.Whatsapp.href}
                      class="flex items-center gap-1"
                    >
                      <IconPhone class="w-4 h-4 text-base-200" />
                      FALE CONOSCO
                    </a>
                  </li>
                  {social.Blog && (
                    <li>
                      <a
                        href={social.Blog?.href}
                        class="flex items-center gap-1"
                      >
                        <IconBrandLine class="w-4 h-4 text-base-200" />
                        BLOG {social.Blog?.blogName}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={social.Instagram.href}
                      class="flex items-center gap-1"
                    >
                      <IconBrandInstagram class="w-4 h-4 text-base-200" />
                      INSTAGRAM
                    </a>
                  </li>
                  <li>
                    <a
                      href={social.Youtube.href}
                      class="flex items-center gap-1"
                    >
                      <Icon
                        id="youtube"
                        size={16}
                        class="w-4 h-4 text-base-200"
                      />
                      YOUTUBE
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full border-b-[1px] border-solid border-gray-200">
              <NavBar paths={paths} logo={logo} />
            </div>
            {navItems.length > 0 &&
              (
                <ul class="hidden xl:flex justify-center m-auto w-11/12 max-w-[1300px] text-[#541693] uppercase items-center text-sm gap-5 min-h-[35px]">
                  {navItems.map((item, index) => (
                    <NavItem
                      item={item}
                      lastIndex={index === navItems.length - 1}
                    />
                  ))}
                </ul>
              )}
            <div className="w-[100%] xl:hidden relative">
              <form action="/s" method="GET" id="formId" class="min-h-[40px]">
                <input
                  className="w-full p-2 text-base text-primary"
                  type="text"
                  name="q" // Adicione o atributo 'name' com o valor 'q'
                  placeholder="O que você procura?"
                />
                <button type="submit" aria-label="Search">
                  <IconSearch
                    className="w-5 h-5 right-2 absolute top-0 bottom-0 m-auto text-primary"
                    style={{ position: "absolute" }}
                  />
                </button>
              </form>
            </div>
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default EmbellezeHeader;
