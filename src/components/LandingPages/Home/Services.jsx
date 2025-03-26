"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAllServicesQuery } from "@/redux/services/service/serviceApi";
import { Empty } from "antd";
import Image from "next/image";
import Link from "next/link";

const Services = () => {
  const { data: serviceData, isLoading } = useGetAllServicesQuery();

  const activeServices = serviceData?.results?.filter((item) => item?.status);

  return (
    <section className="my-container mb-5 lg:-mb-10">
      {isLoading ? (
        <LoadingAnimation />
      ) : activeServices?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap gap-10 justify-center items-start mt-10">
          {activeServices?.map((item) => (
            <Link
              href={`/work`}
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
                <h4 className="text-xl font-medium text-center">
                  {item?.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600 mt-20">
          <Empty size="large" />
          No Services available.
        </div>
      )}
      <div className="flex justify-center mt-10 mb-4 border-t pt-10 lg:pt-10">
        <Link
          href={`/work`}
          className="px-10 py-2 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300"
        >
          View Works
        </Link>
      </div>
    </section>
  );
};

export default Services;
