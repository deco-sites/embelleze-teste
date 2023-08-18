import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import TestimonialsMobile from "$store/components/Content/TestimonialsMobile.tsx";
import TestimonialsDesktop from "$store/components/Content/TestimonialsDesktop.tsx";

export interface Section {
  image: LiveImage;
  alt: string;
  name: string;
  text: string;
  /**
   * @description Stars Rating. You can SCALE from 0 to 5.
   */
  rating: number;
}

export interface Props {
  title?: string;
  description?: string;
  section: Array<Section>;
}

function EmbellezeTestimonials({ section, title, description }: Props) {
  return (
    <div class="flex justify-between m-auto w-11/12 flex-col relative mb-10">
      {title && (
        <h2 class="text-primary text-2xl uppercase text-center">{title}</h2>
      )}
      {description && <p class="text-sm text-center">{description}</p>}
      {window.innerWidth <= 1300
        ? <TestimonialsMobile section={section} />
        : <TestimonialsDesktop section={section} />}
    </div>
  );
}

export default EmbellezeTestimonials;
