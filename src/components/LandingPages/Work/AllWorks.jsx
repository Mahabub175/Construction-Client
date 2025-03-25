"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAllWorksQuery } from "@/redux/services/work/workApi";
import { Empty } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AllWorks = () => {
  const { data: workData, isLoading } = useGetAllWorksQuery();

  const activeWorks = workData?.results?.filter((item) => item?.status);

  return (
    <section className="mb-20 my-container -mt-5 lg:-mt-10">
      {isLoading ? (
        <LoadingAnimation />
      ) : activeWorks?.length > 0 ? (
        activeWorks?.map((work, workIndex) => (
          <div
            key={work._id}
            className="relative overflow-hidden mb-10 lg:mb-20 first:border-y-0 first:border-b border-y py-5 lg:py-10"
          >
            <h3 className="mb-10 text-center text-xl font-medium">
              {work?.name}
            </h3>

            <Swiper
              modules={[Autoplay, Navigation]}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 2000 + workIndex * 500,
                disableOnInteraction: false,
              }}
              navigation={true}
              className="mySwiper"
            >
              {work?.images.map((imageUrl, index) => (
                <SwiperSlide key={`${work._id}-${index}`} className="relative">
                  <Image
                    src={imageUrl}
                    alt={work.name}
                    width={2500}
                    height={700}
                    className="w-full h-[200px] md:h-[350px] object-cover"
                    priority
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-center mt-10 mb-4">
              <Link
                href={`/work/${work.slug}`}
                className="px-10 py-2 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg text-gray-600 mt-20">
          <Empty size="large" />
          No Works available.
        </div>
      )}
    </section>
  );
};

export default AllWorks;
