"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const WorkBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <div>
      <PageBanner
        image={globalData?.results?.workBanner}
        title="PORTFOLIO"
        subtitle={"ARCHITECTURAL WOODWORK & LUXURY MILLWORK"}
      />
    </div>
  );
};

export default WorkBanner;
