"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const ServiceBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <>
      <PageBanner
        image={globalData?.results?.serviceBanner}
        title="SERVICES"
        subtitle={"Luxury Residences  | Commercial  | Hospitality"}
      />
    </>
  );
};

export default ServiceBanner;
