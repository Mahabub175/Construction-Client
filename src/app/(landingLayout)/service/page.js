import AllServices from "@/components/LandingPages/Service/AllServices";
import ServiceBanner from "@/components/LandingPages/Service/ServiceBanner";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Service - Genesis Carpentry",
  description: "This is the service page of Genesis Carpentry website.",
};

const page = () => {
  return (
    <>
      <ServiceBanner />
      <AllServices />
      <FeaturedGallery />
    </>
  );
};

export default page;
