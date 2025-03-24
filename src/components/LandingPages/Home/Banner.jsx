"use client";

import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const Banner = () => {
  const { data: sliders } = useGetAllSlidersQuery();

  const activeSliders = sliders?.results?.filter((item) => item.status);

  return (
    <section className="relative mb-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper lg:max-h-[700px]"
      >
        {activeSliders?.map((item) => {
          return (
            <SwiperSlide key={item?._id}>
              <Link href={"/"}>
                <Image
                  src={
                    item?.attachment ??
                    "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                  }
                  alt={item?.name ?? "banner"}
                  width={2500}
                  height={700}
                  className="w-full lg:object-contain h-[250px] lg:h-full"
                  priority
                />
                <div className="absolute z-10 top-20 lg:top-[45%] left-[5%]">
                  {item?.name && (
                    <h2 className="text-primary text-3xl lg:text-7xl font-bold mb-2 lg:mb-6">
                      {item?.name}
                    </h2>
                  )}
                  {item?.buttonText && (
                    <button className="bg-primary px-5 py-2 lg:px-10 lg:py-4 lg:text-xl font-bold text-white rounded-xl">
                      {item?.buttonText}
                    </button>
                  )}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Banner;
