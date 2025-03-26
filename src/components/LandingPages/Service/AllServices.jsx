"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAllServicesQuery } from "@/redux/services/service/serviceApi";
import { Empty } from "antd";
import Image from "next/image";
import Link from "next/link";

const AllServices = () => {
  const { data: serviceData, isLoading } = useGetAllServicesQuery();

  const activeServices = serviceData?.results?.filter((item) => item?.status);
  return (
    <section className="my-container">
      {isLoading ? (
        <LoadingAnimation />
      ) : activeServices?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap gap-10 justify-center items-start   mt-10">
          {activeServices?.map((item) => (
            <div
              key={item?._id}
              className="relative flex flex-col lg:w-[315px] mx-auto group"
            >
              <div className="overflow-hidden rounded">
                <Image
                  src={item?.attachment}
                  alt={item?.title ?? "Service Image"}
                  width={315}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded"
                />
              </div>

              <div className="mt-4 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold mb-3">{item?.name}</h4>
                <p className="text-gray-800 text-base leading-relaxed flex-grow">
                  {item?.description}
                </p>

                <p className="text-gray-800 font-medium my-4 text-lg">
                  {" "}
                  Our work includes:
                </p>

                <ul className="list-inside px-5">
                  {item?.list?.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-800 text-base leading-relaxed list-disc"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <Link href={`/contact`}>
                    <button className="w-full py-3 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600 mt-20">
          <Empty size="large" />
          No Services available.
        </div>
      )}
    </section>
  );
};

export default AllServices;
