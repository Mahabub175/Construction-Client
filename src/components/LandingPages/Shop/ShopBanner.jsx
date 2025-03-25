"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const ShopBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <>
      <PageBanner
        image={globalData?.results?.shopBanner}
        title="Shop"
        subtitle={"Choose your favorite design from our shop"}
      />
    </>
  );
};

export default ShopBanner;
