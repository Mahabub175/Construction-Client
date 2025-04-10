import Banner from "@/components/LandingPages/Home/Banner";
import HomeAbout from "@/components/LandingPages/Home/HomeAbout";
import HomeContact from "@/components/LandingPages/Home/HomeContact";
import NewsletterBanner from "@/components/LandingPages/Home/NewsletterBanner";
import Services from "@/components/LandingPages/Home/Services";
import WhyUs from "@/components/LandingPages/Home/WhyUs";
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
      <Services />
      <FeaturedGallery />
      <HomeContact />
      <NewsletterBanner />
    </>
  );
};

export default page;
