import SingleBlogDetails from "@/components/LandingPages/Blog/SingleBlogDetails";

export const metadata = {
  title: "Blog Details - Genesis Carpenter",
  description: "This is the blog details page of Genesis Carpenter website.",
};

const page = ({ params }) => {
  return (
    <>
      <SingleBlogDetails params={params?.blogId} />
    </>
  );
};

export default page;
