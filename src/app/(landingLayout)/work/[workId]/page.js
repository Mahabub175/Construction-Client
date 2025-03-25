import SingleWorkDetails from "@/components/LandingPages/Work/SingleWorkDetails";

export const metadata = {
  title: "Work Details - Genesis Carpentry",
  description: "This is the work details page of Genesis Carpentry website.",
};

const page = ({ params }) => {
  return (
    <>
      <SingleWorkDetails params={params?.workId} />
    </>
  );
};

export default page;
