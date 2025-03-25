import AllGallery from "@/components/LandingPages/Gallery/AllGallery";
import GalleryBanner from "@/components/LandingPages/Gallery/GalleryBanner";

export const metadata = {
  title: "Gallery - Genesis Carpentry",
  description: "This is the gallery page of Genesis Carpentry website.",
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
