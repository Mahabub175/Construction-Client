"use client";

import Image from "next/image";
import { useGetAllBrandsQuery } from "@/redux/services/brand/brandApi";

const Brands = () => {
  const { data: brands } = useGetAllBrandsQuery();

  const activeBrands = brands?.results?.map(
    (item) => item?.status && item?.attachment
  );

  return (
    <section className="mb-20 my-container -mt-10 lg:mt-20">
      <h2 className="mb-10 text-center leading-relaxed tracking-widest text-2xl lg:text-4xl font-medium">
        Our Clients
      </h2>
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {activeBrands?.map((item, index) => (
          <Image
            key={index}
            src={item}
            alt="brand"
            width={100}
            height={100}
            className="mx-auto border border-transparent hover:border-primary hover:scale-110 duration-700 rounded-xl"
          />
        ))}
      </div>
    </section>
  );
};

export default Brands;
