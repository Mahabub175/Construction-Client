"use client";

import about1 from "@/assets/images/about1.jpg";
import about2 from "@/assets/images/about2.jpg";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import {
  fallbackAboutUs1,
  fallbackAboutUs2,
  paragraphClass,
} from "@/assets/data/homeData";

const AboutDetails = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  const aboutUs1 = (() => {
    const data = globalData?.results?.aboutUsDetails1;
    if (!data) return fallbackAboutUs1;
    if (Array.isArray(data)) return data.length ? data : fallbackAboutUs1;
    return data.trim() ? [data] : fallbackAboutUs1;
  })();

  const aboutUs2 = (() => {
    const data = globalData?.results?.aboutUsDetails2;
    if (!data) return fallbackAboutUs2;
    if (Array.isArray(data)) return data.length ? data : fallbackAboutUs2;
    return data.trim() ? [data] : fallbackAboutUs2;
  })();

  return (
    <section className="max-w-6xl mx-auto px-5">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-end">
        <div className="lg:w-4/6">
          <h2 className="text-xl lg:text-2xl font-medium tracking-widest text-center">
            A COMPANY FOR RENOVATION & CARPENTRY SPECIALIZED ON YOU
          </h2>

          <Image
            src={globalData?.results?.logo ?? logo}
            alt="logo"
            width={200}
            height={200}
            className="mx-auto -my-5 lg:my-0"
          />

          <>
            {aboutUs1?.map((text, index) => (
              <p key={index} className={paragraphClass}>
                {text}
              </p>
            ))}
          </>
        </div>

        <div>
          <Image
            src={globalData?.results?.aboutImage1 ?? about1}
            alt="about1"
            width={500}
            height={500}
            className="rounded"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:gap-10 items-center mt-10 lg:mt-20">
        <div>
          {aboutUs2?.map((text, index) => (
            <p key={index} className={paragraphClass}>
              {text}
            </p>
          ))}
        </div>

        <div>
          <Image
            src={globalData?.results?.aboutImage2 ?? about2}
            alt="about2"
            width={500}
            height={500}
            className="rounded"
          />
        </div>
      </div>

      <div className="mt-10 lg:mt-20">
        <h2 className="text-2xl font-medium tracking-widest text-center mb-6">
          Ready For A Remodel?
        </h2>
        <p className="text-gray-600 font-medium mb-1 tracking-widest">
          Lifetime Remodeling Systems is proud to offer a full line of
          remodeling services for our clients including kitchen, bath and full
          scale interior remodel. Whether you’re dreaming of a new master
          bathroom, a kitchen refresh,living room, office, restaurant or wish to
          change the interior layout of your home our expert team is able
          execute your remodeling vision. Contact Us to set up a free in-home
          consultation with our remodeling consultant and set your dream
          remodeling plans in motion!
        </p>
        <p className="text-gray-600 font-medium mb-1 tracking-widest">
          Reputable, stable remodeling services.
        </p>
      </div>
    </section>
  );
};

export default AboutDetails;
