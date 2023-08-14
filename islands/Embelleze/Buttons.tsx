import { default as MenuButtonComponent } from "$store/components/embelleze/header/buttons/Menu.tsx";
import { default as CartButtonComponent } from "$store/components/embelleze/header/buttons/Cart.tsx";

export function CartButton() {
  return <CartButtonComponent />;
}

export function MenuButton() {
  return <MenuButtonComponent />;
}
