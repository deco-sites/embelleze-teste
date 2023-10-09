import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  menu: {
    title: string;
    section: { text: string; href: string }[];
  }[];
  matcher: string;
}

export default function Controls(
  { menu, matcher }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      class="md:hidden"
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-[100vw]">
            <div class="flex justify-start gap-4 items-center bg-primary px-2 h-auto min-h-[71px] w-full flex-wrap">
              <Button
                class="btn btn-ghost rounded-full bg-white bg-opacity-10 "
                onClick={() => open.value = false}
              >
                <Icon id="XMark" class="text-white" size={24} strokeWidth={2} />
              </Button>
              <h2 class="md:hidden flex-row gap-4 items-center flex">
                <Icon
                  id="EmbellezeLogoSecondary"
                  class="text-secondary"
                  size={40}
                />
                <span class="font-medium text-base uppercase text-white">
                  menu institucional
                </span>
              </h2>
            </div>
            <div class="flex-grow overflow-auto py-4">
              <div class="flex justify-between w-11/12 m-auto max-w-[1300px] gap-4">
                {menu.map(({ section, title }) => (
                  <div>
                    <h2 class="text-primary text-base uppercase font-semibold">
                      {title}
                    </h2>
                    <ul class="flex flex-col gap-2">
                      {section.map(({ href, text }) => (
                        <li class="flex justify-start gap-2 items-center">
                          {href.split("/institutional")[1] === matcher && (
                            <div class="w-2 h-2 rounded-full bg-secondary" />
                          )}
                          <a
                            href={href}
                            class={`${
                              href.split("/institutional")[1] === matcher
                                ? "text-black font-semibold"
                                : ""
                            }`}
                          >
                            {text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    >
      <div class="flex w-11/12 m-auto">
        <Button
          class={"md:hidden flex-grow justify-between font-bold text-white uppercase h-[55px] max-h-[55px] bg-primary"}
          onClick={() => {
            open.value = true;
          }}
        >
          menu institucional
          <Icon
            id="ChevronRight"
            class="bg-secondary rounded-full text-white"
            size={40}
          />
        </Button>
      </div>
    </Drawer>
  );
}
