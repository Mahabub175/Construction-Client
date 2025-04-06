import BackToTop from "@/components/Shared/BackToTop";
import FloatingContact from "@/components/Shared/FloatingContact";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

const LandingLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="lg:-mt-20 xl:mt-0">{children}</div>
      <FloatingContact />
      <BackToTop />
      <Footer />
    </>
  );
};

export default LandingLayout;
