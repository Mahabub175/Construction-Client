"use client";

import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import FeaturedBanner from "./FeaturedBanner";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const WhyUs = () => {
  const { data: sliders } = useGetAllSlidersQuery();
  const { data: globalData } = useGetAllGlobalSettingQuery();

  const featuredBanners = sliders?.results?.filter(
    (item) => item?.status && item?.bottomBanner && item?.attachment
  );

  return (
    <section>
      {featuredBanners?.[0] && (
        <FeaturedBanner
          image={featuredBanners[0].attachment}
          title="Superior Craftsmanship"
        />
      )}
      {featuredBanners?.[1] && (
        <FeaturedBanner
          image={featuredBanners[1].attachment}
          title="Luxury Residences  | Commercial  | Hospitality"
          subtitle="Miami | Miami Beach | Coral Gables | Doral | Aventura | Sunny Isles"
          logo={globalData?.results?.logo}
        />
      )}
    </section>
  );
};

export default WhyUs;
