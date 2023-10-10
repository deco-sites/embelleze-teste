import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-center items-center gap-2 text-black font-semibold">
        {remaining > 0
          ? (
            <span>
              Faltam{" "}
              <strong class="text-secondary">
                {formatPrice(remaining, currency, locale)}
              </strong>{" "}
              para o{" "}
              <strong class="text-primary uppercase">frete grátis!</strong>
            </span>
          )
          : <span>Você ganhou frete grátis!</span>}
      </div>
      <progress
        class="progress progress-secondary w-11/12 m-auto"
        value={percent}
        max={100}
      />
    </div>
  );
}

export default FreeShippingProgressBar;
