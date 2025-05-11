"use client";

import about1 from "@/assets/images/about1.jpg";
import about2 from "@/assets/images/about2.jpg";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const AboutDetails = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <section className="max-w-6xl mx-auto px-5">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-end">
        <div className="lg:w-4/6">
          <h2 className="text-xl lg:text-2xl font-medium tracking-widest text-center">
            A COMPANY FOR RENOVATION & CARPENTRY SPECIALIZED ON YOU
          </h2>
          <Image
            src={globalData?.results?.logo ?? logo}
            alt="logo"
            width={200}
            height={200}
            className="mx-auto -my-5 lg:my-0"
          />
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            Genesis Carpenter is renovation and carpentry based Company in
            Singapore with an exceptional for providing innovative, quality and
            extraordinary 2d plan & 3d designs and services across all interior
            3d model and fit-out solutions as a commercial & residential.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            We cerate a team of our esteemed how have earned a reputation for
            transforming worldly spaces into style powerhouses. we have
            developed a process to provide our clients with a seamless
            experience when designing their commercial and residential interior
            design.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            We can handle every single aspect of any Interior Fit out a project
            so that you don’t need to run around to find different materials or
            suppliers of various products you want in your project.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            We provide ease to get a skilled and reliable team for installation
            of everything. Together with our own skilled in-house team, it
            becomes very convenient for us to execute a project of any quantum &
            create a truly exceptional and stunning space for our clients.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            we provide our clients with outstanding services from the stage of
            Conceptualization to Completion of the project. It is important to
            understand that there are several steps that need to be undertaken
            in order to successfully complete a given project. We not only
            ensure taking care of your model and fit out but everything that
            needs to be fulfilled along with it.
          </p>
        </div>
        <div>
          <Image
            src={about1}
            alt="about1"
            width={500}
            height={500}
            className="rounded"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:gap-10 items-center mt-10 lg:mt-20">
        <div>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            Some of our operations include: 3d design services, consultation,
            custom fabrication, installation and completion. Our experience and
            capabilities provide us with ability to work with home and business
            owners, architects and designers. Outstanding customer service is
            our goal at Genesis Carpentry, We live by the rules that customer
            satisfaction is our primary and foremost goal.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            Our attention to detail is shown in our day to day operations, from
            our finishes to our interaction with customers, at Genesis Carpenter
            every customer is personally attended by one of the owners.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            We invite you to work together with us on your next project, you
            will experience the difference in quality, service, and
            professionalism. Please do not hesitate to contact us, a member of
            our family will gladly assist you with any questions you may have.
          </p>
        </div>
        <div>
          <Image
            src={about2}
            alt="about2"
            width={500}
            height={500}
            className="rounded"
          />
        </div>
      </div>

      <div className="mt-10 lg:mt-20">
        <h2 className="text-2xl font-medium tracking-widest text-center mb-6">
          Ready For A Remodel?
        </h2>
        <p className="text-gray-600 font-medium mb-1 tracking-widest">
          Lifetime Remodeling Systems is proud to offer a full line of
          remodeling services for our clients including kitchen, bath and full
          scale interior remodel. Whether you’re dreaming of a new master
          bathroom, a kitchen refresh,living room, office, restaurant or wish to
          change the interior layout of your home our expert team is able
          execute your remodeling vision. Contact Us to set up a free in-home
          consultation with our remodeling consultant and set your dream
          remodeling plans in motion!
        </p>
        <p className="text-gray-600 font-medium mb-1 tracking-widest">
          Reputable, stable remodeling services.
        </p>
      </div>
    </section>
  );
};

export default AboutDetails;
