const PageBanner = ({ image, heading, title, subtitle }) => {
  return (
    <section
      style={{ backgroundImage: `url(${image})` }}
      className="relative bg-cover bg-center bg-no-repeat h-[250px] lg:h-[450px] flex items-center justify-center text-white text-center mb-10 lg:mb-20"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 px-5">
        {heading && (
          <h3 className="text-white text-sm lg:text-2xl leading-loose lg:tracking-widest lg:mb-2">
            {heading}
          </h3>
        )}
        <h2 className="text-white text-3xl lg:text-6xl leading-loose tracking-widest uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="-mt-2 lg:mt-4 tracking-widest">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageBanner;
