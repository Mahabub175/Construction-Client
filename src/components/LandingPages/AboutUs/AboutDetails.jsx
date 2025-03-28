"use client";

import about1 from "@/assets/images/about1.jpg";
import about2 from "@/assets/images/about2.jpg";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import Image from "next/image";
import logo from "@/assets/images/logo-black.png";

const AboutDetails = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <section className="max-w-6xl mx-auto px-5">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center">
        <div className="lg:w-4/6">
          <h2 className="text-2xl font-medium tracking-widest text-center">
            A COMPANY SPECIALIZED ON YOU
          </h2>
          <Image
            src={globalData?.results?.logo ?? logo}
            alt="logo"
            width={200}
            height={200}
            className="mx-auto -my-5 lg:my-0"
          />
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            Genesis Carpentry Inc is a family owned and operated custom woodwork
            corporation located in Miami, Florida. For many generations superior
            craftsmanship has been a tradition in the Martinez Family, our
            family. Today, Roberto Martinez (3rd and 4th Generations carpenters)
            proudly offers some of the finest handcrafted woodwork.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest pl-4 lg:pl-10 border-l-2 border-primary italic">
            For several years Genesis Carpentry has provided its services to a
            wide variety of Luxury Residences, Hotels & Condominium,
            Restaurants, Stores and many more customers throughout South Florida
            and the Caribbean.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            We provide our clients with years of experience with hardwoods,
            traditional plywood and the most exotic wood veneers, which set the
            standard for superior craftsmanship and exceptional finish. Our team
            is capable of matching any existing finish and exceeding our
            client’s expectations.{" "}
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
      <div className="flex flex-col lg:flex-row-reverse gap-5 lg:gap-10 items-center mt-10">
        <div className="lg:w-4/6">
          <p className="text-gray-600 font-medium mb-5 tracking-widest">
            Some of our operations include: design services, consultation,
            custom fabrication, installation and completion. Our experience and
            capabilities provide us with ability to work with home and business
            owners, architects and designers. We work with contractors during
            the process, developing drawings, creating and providing samples for
            our customer. Outstanding customer service is our goal at Genesis
            Carpentry, We live by the rules that customer satisfaction is our
            primary and foremost goal.
          </p>
          <p className="text-gray-600 font-medium mb-5 tracking-widest pl-4 lg:pl-10 border-l-2 border-primary italic">
            Our attention to detail is shown in our day to day operations, from
            our finishes to our interaction with customers, at Genesis Carpentry
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
    </section>
  );
};

export default AboutDetails;
