import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Atom"
  | "Bars3"
  | "BottleDroplet"
  | "BULLSEYE-ARROW"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "Close"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "EmbellezeLogo"
  | "EmbellezeLogoSecondary"
  | "Facebook"
  | "FilterList"
  | "Hands"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "medal"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Opiniao"
  | "Return"
  | "Ruler"
  | "Shared"
  | "sliders"
  | "sitemap"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "TRUCK-FAST"
  | "trash-alt"
  | "Twitter"
  | "User"
  | "UserHairLong"
  | "Visa"
  | "WhatsApp"
  | "XMark"
  | "Zoom";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
