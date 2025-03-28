const PageBanner = ({ image, title, subtitle }) => {
  return (
    <section
      style={{ backgroundImage: `url(${image})` }}
      className="relative bg-cover bg-center bg-no-repeat h-[250px] lg:h-[450px] flex items-center justify-center text-white text-center mb-10 lg:mb-20"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 px-5">
        <h2 className="text-white text-3xl lg:text-6xl leading-loose tracking-widest uppercase">
          {title}
        </h2>
        {subtitle && <p className="-mt-2 lg:mt-4">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageBanner;
