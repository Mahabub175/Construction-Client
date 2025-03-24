import BackToTop from "@/components/Shared/BackToTop";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

const LandingLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <BackToTop />

      <Footer />
    </>
  );
};

export default LandingLayout;
