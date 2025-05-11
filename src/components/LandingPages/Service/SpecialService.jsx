"use client";

import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import FeaturedBanner from "../Home/FeaturedBanner";

const SpecialService = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <div className="my-20">
      <FeaturedBanner
        image={globalData?.results?.serviceBanner}
        title="Genesis Handyman Services"
      />
      <div className="my-container mb-20 -mt-5 lg:-mt-10">
        <p className="text-gray-600 font-medium mb-10 tracking-widest">
          Here Our mission is to provide exceptional handyman services that meet
          the highest standards of quality and reliability. We understand that
          your time and home are valuable, which is why we strive to complete
          every job efficiently and to your satisfaction.
        </p>
        <p className="text-gray-600 font-medium mb-4 tracking-widest">
          Genesis Handyman Services, we take pride in our attention to detail
          and customer-centric approach. Our comprehensive handyman services
          include electrical work, plumbing, painting, replacement services, and
          much more. Whether you need a quick fix or a complete home improvement
          project, our reliable and professional team is here to help.
        </p>
        <div className="flex flex-wrap gap-8 justify-center lg:justify-between items-center font-medium text-lg">
          <p>Experienced</p>
          <p>Quality Handyman Service</p>
          <p>Affordable Price</p>
        </div>
        <div className="mt-10 flex justify-center items-center">
          <button className="px-10 py-3 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300">
            View Handyman Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialService;
