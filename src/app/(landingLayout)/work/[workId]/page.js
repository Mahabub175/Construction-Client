import SingleWorkDetails from "@/components/LandingPages/Work/SingleWorkDetails";

export const metadata = {
  title: "Work Details - Genesis Carpenter",
  description: "This is the work details page of Genesis Carpenter website.",
};

const page = ({ params }) => {
  return (
    <>
      <SingleWorkDetails params={params?.workId} />
    </>
  );
};

export default page;
