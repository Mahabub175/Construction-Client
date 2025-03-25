"use client";

import PageBanner from "@/components/Shared/PageBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const BlogBanner = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <div>
      <PageBanner
        image={globalData?.results?.blogBanner}
        title="BLOG"
        subtitle={"Latest News & Articles"}
      />
    </div>
  );
};

export default BlogBanner;
