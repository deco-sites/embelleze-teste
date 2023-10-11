// deno-lint-ignore-file no-explicit-any
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

function MenuProducts() {
  const {
    displayMenuProducts,
    productsChild,
    displayMenuProductsChild,
    productsChild2,
  } = useUI();

  return (
    <div class="w-[85vw]">
      <ul class="w-full h-full">
        {productsChild.value.children.map((node: any) => (
          <li class="w-full">
            {node.children !== undefined && node.children.length > 0
              ? (
                <Button
                  class={`py-3 w-full font-medium uppercase m-auto bg-white hover:bg-inherit border-b-[1px] justify-between text-left text-primary border-black border-opacity-10`}
                  onClick={() => {
                    displayMenuProducts.value = false;
                    displayMenuProductsChild.value = true;
                    productsChild2.value = {
                      label: node.label,
                      children: node.children,
                      href: node.href,
                    } as any;
                  }}
                >
                  {node.label}
                  <IconChevronRight
                    class="w-5 h-5"
                    style={{ color: "#E7E7E7" }}
                  />
                </Button>
              )
              : (
                <a
                  href={node.href}
                  class="flex items-center justify-between w-full text-primary uppercase px-4 py-4 border-b-[1px] font-medium text-sm"
                >
                  {node.label}
                </a>
              )}
          </li>
        ))}
        <li class="w-full">
          <Button
            class="py-3 border-none uppercase w-full text-primary bg-white hover:bg-inherit text-left"
            onClick={() => {
              displayMenuProducts.value = false;
            }}
          >
            {productsChild.value.href && (
              <a
                class="uppercase font-bold w-full text-primary"
                href={productsChild.value.href}
              >
                {`Ver tudo em ${productsChild.value.label}`}
              </a>
            )}
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default MenuProducts;
