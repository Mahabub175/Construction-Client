import AllShops from "@/components/LandingPages/Shop/AllShops";
import ShopBanner from "@/components/LandingPages/Shop/ShopBanner";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Shop - Genesis Carpentry",
  description: "This is the shop page of Genesis Carpentry website.",
};

const page = () => {
  return (
    <>
      <ShopBanner />
      <AllShops />
      <FeaturedGallery />
    </>
  );
};

export default page;
