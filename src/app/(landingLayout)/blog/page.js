import AllBlogs from "@/components/LandingPages/Blog/AllBlogs";
import BlogBanner from "@/components/LandingPages/Blog/BlogBanner";

export const metadata = {
  title: "Blog - Genesis Carpenter",
  description: "This is the blog page of Genesis Carpenter website.",
};

const page = () => {
  return (
    <>
      <BlogBanner />
      <AllBlogs />
    </>
  );
};

export default page;
