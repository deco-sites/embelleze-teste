import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Testimonials from "deco-sites/fashion/sections/Content/EmbellezeTestimonials.tsx";

declare global {
  interface Window {
    _trustvox: Array<[string, string | string[]]>;
  }
}

interface ApiResponse {
  links: { rel: string; href: string }[];
  items: {
    id: number;
    text: string;
    rate: number;
    created_at: string;
    client: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
    };
  }[];
}

interface Section {
  user: { name: string };
  opinion: string | undefined;
  comments: { text: string }[];
  rate: number;
}

function StoreReviews() {
  const opnioes = useSignal<Section[]>([]);

  function transformData(inputData: ApiResponse): Section[] {
    const sections: Section[] = inputData.items.map((item) => {
      const user = {
        name: `${item.client.first_name} ${item.client.last_name}`,
      };
      const opinion = item.text ===
          "<em>(cliente não deixou opinião, apenas deu sua nota à loja)</em>"
        ? undefined
        : item.text;
      const comments = [] as [];
      return {
        user,
        opinion,
        comments,
        rate: item.rate,
      };
    });
    return sections;
  }

  const apiFetch = async () => {
    const appUrl = "https://trustvox.com.br";
    const store_id = "117642";
    const apiUrl = `${appUrl}/api/stores/${store_id}/store_reviews`;
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.trustvox.com; version=1",
        "Authorization": "token grbhzawUzvDjRYafMaTJ",
      },
    });
    const data = await response.json();
    const sections: Section[] = transformData(data);
    opnioes.value = sections;
  };

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <div>
      {opnioes.value.length > 0 && (
        <Testimonials
          section={opnioes.value}
          title="Depoimentos"
          description="O que dizem sobre os nossos produtos:"
        />
      )}
    </div>
  );
}

export default StoreReviews;
