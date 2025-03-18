import Banner from "@/components/LandingPages/Home/Banner";
import NewsletterBanner from "@/components/LandingPages/Home/NewsletterBanner";

export const metadata = {
  title: "Home | Viscart",
  description: "This is the homepage of Viscart website.",
};

const page = async () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <NewsletterBanner />
    </div>
  );
};

export default page;
