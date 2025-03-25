"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import PageBanner from "@/components/Shared/PageBanner";
import { useGetSingleWorkBySlugQuery } from "@/redux/services/work/workApi";
import Image from "next/image";
import { useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const SingleWorkDetails = ({ params }) => {
  const { data: item, isLoading } = useGetSingleWorkBySlugQuery(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      prevIndex === 0 ? item?.images?.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="mb-20 mt-2 lg:mt-6">
      <PageBanner image={item?.mainImage} title={item?.name} />
      <div className="max-w-7xl mx-auto px-2 lg:px-5 ">
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
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-md"
          onClick={closeModal}
        >
          <div className="relative w-[80%] max-w-4xl p-4">
            <Image
              src={item?.images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              width={1000}
              height={800}
              className="lg:w-[500px] h-[400px] lg:h-[500px] object-cover mx-auto rounded-lg"
            />
            <div className="mt-4 text-center text-white">
              <span className="font-semibold">
                {currentImageIndex + 1} / {item?.images?.length}
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

export default SingleWorkDetails;
