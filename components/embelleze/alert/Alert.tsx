import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="relative">
      <Slider class="carousel carousel-center bg-primary gap-6 w-[80vw] lg:w-[40vw]">
        <Slider.PrevButton class="bg-transparent absolute left-0 my-auto mx-0 h-[30px]">
          <Icon
            class="text-base-100"
            size={15}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-secondary-content flex justify-center items-center h-[30px] w-[80vw] lg:w-[40vw] relative text-[0.7em]">
              {alert}
            </span>
          </Slider.Item>
        ))}
        <Slider.NextButton class="bg-transparent absolute right-0 my-auto mx-0 h-[30px]">
          <Icon
            class="text-base-100"
            size={20}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default Alert;
