"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const GalleryBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <>
      <PageBanner
        image={globalData?.results?.galleryBanner}
        title="GALLERY"
        subtitle={"Showcase of our work"}
      />
    </>
  );
};

export default GalleryBanner;
