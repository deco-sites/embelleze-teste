import Image from "deco-sites/std/components/Image.tsx";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item, lastIndex }: { item: INavItem; lastIndex: boolean }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center">
      <a
        href={href}
        class={`${
          lastIndex
            ? "bg-secondary text-white rounded-[5px] py-1 px-2"
            : "px-2 py-3"
        }`}
      >
        <span
          class="group-hover:underline font-semibold"
          style={{ lineHeight: "17.5px", fontSize: "14px" }}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t-[1px] border-solid border-gray-200 w-screen xl:mt-[149px] mt-[125px]"
            style={{ top: "0", left: "0px" }}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
