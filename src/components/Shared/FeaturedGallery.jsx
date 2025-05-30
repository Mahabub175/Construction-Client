"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAllGalleriesQuery } from "@/redux/services/gallery/galleryApi";
import { Empty } from "antd";
import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaAngleLeft, FaAngleRight, FaTimes } from "react-icons/fa";
import "swiper/css";

const FeaturedGallery = () => {
  const swiperRef = useRef();

  const { data: galleryData, isLoading } = useGetAllGalleriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeImageName, setActiveImageName] = useState("");

  const activeGalleries = galleryData?.results?.filter(
    (item) => item?.status && item?.isFeatured
  );

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

  if (!activeGalleries || activeGalleries.length === 0) {
    return (
      <section className="mb-20">
        <div className="text-center text-lg text-gray-600 mt-20">
          <Empty size="large" />
          No Gallery Image available.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-20 mt-10 lg:mt-20">
      <div className="border-y pt-5 my-container">
        <h3 className="text-primary font-medium text-center text-2xl mb-5">
          Featured Images
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-5">
          {activeGalleries?.map((galleryItem, index) => (
            <div
              key={galleryItem?._id}
              className="mb-5 relative group h-[200px] w-[160px] md:w-[200px] overflow-hidden rounded-md cursor-pointer"
              onClick={() => openModal(index)}
            >
              <Image
                src={galleryItem?.attachment}
                alt={galleryItem?.name ?? "Gallery Image"}
                width={800}
                height={600}
                className="w-fit lg:w-[200px] h-[200px] mb-5 rounded cursor-pointer mx-auto object-cover"
              />
              {galleryItem.name && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-xs">
                  {galleryItem.name}
                </div>
              )}
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
                setActiveImageName(activeGalleries[swiper.activeIndex]?.name);
              }}
              className="mySwiper rounded-lg"
            >
              {activeGalleries.map((galleryItem, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={galleryItem.attachment}
                    alt={galleryItem.name}
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
                {currentImageIndex + 1} / {activeGalleries.length}
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

export default FeaturedGallery;
