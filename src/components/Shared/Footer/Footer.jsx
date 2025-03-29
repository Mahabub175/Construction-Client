"use client";

import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import logo from "@/assets/images/logo.png";

const Footer = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <footer>
      <div className="bg-black py-20">
        <div className="my-container">
          <div className="w-full flex flex-col md:flex-row lg:justify-evenly items-center gap-5 lg:gap-10">
            <div className="flex flex-col gap-5 items-center lg:items-start">
              <h2 className="text-white/50 text-lg font-semibold">
                Follow us:
              </h2>
              <div className="text-white text-3xl flex gap-6 cursor-pointer justify-center">
                <Link
                  href={globalData?.results?.businessFacebook ?? "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
                <Link
                  href={globalData?.results?.businessLinkedin ?? "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
                <Link
                  href={globalData?.results?.businessInstagram ?? "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
                <Link
                  href={`https://wa.me/${globalData?.results?.businessWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
                <Link
                  href={globalData?.results?.businessTwitter ?? "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSquareXTwitter className="hover:text-primary duration-300 transform hover:scale-110" />
                </Link>
              </div>
            </div>

            <Link href={"/"}>
              <Image
                src={globalData?.results?.logo ?? logo}
                alt="logo"
                width={200}
                height={200}
                className="mx-auto my-5 bg-white rounded-full w-28"
              />
            </Link>

            <div className="sm:text-center">
              <h2 className="text-white text-sm font-normal">
                © Copyright {dayjs().year()} Genesis Carpentry
              </h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
