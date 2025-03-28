import Image from "next/image";

const FeaturedBanner = ({ image, title, subtitle, logo }) => {
  return (
    <section
      style={{ backgroundImage: `url(${image})` }}
      className="relative bg-cover bg-center bg-no-repeat h-[400px] lg:h-[550px] flex items-center justify-center text-white text-center mb-10 lg:mb-20"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className={`relative z-10 px-5 ${logo ? "-mt-24 lg:-mt-32" : ""}`}>
        {logo && (
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="mx-auto w-[300px] lg:w-[400px] -mb-16 lg:-mb-20"
            priority
          />
        )}
        <h2 className="text-white text-2xl lg:text-4xl lg:leading-loose lg:tracking-widest uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 lg:mt-4 text-sm lg:text-base">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedBanner;
