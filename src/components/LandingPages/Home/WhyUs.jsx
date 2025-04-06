"use client";

import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import FeaturedBanner from "./FeaturedBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import whyUs from "@/assets/images/whyUs.png";
import Image from "next/image";
import { whyUsData } from "@/assets/data/homeData";
import Link from "next/link";

const WhyUs = () => {
  const { data: sliders } = useGetAllSlidersQuery();
  const { data: globalData } = useGetAllGlobalSettingQuery();

  const featuredBanners = sliders?.results?.filter(
    (item) => item?.status && item?.bottomBanner && item?.attachment
  );

  return (
    <section>
      {featuredBanners?.[0] && (
        <FeaturedBanner
          image={featuredBanners[0].attachment}
          title="Superior Craftsmanship"
        />
      )}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-10 lg:mb-20 my-container">
        <Image
          src={whyUs}
          alt="why us"
          width={500}
          height={600}
          className="mx-auto mt-10 lg:mt-0"
        />
        <div className="lg:w-[45%] mx-auto">
          <h4 className="text-xl lg:text-3xl font-medium mb-4 tracking-widest">
            {whyUsData?.name}
          </h4>
          <p className="text-gray-600 leading-relaxed mb-6">
            {whyUsData?.description}
          </p>
          <ul className="list-inside px-5 mb-10">
            {whyUsData?.lists?.map((item, index) => (
              <li
                key={index}
                className="text-gray-800 text-base leading-relaxed list-disc"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="flex justify-center lg:justify-start">
            <Link
              href={`/service`}
              className="px-10 py-2 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300"
            >
              Services
            </Link>
          </div>
        </div>
      </div>
      {featuredBanners?.[1] && (
        <FeaturedBanner
          image={featuredBanners[1].attachment}
          title="Luxury Residences  | Commercial  | Hospitality"
          subtitle="Miami | Miami Beach | Coral Gables | Sunny Isles"
          logo={globalData?.results?.logo}
        />
      )}
    </section>
  );
};

export default WhyUs;
