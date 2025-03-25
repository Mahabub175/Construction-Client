import AllWorks from "@/components/LandingPages/Work/AllWorks";
import WorkBanner from "@/components/LandingPages/Work/WorkBanner";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Work - Genesis Carpentry",
  description: "This is the work page of Genesis Carpentry website.",
};

const page = () => {
  return (
    <>
      <WorkBanner />
      <AllWorks />
      <FeaturedGallery />
    </>
  );
};

export default page;
