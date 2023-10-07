import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user.tsx";
import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import { CartButton, MenuButton } from "$store/islands/Embelleze/Buttons.tsx";
import ImageComponent from "deco-sites/std/components/Image.tsx";
import { navbarHeight } from "../../header/constants.ts";
import type { Image } from "deco-sites/std/components/types.ts";

function Navbar({ paths, logo }: {
  logo?: { src: Image; alt: string };
  paths: { loginHref: string; favouriteHref: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="xl:hidden border-b border-base-200 w-full text-primary"
      >
        <div class="w-11/12 m-auto flex flex-row justify-between items-center gap-4">
          <MenuButton />

          {logo && (
            <a
              href="/"
              class="flex-grow justify-center flex items-center h-[42px] w-[238px] object-contain"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <ImageComponent
                class="object-contain"
                src={logo.src}
                alt={logo.alt}
                width={238}
                height={42}
              />
            </a>
          )}

          <div class="flex gap-1">
            <CartButton />
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden xl:flex py-4 items-center m-auto w-[90%]  max-w-[1300px] justify-between gap-8 max-h-[75px]">
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="flex items-center px-4 py-3 h-[42px] w-[238px]"
          >
            <ImageComponent
              class="w-full"
              src={logo.src}
              alt={logo.alt}
              width={238}
              height={42}
            />
          </a>
        )}
        <form
          action="/s"
          method="GET"
          id="formId"
          class="flex-grow rounded-2xl border-[1px] border-gray-300 text-xs py-2 pl-2"
        >
          <input
            type="text"
            placeholder="O que você procura? Nós podemos te ajudar!"
            name="q"
            class="w-full border-none"
          >
          </input>
        </form>
        <div class="flex items-center gap-6">
          <a
            class="flex items-center gap-2"
            href={paths.loginHref}
            aria-label="Log in"
          >
            <div class="bg-primary-content p-1 rounded-full">
              <IconUser class="w-6 h-6 text-primary" />
            </div>
            <p class="text-[1rem] text-[#541693]">
              Entre ou <br /> Cadastre-se
            </p>
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost bg-primary-content p-1 w-9 h-9"
            href={paths.favouriteHref}
            aria-label="Wishlist"
          >
            <IconHeart class="w-6 h-6 text-primary" />
          </a>
          <CartButton />
        </div>
      </div>
    </>
  );
}

export default Navbar;
