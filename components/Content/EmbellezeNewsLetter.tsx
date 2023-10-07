import { useState } from "preact/hooks";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Input {
  name: string;
  placeholder: string;
}

export interface Form {
  button: { text: string };
  inputs: Array<Input>;
}

export interface Props {
  title: string;
  form: Form;
}

function EmbellezeNewsLetter({ title, form: { button, inputs } }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = Runtime.create(
    "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
  );

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const infos: Record<string, string> = {};
      inputs.forEach(({ name }) => {
        infos[name] =
          (e.currentTarget.elements.namedItem(name) as HTMLInputElement)?.value;
      });
      await subscribe(infos);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class=" m-auto md:w-85 w-11/12 max-w-[1440px] xl:px-[102px]">
      <form
        class="py-8 px-6 max-w-[1/2 ]flex-wrap flex flex-col items-center gap-4 lg:justify-start lg:flex-row bg-primary rounded-2xl"
        onSubmit={handleSubmit}
      >
        <h2 class="text-base-100 text-xl uppercase text-center font-semibold">
          {title}
        </h2>
        {inputs &&
          inputs.map(({ placeholder, name }) => (
            <input
              type="text"
              name={name}
              placeholder={placeholder}
              class="bg-transparent border rounded-2xl text-center h-10 w-full flex-grow border-gray-400 placeholder:text-base-100 lg:w-56 lg:text-start md:pl-2"
            />
          ))}
        <button
          class="uppercase bg-secondary rounded-full p-2 text-base-100"
          type="submit"
          disabled={isLoading}
        >
          {button.text}
        </button>
      </form>
    </div>
  );
}

export default EmbellezeNewsLetter;
