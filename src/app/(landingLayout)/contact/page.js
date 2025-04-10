import ContactBanner from "@/components/LandingPages/Contact/ContactBanner";
import ContactDetails from "@/components/LandingPages/Contact/ContactDetails";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Contact - Genesis Carpenter",
  description: "This is the contact page of Genesis Carpenter website.",
};

const page = () => {
  return (
    <>
      <ContactBanner />
      <ContactDetails />
      <FeaturedGallery />
    </>
  );
};

export default page;
