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
        <div class="max-w-[284px]">
        <PCard
          product={product}
          mobileBigCard={true}
          buttonColor="#17A087"
          color="#552B9A"
          />
          </div>
      ))}
    </div>
  );
}

export default ProductGallery;
