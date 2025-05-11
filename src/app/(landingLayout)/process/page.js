import ProcessBanner from "@/components/LandingPages/Process/ProcessBanner";
import ProcessSteps from "@/components/LandingPages/Process/ProcessSteps";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Process - Genesis Carpenter",
  description: "This is the process page of Genesis Carpenter website.",
};
const page = () => {
  return (
    <>
      <ProcessBanner />
      <ProcessSteps />
      <FeaturedGallery />
    </>
  );
};

export default page;
