export interface Props {
  heading: string;
}

function SeoHeading({ heading }: Props) {
  return (
    <h1 class="hidden">
      {heading}
    </h1>
  );
}

export default SeoHeading;
