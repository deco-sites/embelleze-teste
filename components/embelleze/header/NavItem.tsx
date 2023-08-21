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
            ? "bg-secondary text-white rounded-[5px] py-1 px-4"
            : "px-4 py-3"
        }`}
      >
        <span class="group-hover:underline">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t-[1px] border-solid border-gray-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: "22vh" }}
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