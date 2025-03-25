"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAllGalleriesQuery } from "@/redux/services/gallery/galleryApi";
import { Empty } from "antd";
import Image from "next/image";
import { useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const FeaturedGallery = () => {
  const { data: galleryData, isLoading } = useGetAllGalleriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? activeGalleries?.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === activeGalleries?.length - 1 ? 0 : prevIndex + 1
    );
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
    <section className="mb-20 mt-2">
      <div className="border-y pt-5 my-container">
        <h3 className="text-primary font-medium text-center text-2xl mb-5">
          Featured Images
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {activeGalleries?.map((galleryItem, index) => (
            <div
              key={galleryItem._id}
              className="mb-5 relative group h-[200px] w-[165px] md:w-[200px] overflow-hidden rounded-md cursor-pointer"
              onClick={() => openModal(index)}
            >
              <Image
                src={galleryItem.attachment}
                alt={galleryItem.name}
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
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-md"
          onClick={closeModal}
        >
          <div className="relative w-[80%] max-w-4xl p-4">
            <Image
              src={activeGalleries[currentImageIndex].attachment}
              alt={activeGalleries[currentImageIndex].name}
              width={1000}
              height={800}
              className="lg:w-[500px] h-[400px] lg:h-[500px] object-cover mx-auto rounded-lg"
            />
            <div className="mt-4 text-center text-white flex flex-col">
              <span>{activeGalleries[currentImageIndex]?.name}</span>
              <span className="font-semibold">
                {currentImageIndex + 1} / {activeGalleries.length}
              </span>
            </div>
            <div
              className="absolute -left-8 lg:left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer text-white"
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousImage();
              }}
            >
              <IoIosArrowDropleftCircle className="text-2xl hover:text-gray-300 hover:scale-105 duration-300" />
            </div>
            <div
              className="absolute -right-8 lg:right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer text-white"
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
            >
              <IoIosArrowDroprightCircle className="text-2xl hover:text-gray-300 hover:scale-105 duration-300" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedGallery;
