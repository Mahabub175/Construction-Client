"use client";

import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";

const Footer = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <footer>
      <div className="bg-black py-10">
        <div className="my-container">
          <div className="w-full flex flex-col md:flex-row lg:justify-evenly items-center lg:gap-10">
            <div className="flex flex-col gap-5 items-center lg:items-start">
              <h2 className="text-white/50 text-lg font-semibold">
                Follow us:
              </h2>
              <div className="text-white text-3xl flex gap-6 cursor-pointer justify-center">
                <Link href={""}>
                  <FaInstagram className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
                <Link href={""} target="_blank" rel="noopener noreferrer">
                  <SiFacebook className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
                <Link href={""} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
              </div>
            </div>

            <Link href={"/"}>
              <Image
                src={globalData?.results?.logo}
                alt="logo"
                width={200}
                height={200}
                className="mx-auto -my-5 lg:my-0"
              />
            </Link>

            <div className="sm:text-center">
              <h2 className="text-white/50 text-sm font-normal">
                © Copyright {dayjs().year()} Genesis Carpentry | Brand
              </h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
