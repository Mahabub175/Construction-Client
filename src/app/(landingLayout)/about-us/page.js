import AboutBanner from "@/components/LandingPages/AboutUs/AboutBanner";
import AboutDetails from "@/components/LandingPages/AboutUs/AboutDetails";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "About Us - Genesis Carpenter",
  description: "This is the about us page of Genesis Carpenter website.",
};

const page = () => {
  return (
    <>
      <AboutBanner />
      <AboutDetails />
      <FeaturedGallery />
    </>
  );
};

export default page;
