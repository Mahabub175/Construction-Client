import SingleWorkDetails from "@/components/LandingPages/Work/SingleWorkDetails";

const page = ({ params }) => {
  return (
    <>
      <SingleWorkDetails params={params?.workId} />
    </>
  );
};

export default page;
