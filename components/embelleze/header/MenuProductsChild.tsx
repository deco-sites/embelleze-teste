// deno-lint-ignore-file no-explicit-any
import { useUI } from "$store/sdk/embelleze/useUI.ts";

function MenuProducts() {
  const { productsChild2 } = useUI();

  return (
    <div class="w-[85vw]">
      <ul class="w-full h-full">
        {productsChild2.value.children.map((node: any) => (
          <li class="w-full">
            <a
              href={node.href}
              class="flex items-center justify-between w-full text-primary uppercase px-4 py-4 border-b-[1px] font-medium text-sm border-black border-opacity-10"
            >
              {node.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuProducts;
