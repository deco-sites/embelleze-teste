import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";
import IconMenu2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/menu-2.tsx";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost bg-primary-content p-1"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <IconMenu2 class="w-5 h-5 text-base-300" />
    </Button>
  );
}
