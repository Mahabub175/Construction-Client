"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const ServiceBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <div>
      <PageBanner
        image={globalData?.results?.serviceBanner}
        title="SERVICES"
        subtitle={"LUXURY RESIDENCES  | COMMERCIAL  | HOSPITALITY"}
      />
    </div>
  );
};

export default ServiceBanner;
