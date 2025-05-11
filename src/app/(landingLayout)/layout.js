import BackToTop from "@/components/Shared/BackToTop";
import FloatingContact from "@/components/Shared/FloatingContact";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

const LandingLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-14 lg:mt-[5.6rem]">{children}</div>
      <FloatingContact />
      <BackToTop />
      <Footer />
    </>
  );
};

export default LandingLayout;
