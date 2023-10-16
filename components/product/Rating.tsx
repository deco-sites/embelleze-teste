import { star, starVazia } from "$store/components/Content/svg.tsx";
import { useUI } from "$store/sdk/embelleze/useUI.ts";

function Rating() {
  const { productReview, productReviewQuantity } = useUI();
  const starArray = [1, 2, 3, 4, 5];

  return (
    <div class=" w-fit h-10 rounded-lg flex items-center gap-2">
      {starArray.map((value) => (
        <span
          key={value}
          class="inline-block w-fit h-fit"
        >
          {value <= productReview.value ? star : starVazia}
        </span>
      ))}
      <span>{`(${productReviewQuantity.value})`}</span>
    </div>
  );
}

export default Rating;
