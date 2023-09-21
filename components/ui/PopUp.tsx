import type { ComponentChildren } from "preact";
import Icon from "$store/components/ui/Icon.tsx";

function PopUp(
  { children, title }: { children: ComponentChildren; title: string },
) {
  return (
    <div class=" flex justify-center">
      {/* The button to open modal */}
      <label
        htmlFor="my_modal_6"
        className="p-2 uppercase w-full max-w-[380px] bg-transparent border border-black rounded-lg text-center"
      >
        confira a composição do produto aqui
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div class="flex items-start justify-between">
            <div class="flex gap-2">
              <Icon id="Atom" size={40} class="text-primary" />
              <h3 className="font-bold text-lg uppercase">{title}</h3>
            </div>
            <div className="flex flex-col justify-start">
              <label
                htmlFor="my_modal_6"
                className="flex justify-center items-center rounded-full bg-primary bg-opacity-10 border-none h-[45px] w-[45px] text-xl text-primary"
              >
                <Icon id="Close" size={30} />
              </label>
            </div>
          </div>
          <p className="py-4">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
