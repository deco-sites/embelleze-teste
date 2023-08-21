import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Embelleze/Drawers.tsx";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";
import Alert from "../alert/Alert.tsx";
import NavBar from "./NavBar.tsx";
import NavItem from "./NavItem.tsx";
import IconPhone from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/phone.tsx";
import IconBrandLine from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-line.tsx";
import IconBrandYoutube from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-youtube.tsx";
import IconBrandInstagram from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-instagram.tsx";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
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

  paths: { loginHref: string; favouriteHref: string; myBagHref: string };
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
  return (
    <>
      <header>
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          logo={logo}
          paths={paths}
        >
          <div
            class={`h-[14.5vh] bg-base-100 fixed w-full z-50 ${
              navItems.length > 0 ? "md:h-[22vh]" : "md:h-[14.5vh]"
            }`}
          >
            <div class="w-screen bg-primary">
              <div class="w-[80vw] flex m-auto items-center justify-between">
                <Alert alerts={alerts} />
                <ul class="hidden md:flex items-center justify-between text-[0.56em] w-[30vw] uppercase text-white">
                  <li>
                    <a
                      href={social.Whatsapp.href}
                      class="flex items-center gap-1"
                    >
                      <IconPhone
                        class="w-4 h-4"
                        style={{ color: "rgb(255,56,156)" }}
                      />
                      FALE CONOSCO
                    </a>
                  </li>
                  {social.Blog && (
                    <li>
                      <a
                        href={social.Blog?.href}
                        class="flex items-center gap-1"
                      >
                        <IconBrandLine
                          class="w-4 h-4"
                          style={{ color: "rgb(255,56,156)" }}
                        />
                        BLOG {social.Blog?.blogName}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={social.Instagram.href}
                      class="flex items-center gap-1"
                    >
                      <IconBrandInstagram
                        class="w-4 h-4"
                        style={{ color: "rgb(255,56,156)" }}
                      />
                      INSTAGRAM
                    </a>
                  </li>
                  <li>
                    <a
                      href={social.Youtube.href}
                      class="flex items-center gap-1"
                    >
                      <IconBrandYoutube
                        class="w-4 h-4"
                        style={{ color: "rgb(255,56,156)" }}
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
                <div class="hidden md:flex m-auto w-[90%] h-[8vh] text-[#541693] uppercase items-center text-sm gap-5">
                  {navItems.map((item, index) => (
                    <NavItem
                      item={item}
                      lastIndex={index === navItems.length - 1}
                    />
                  ))}
                </div>
              )}
            <div class="w-[100%] md:hidden relative">
              <input
                class="w-full p-2 text-xs text-primary"
                type="type"
                placeholder="O que você procura?"
              >
              </input>
              <IconSearch
                class="w-5 h-5 right-2 absolute top-0 bottom-0 m-auto text-primary"
                style={{ position: "absolute" }}
              />
            </div>
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default EmbellezeHeader;