export interface Props {
  title: string;
  /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  text: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  Color?: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  BackgroundColor?: string;
}

function Text({ title, text, BackgroundColor, Color }: Props) {
  return (
    <div style={{ backgroundColor: BackgroundColor, color: Color }}>
      <div class="w-11/12 flex flex-col items-center justify-center m-auto gap-4 max-w-[820px] p-[64px]">
        <h2>
          <p class="text-3xl font-bold uppercase text-center">
            {title && title}
          </p>
        </h2>
        <div
          class="text-tertiary text-center w-full"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}

export default Text;
