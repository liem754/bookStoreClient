import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useState } from "react";
import { list } from "@/ultils/icons";

const Slider = () => {
  const [hove, setHove] = useState(false);

  return (
    <div
      onMouseEnter={() => setHove(true)}
      onMouseLeave={() => setHove(false)}
      className="slide-container relative"
    >
      <Swiper
        grabCursor={true}
        effect="cube"
        spaceBetween={30}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{}}
        loop={true}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
      >
        {list &&
          list.map((item: any) => (
            <SwiperSlide key={item._id}>
              <div className="flex w-full justify-center">
                <div className="h-[450px] w-full">
                  <img className="h-[100%] w-[100%]" src={item.image} alt="" />
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
