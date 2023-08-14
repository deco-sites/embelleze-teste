/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displayMenuProducts = signal(false);
const displayMenuProductsChild = signal(false);
const productsChild = signal({ label: "", children: [], href: "" });
const productsChild2 = signal({ label: "", children: [], href: "" });
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displayMenuProducts,
  productsChild,
  displayMenuProductsChild,
  productsChild2,
};

export const useUI = () => state;
