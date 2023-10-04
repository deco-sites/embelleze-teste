import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user.tsx";
import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import { CartButton, MenuButton } from "$store/islands/Embelleze/Buttons.tsx";
import ImageComponent from "deco-sites/std/components/Image.tsx";
import { navbarHeight } from "../../header/constants.ts";
import type { Image } from "deco-sites/std/components/types.ts";

function Navbar({ paths, logo }: {
  logo?: { src: Image; alt: string };
  paths: { loginHref: string; favouriteHref: string; myBagHref: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden border-b border-base-200 w-full text-primary"
      >
        <div class="w-[90%] m-auto flex flex-row justify-between items-center">
          <MenuButton />

          {logo && (
            <a
              href="/"
              class="flex-grow justify-center flex items-center"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <ImageComponent
                src={logo.src}
                alt={logo.alt}
                width={126}
                height={30}
              />
            </a>
          )}

          <div class="flex gap-1">
            <CartButton />
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex h-[10vh] items-center m-auto w-[90%] justify-between">
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="block px-4 py-3 w-[160px]"
          >
            <ImageComponent
              src={logo.src}
              alt={logo.alt}
              width={126}
              height={30}
            />
          </a>
        )}
        <form
          action="/s"
          method="GET"
          id="formId"
          class="w-3/5 rounded-2xl border-[1px] border-gray-300 text-xs py-2 pl-2"
        >
          <input
            type="text"
            placeholder="O que você procura? Nós podemos te ajudar!"
            name="q"
            class="w-full border-none"
          >
          </input>
        </form>
        <div class="flex items-center gap-4">
          <a
            class="flex items-center gap-2"
            href={paths.loginHref}
            aria-label="Log in"
          >
            <div class="bg-primary-content p-1 rounded-full">
              <IconUser class="w-5 h-5" />
            </div>
            <p class="text-[0.8em] text-[#541693]">
              Entre ou <br /> Cadastre-se
            </p>
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost bg-primary-content p-1"
            href={paths.favouriteHref}
            aria-label="Wishlist"
          >
            <IconHeart class="w-5 h-5" />
          </a>
          <CartButton />
        </div>
      </div>
    </>
  );
}

export default Navbar;
