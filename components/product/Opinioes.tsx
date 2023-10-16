import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Testimonials from "deco-sites/fashion/sections/Content/EmbellezeTestimonials.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";

declare global {
  interface Window {
    _trustvox: Array<[string, string | string[]]>;
  }
}

type Props = {
  productId: string;
  productName: string;
  urlImage: string;
};

interface Opinion {
  id: number;
  opinion_title?: string;
  opinion: string;
  rate: number;
  locale: string;
  created_at: string;
  upvotes_count: number;
  downvotes_count: number;
  third_party: boolean;
  user: {
    name: string;
  };
  sale_item: {
    id: number;
  };
  recommends: string;
  review_photos: {
    thumbnail: string;
    image: string;
  }[];
  translations: unknown[]; // Dependendo do uso real, isso pode ser tipado mais especificamente
  sale: {
    created_at: string;
  };
  comments: {
    text: string;
  }[];
  links: {
    rel: string;
    href: string;
  }[];
}

interface ApiResponse {
  items: Opinion[];
  links: {
    rel: string;
    href: string;
  }[];
}

function Opinioes({ productId, productName, urlImage }: Props) {
  const opnioes = useSignal<ApiResponse>({ items: [], links: [] });
  const { productReview, productReviewQuantity } = useUI();

  const apiFetch = async () => {
    const appUrl = "https://trustvox.com.br";
    const url = new URL(
      window.location.href,
    );
    const store_id = "117642";
    const apiUrl =
      `${appUrl}/widget/opinions?code=${productId}&store_id=${store_id}&url=${url}&name=${productName}`;
    const response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/vnd.trustvox-v2+json",
      },
    });
    const data = await response.json();
    productReview.value = Math.round(
      data.items.reduce((acc: number, curr: Opinion) => acc += curr.rate, 0) /
        data.items.length,
    );
    productReviewQuantity.value = data.items.length;
    opnioes.value = data;
  };

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <div>
      {opnioes.value.items.length > 0 && (
        <Testimonials
          section={opnioes.value.items}
          title="Avaliações"
          description="o que dizem sobre este produto:"
        />
      )}
    </div>
  );
}

export default Opinioes;
