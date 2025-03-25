import React from 'react'


const AboutBanner = () => {
  return (
    <>
      <section>
        <div className="about_background relative w-full h-[250px] md:h-[350px] lg:h-[500px] xxl:h-[700px]" >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#020202] bg-opacity-50"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="md:text-[72px] text-[45px] font-[100] leading-[40px] md:leading-[83.4px]">ABOUT</h1>
            <p className="text-[14px] font-normal mt-4 max-w-[525px] leading-[24.55px]">
              FOR MANY GENERATIONS SUPERIOR CRAFTSMANSHIP HAS BEEN A TRADITION IN THE MARTINEZ FAMILY, OUR FAMILY.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutBanner
// keya calrahare e-dhar huu!!:) oo akhono mohasoy ase e nai reply diye :(