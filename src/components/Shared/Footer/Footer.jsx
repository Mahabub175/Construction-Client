"use client";

import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";

const Footer = () => {
    const { data: globalData } = useGetAllGlobalSettingQuery();
  

  return <footer>
    <div className="bg-[#7c7c7c] py-[70px] ">
      <div className="my-container">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-[20px] items-start">
            <h2 className="text-[#444444]">Follow us:</h2>
            <div className="text-[#ffffff] text-[25px] flex gap-[20px] cursor-pointer justify-center">
              <Link href={''}><FaInstagram className="hover:text-primary duration-500" /></Link>
              <Link href={'https://www.facebook.com/mahabub.ahmmed.52'} target="_blank" rel="noopener noreferrer">
                <SiFacebook className="hover:text-primary duration-500" />
              </Link>
              <Link href={''} target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="hover:text-primary duration-500" /></Link>
            </div>
          </div>
          <div className="w-[200px]">
            <Link href={'/'}><img src={globalData?.results?.logo} alt="logo" /></Link>
          </div>
          <div className="sm:text-center">
            <h2 className="text-[#2b2a2a] text-[14px] font-normal">© Copyright 2025 Genesis Carpentry | Brand</h2>
          </div>
        </div>
      </div>
    </div>
  </footer>;
};

export default Footer;
