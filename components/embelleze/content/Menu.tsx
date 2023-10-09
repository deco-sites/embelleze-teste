import type { SectionProps } from "$live/types.ts";
import Blog from "$store/components/ui/Blog.tsx";
import type { ContentType } from "$store/components/ui/Blog.tsx";
import Controls from "$store/components/embelleze/content/Controls.tsx";
import Icon from "$store/components/ui/Icon.tsx";

/**
 * @titleBy matcher
 */
export interface Institutional {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title: string;
  section: { type: ContentType }[];
}

export interface Props {
  Institutionals?: Institutional[];
  menu: {
    title: string;
    section: { text: string; href: string }[];
  }[];
}

export const loader = ({ Institutionals = [], menu }: Props, req: Request) => {
  console.log({ test: "test" });
  const Institutional = Institutionals.find(({ matcher }) => {
    return new URLPattern({ pathname: `/institutional${matcher}` }).test(
      req.url,
    );
  });

  return { Institutional, menu };
};

function Menu(
  { Institutional, menu }: SectionProps<ReturnType<typeof loader>>,
) {
  console.log(Institutional);
  if (!Institutional) {
    return <></>;
  }
  const { matcher } = Institutional;
  return (
    <div class="flex justify-between w-11/12 m-auto max-w-[1300px] gap-4 flex-col md:flex-row bg-gray-100 md:bg-transparent py-4 my-12">
      <div class="md:flex flex-col hidden gap-4 min-w-[300px]">
        <div class="flex gap-4 items-center">
          <Icon
            id="EmbellezeLogoSecondary"
            class="bg-primary rounded-full p-1"
            size={40}
          />
          <h2 class="text-primary text-base uppercase font-semibold">
            menu institucional
          </h2>
        </div>
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
      <Controls menu={menu} matcher={matcher} />
      <div class="bg-gray-100 flex flex-col flex-grow w-full gap-8 py-4 rounded-lg max-w-[1000px]">
        <h1 class="flex w-11/12 m-auto text-2xl text-primary uppercase font-semibold justify-center">
          {Institutional.title}
        </h1>
        <div class="block h-[1px] w-11/12 bg-black m-auto" />
        <Blog section={[...Institutional.section]} />
      </div>
    </div>
  );
}

export default Menu;
