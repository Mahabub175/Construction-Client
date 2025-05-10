import Image from "next/image";
import whyUs from "@/assets/images/whyUs.png";
import Link from "next/link";

const Works = () => {
  return (
    <section className="mb-10 lg:mb-20 my-container">
      <div className="flex flex-col-reverse lg:flex-row-reverse justify-between items-center gap-20">
        <Image
          src={whyUs}
          alt="why us"
          width={500}
          height={600}
          className="mx-auto mt-10 lg:mt-0"
        />
        <div className="">
          <div>
            <h3 className="font-medium text-2xl mb-2 tracking-widest">
              Direct Carpenter
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Genesis Carpenter provide all carpentry services whether you’re
              upgrading your home or office & restaurants., We are able to take
              charge of your full renovation needs by helping your design and
              renovate your space to your liking. With our in-house carpentry
              workshop located at Kallang pudding, customers can be assured that
              we have all the tools to provide quality work at our disposal.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-2xl mb-2 tracking-widest">
              Woodworking Craft
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              We are focused on craftsmanship and personal attention. Our main
              goal is to build exactly what you want. With decades of experience
              serving our loyal clients, we craft enduring interior and exterior
              installations or as new construction, using the finest available
              materials and the most time-proven joinery to provide a high level
              of quality and workmanship.
            </p>
          </div>
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              We can design and fabricate pretty much anything that is made of
              wood. From simple shelving units and custom made bedroom furniture
              to bespoke and made-to-measure kitchen and bathroom units and
              office showroom & restaurants.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href={`/work`}
          className="px-10 py-2 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300"
        >
          View Works
        </Link>
      </div>
    </section>
  );
};

export default Works;
