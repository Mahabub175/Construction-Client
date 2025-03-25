import AllWorks from "@/components/LandingPages/Work/AllWorks";
import WorkBanner from "@/components/LandingPages/Work/WorkBanner";

export const metadata = {
  title: "Work - Genesis Carpentry",
  description: "This is the work page of Genesis Carpentry website.",
};

const page = () => {
  return (
    <>
      <WorkBanner />
      <AllWorks />
    </>
  );
};

export default page;
