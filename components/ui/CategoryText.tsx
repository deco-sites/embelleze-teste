import type { SectionProps } from "$live/types.ts";

export interface Text {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  title: string;
  /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  subtitle: string;
}

export interface Props {
  text?: Text[];
}

export const loader = ({ text = [] }: Props, req: Request) => {
  const textInfos = text.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { text: textInfos };
};

function CategoryText({ text }: SectionProps<ReturnType<typeof loader>>) {
  if (!text?.title) {
    return <></>;
  }

  const { title, subtitle } = text;

  return (
    <div>
      <div
        class="flex flex-col items-center w-11/12 max-w-[820px] gap-2 px-4 py-8 m-auto"
        id="CategoryText"
      >
        <h2>
          <p class="text-3xl font-bold text-primary uppercase text-center">
            {title && title}
          </p>
        </h2>
        <h2>
          <div
            class="text-tertiary text-center w-full"
            dangerouslySetInnerHTML={{
              __html: subtitle,
            }}
          >
          </div>
        </h2>
      </div>
    </div>
  );
}

export default CategoryText;
