import Banner from "@/components/LandingPages/Home/Banner";
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
      <WhyUs />
      <Services />
      <FeaturedGallery />
      <NewsletterBanner />
    </div>
  );
};

export default page;
