import ContactBanner from "@/components/LandingPages/Contact/ContactBanner";
import ContactDetails from "@/components/LandingPages/Contact/ContactDetails";
import FeaturedGallery from "@/components/Shared/FeaturedGallery";

export const metadata = {
  title: "Contact - Genesis Carpentry",
  description: "This is the contact page of Genesis Carpentry website.",
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
