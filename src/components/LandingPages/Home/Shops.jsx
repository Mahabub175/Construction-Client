"use client";

import Image from "next/image";
import whyUs from "@/assets/images/whyUs.png";
import Link from "next/link";
import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import FeaturedBanner from "./FeaturedBanner";

const Shops = () => {
  const { data: sliders } = useGetAllSlidersQuery();

  const featuredBanners = sliders?.results?.filter(
    (item) => item?.status && item?.bottomBanner && item?.attachment
  );

  return (
    <section>
      {featuredBanners?.[2] && (
        <FeaturedBanner
          image={featuredBanners[2].attachment}
          title="Shop"
          subtitle={"Choose your favorite design from our shop"}
        />
      )}
      <div className="mb-10 lg:mb-20 my-container">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:gap-20">
          <Image
            src={whyUs}
            alt="why us"
            width={500}
            height={600}
            className="mx-auto mb-10 lg:mb-0"
          />
          <div className="tracking-wide leading-relaxed">
            <div>
              <h3 className="font-medium text-xl lg:text-2xl mb-2 tracking-widest">
                FREE CONSULTATION & DESIGN PROPOSAL
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that great design begins with understanding our
                clients’ unique needs and preferences. Our free consultation
                service allows us to connect with you and explore your vision,
                ensuring that our design solutions are tailored specifically to
                your lifestyle and taste.
              </p>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                We’ll share inspiration and preliminary concepts to help you
                visualize the potential of your space. Whether you’re looking
                for a complete redesign or a simple refresh, our consultation
                will give you a clear direction and a sense of what’s possible.
              </p>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Understanding your budget and timeline is crucial for a
                successful project. During the free consultation, we’ll discuss
                your financial parameters and project schedule to ensure that
                our design solutions are feasible and realistic.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href={`/shop`}
            className="px-10 py-2 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300"
          >
            View Shop
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Shops;
