import { Product } from "apps/commerce/types.ts";

import { PCard } from "$store/components/Content/CarouselProducts.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
}

function ProductGallery({ products }: Props) {
  return (
    <div class="grid grid-cols-2 items-center lg:grid-cols-3 gap-10">
      {products?.map((product, index) => (
        <PCard
          product={product}
          mobileBigCard={true}
          buttonColor=""
          color=""
        />
      ))}
    </div>
  );
}

export default ProductGallery;
