"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const AboutBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <>
      <PageBanner
        image={globalData?.results?.aboutBanner}
        title="About"
        subtitle={"Find out more about Genesis Carpentry"}
      />
    </>
  );
};

export default AboutBanner;
