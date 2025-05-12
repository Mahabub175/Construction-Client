"use client";

import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import FeaturedBanner from "./FeaturedBanner";
import whyUs from "@/assets/images/whyUs.png";
import Image from "next/image";
import { whyUsData } from "@/assets/data/homeData";
import Link from "next/link";

const WhyUs = () => {
  const { data: sliders } = useGetAllSlidersQuery();

  const featuredBanners = sliders?.results?.filter(
    (item) => item?.status && item?.bottomBanner && item?.attachment
  );

  return (
    <section>
      {featuredBanners?.[3] && (
        <FeaturedBanner
          image={featuredBanners[3].attachment}
          title="Superior Craftsmanship"
          subtitle={
            "We are committed to providing the best craftsmanship at a highly affordable value for all homeowners."
          }
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
          <h5 className="text-2xl font-medium mb-1 tracking-widest">
            Renovation & Carpentry Services
          </h5>
          <h6 className="text-xl font-medium mb-4 tracking-widest">
            For Residential And Commercial
          </h6>
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
              View Services
            </Link>
          </div>
        </div>
      </div>
      {featuredBanners?.[4] && (
        <FeaturedBanner
          image={featuredBanners[4].attachment}
          title="Direct Carpentry Service"
          subtitle={"Specializing in quality woodwork for home renovations"}
        />
      )}
    </section>
  );
};

export default WhyUs;
