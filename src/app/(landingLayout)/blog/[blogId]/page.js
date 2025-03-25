import SingleBlogDetails from "@/components/LandingPages/Blog/SingleBlogDetails";

export const metadata = {
  title: "Blog Details - Genesis Carpentry",
  description: "This is the blog details page of Genesis Carpentry website.",
};

const page = ({ params }) => {
  return (
    <>
      <SingleBlogDetails params={params?.blogId} />
    </>
  );
};

export default page;
