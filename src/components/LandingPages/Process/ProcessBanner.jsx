"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const ProcessBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <>
      <PageBanner
        image={globalData?.results?.galleryBanner}
        title="PROCESS"
        subtitle={"FROM START TO FINISH OUR EASY 5 STEP PROCESS"}
      />
    </>
  );
};

export default ProcessBanner;
