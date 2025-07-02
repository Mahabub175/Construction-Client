"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import { GoArrowUpRight } from "react-icons/go";

const slides = [
  {
    title: "Leaderboards",
    subtitle: "SEAL Leaderboards: Expert-Driven Private Evaluations",
    image: "",
    link: "",
  },
  {
    title: "Research",
    subtitle: "LLMs Easily Jailbroken as Browser Agents",
    image: "",
    link: "",
  },
  {
    title: "Research",
    subtitle: "Multi-Turn Human Jailbreaks on LLM Defenses",
    image: "",
    link: "",
  },
  {
    title: "Research",
    subtitle: "Examination of LLM Performance on Grade School Arithmetic",
    image: "",
    link: "",
  },
  {
    title: "Research",
    subtitle: "Examination of LLM Performance on Grade School Arithmetic",
    image: "",
    link: "",
  },
  {
    title: "Research",
    subtitle: "Examination of LLM Performance on Grade School Arithmetic",
    image: "",
    link: "",
  },
  {
    title: "Research",
    subtitle: "Examination of LLM Performance on Grade School Arithmetic",
    image: "",
    link: "",
  },
];

const ResearchSlider = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        loop={false}
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1.25,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2.25,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 3.25,
            spaceBetween: 16,
          },
        }}
        className="!pl-10 !px-0 md:!px-20 xl:!px-52 xxl:!px-96 !pb-8"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`group bg-black rounded-lg text-left relative flex items-center gap-2 p-5 sm:p-3`}
            >
              <Image
                src={
                  slide.image ||
                  "https://st3.depositphotos.com/1350793/14897/i/450/depositphotos_148976937-stock-photo-demo-concept-with-hand.jpg"
                }
                alt={slide.title}
                width={72}
                height={64}
                className="w-[72px] h-[64px] sm:w-[80px] sm:h-[72px] object-cover flex-shrink-0 rounded-md"
              />
              <div className="flex flex-col">
                <p className="text-xs font-medium truncate text-gray-300">
                  {slide.title}
                </p>
                <p className="text-sm font-semibold line-clamp-2 text-white">
                  {slide.subtitle}
                </p>
              </div>
              <div className="absolute flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 group-hover:bg-white duration-500 text-white group-hover:text-black border border-white/50 bg-black rounded-full pointer-events-none right-2 bottom-2">
                <GoArrowUpRight />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ResearchSlider;
