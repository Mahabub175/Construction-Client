"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import PageBanner from "@/components/Shared/PageBanner";
import { useGetSingleWorkBySlugQuery } from "@/redux/services/work/workApi";
import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaAngleLeft, FaAngleRight, FaTimes } from "react-icons/fa";
import "swiper/css";

const SingleWorkDetails = ({ params }) => {
  const swiperRef = useRef();

  const { data: item, isLoading } = useGetSingleWorkBySlugQuery(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeImageName, setActiveImageName] = useState("");

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="mb-20 mt-2">
      <PageBanner image={item?.mainImage} title={item?.name} />
      <div className="max-w-7xl mx-auto px-5 ">
        <div className="columns-2 md:columns-3">
          {item?.images?.map((imageUrl, index) => (
            <div
              key={index}
              className="mb-5 relative group"
              onClick={() => openModal(index)}
            >
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                width={800}
                height={600}
                className="w-full h-auto mb-5 rounded cursor-pointer"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-700 ease-in-out rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20 backdrop-blur-lg pt-20"
          onClick={closeModal}
        >
          <div
            className="relative w-[80%] max-w-4xl lg:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              initialSlide={currentImageIndex}
              onSlideChange={(swiper) => {
                setCurrentImageIndex(swiper.activeIndex);
                setActiveImageName(item?.name);
              }}
              className="mySwiper rounded-lg"
            >
              {item?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={1000}
                    height={800}
                    className="w-[500px] h-[400px] xl:h-[500px] object-cover mx-auto rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-4 text-center text-white flex flex-col">
              <span>{activeImageName}</span>
              <span className="font-semibold">
                {currentImageIndex + 1} / {item?.images?.length}
              </span>
            </div>

            <div className="flex items-center justify-center gap-5 mt-10">
              <button
                className="lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-white text-black border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[38%] lg:top-[40%] -left-8 lg:left-24 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  swiperRef.current.swiper.slidePrev();
                }}
              >
                <FaAngleLeft className="text-xl" />
              </button>
              <button
                className="lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-white text-black border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[38%] lg:top-[40%] -right-8 lg:right-24 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  swiperRef.current.swiper.slideNext();
                }}
              >
                <FaAngleRight className="text-xl" />
              </button>
            </div>

            <button
              className="absolute -top-10 -right-4 lg:right-4 text-white font-bold bg-black rounded-full p-1 hover:bg-red-600 duration-200 z-50"
              onClick={closeModal}
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleWorkDetails;
