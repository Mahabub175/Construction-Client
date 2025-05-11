import brand1 from "@/assets/images/brand/1.png";
import brand2 from "@/assets/images/brand/2.png";
import brand3 from "@/assets/images/brand/3.png";
import brand4 from "@/assets/images/brand/4.png";
import brand5 from "@/assets/images/brand/5.png";
import brand6 from "@/assets/images/brand/6.png";
import brand7 from "@/assets/images/brand/7.png";
import brand8 from "@/assets/images/brand/8.png";
import brand9 from "@/assets/images/brand/9.png";
import brand10 from "@/assets/images/brand/10.png";
import brand11 from "@/assets/images/brand/11.png";
import brand12 from "@/assets/images/brand/12.png";
import Image from "next/image";

const activeBrands = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
  brand11,
  brand12,
];
const Brands = () => {
  return (
    <section className="mb-20 my-container -mt-10 lg:mt-20">
      <h2 className="mb-10 text-center leading-relaxed tracking-widest text-2xl lg:text-4xl font-medium">
        Our Clients
      </h2>
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {activeBrands.map((item, index) => (
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
