"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const ServiceBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <>
      <PageBanner
        image={globalData?.results?.serviceBanner}
        heading={"Providing Carpentry, Renovation, 2d Plan & 3D Design"}
        title="SERVICES"
        subtitle={"Residences  | Commercial  | Hospitality"}
      />
    </>
  );
};

export default ServiceBanner;
