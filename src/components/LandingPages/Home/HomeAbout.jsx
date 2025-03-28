"use client";

import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import Link from "next/link";

const HomeAbout = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <section className="max-w-7xl mx-auto px-5 mb-16 lg:mb-20 flex flex-col lg:flex-row items-center justify-between lg:gap-10 lg:mt-24">
      <div>
        <h4 className="text-3xl lg:text-4xl font-medium mb-4 tracking-widest text-primary">
          {globalData?.results?.name}
        </h4>
        <p className="leading-relaxed mb-6 font-medium text-lg">
          {globalData?.results?.businessSlogan}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6 lg:w-5/6">
          {globalData?.results?.description}
        </p>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div>
          <p className="mb-2 font-bold">Phone</p>
          <Link
            href={`tel:${globalData?.results?.businessNumber ?? "/"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary duration-300 inline-block"
          >
            {globalData?.results?.businessNumber}
          </Link>
        </div>
        <div className="mb-5">
          <p className="font-bold mb-2">Location</p>
          <Link
            href={globalData?.results?.businessLocation ?? "/"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary duration-300 inline-block"
          >
            {globalData?.results?.businessAddress}
          </Link>
        </div>
        <div>
          <Link
            href={`/contact`}
            className="px-10 py-4 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
