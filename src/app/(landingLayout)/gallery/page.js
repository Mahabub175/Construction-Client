import AllGallery from "@/components/LandingPages/Gallery/AllGallery";
import GalleryBanner from "@/components/LandingPages/Gallery/GalleryBanner";

export const metadata = {
  title: "Gallery - Genesis Carpenter",
  description: "This is the gallery page of Genesis Carpenter website.",
};

const page = () => {
  return (
    <>
      <GalleryBanner />
      <AllGallery />
    </>
  );
};

export default page;
