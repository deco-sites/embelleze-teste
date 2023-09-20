import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import TestimonialsMobile from "$store/components/Content/TestimonialsMobile.tsx";
import TestimonialsDesktop from "$store/components/Content/TestimonialsDesktop.tsx";

export interface Section {
  user: { name: string };
  opinion: string | undefined;
  comments: { text: string }[];
  /**
   * @description Stars Rating. You can SCALE from 0 to 5.
   */
  rate: number;
}

export interface Props {
  title?: string;
  description?: string;
  section: Array<Section>;
}

function EmbellezeTestimonials({ section, title, description }: Props) {
  return (
    <div class="flex justify-between m-auto w-11/12 flex-col relative gap-4 py-4">
      {title && (
        <h2 class="text-primary text-2xl uppercase text-center font-medium">
          {title}
        </h2>
      )}
      {description && <p class="text-sm text-center">{description}</p>}
      {window.innerWidth <= 1300
        ? <TestimonialsMobile section={section} />
        : <TestimonialsDesktop section={section} />}
    </div>
  );
}

export default EmbellezeTestimonials;
