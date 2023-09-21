import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import type {
  SimulationOrderForm,
  SKU,
  Sla,
} from "deco-sites/std/packs/vtex/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 rounded-[4px] text-primary">
      {methods.map((method) => (
        <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
          <span class="text-button text-center">
            Entrega {method.name}
          </span>
          <span class="text-button">
            até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-base font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
      <span class="text-base-300">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const isSimulation = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
      isSimulation.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col gap-2 border rounded-xl p-4">
      <div
        class="flex items-center justify-start gap-4"
        onClick={() => isSimulation.value = true}
      >
        <Icon id="TRUCK-FAST" width={35} height={35} stroke={"1"} />
        <span>
          Confira o prazo de entrega
        </span>
        <Icon id="ChevronDown" width={25} height={20} class="ml-auto" />
      </div>
      <div>
        {isSimulation.value && (
          <form
            class="join flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulation();
            }}
          >
            <div class="relative w-full h-fit">
              <input
                as="input"
                type="text"
                class="input input-bordered rounded-full relative min-w-full"
                placeholder="Seu cep aqui"
                value={postalCode.value}
                maxLength={8}
                onChange={(e: { currentTarget: { value: string } }) => {
                  postalCode.value = e.currentTarget.value;
                }}
              />
              <Button
                type="submit"
                loading={loading.value}
                class="uppercase rounded-full bg-secondary text-white absolute right-5 z-40 max-h-[20px] min-h-[40px] top-1"
              >
                ok
              </Button>
            </div>
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              class="underline text-primary ml-auto"
              target="_blank"
            >
              Não sei meu CEP
            </a>
          </form>
        )}
      </div>
      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
