import Banner from "@/components/LandingPages/Home/Banner";
import Brands from "@/components/LandingPages/Home/Brands";
import HomeAbout from "@/components/LandingPages/Home/HomeAbout";
import HomeContact from "@/components/LandingPages/Home/HomeContact";
import NewsletterBanner from "@/components/LandingPages/Home/NewsletterBanner";
import Shops from "@/components/LandingPages/Home/Shops";
import WhyUs from "@/components/LandingPages/Home/WhyUs";
import Works from "@/components/LandingPages/Home/Works";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Genesis Carpenter",
  description: "This is the homepage of Genesis Carpenter website.",
};

const page = async () => {
  return (
    <>
      <Banner />
      <HomeAbout />
      <WhyUs />
      <Works />
      <Shops />
      <FeaturedGallery />
      <HomeContact />
      <Brands />
      <NewsletterBanner />
    </>
  );
};

export default page;
