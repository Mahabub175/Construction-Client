import Banner from "@/components/LandingPages/Home/Banner";
import HomeAbout from "@/components/LandingPages/Home/HomeAbout";
import HomeContact from "@/components/LandingPages/Home/HomeContact";
import NewsletterBanner from "@/components/LandingPages/Home/NewsletterBanner";
import Services from "@/components/LandingPages/Home/Services";
import WhyUs from "@/components/LandingPages/Home/WhyUs";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Genesis Carpentry",
  description: "This is the homepage of Genesis Carpentry website.",
};

const page = async () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <HomeAbout />
      <WhyUs />
      <Services />
      <FeaturedGallery />
      <HomeContact />
      <NewsletterBanner />
    </div>
  );
};

export default page;
