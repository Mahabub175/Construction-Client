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
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import logo from "@/assets/images/logo.png";
import { usePathname } from "next/navigation";

const footerLinks = [
  { name: "About Us", to: "/about-us" },
  { name: "Delivery", to: "/delivery" },
  { name: "Pickup Point", to: "/pickup-point" },
  { name: "Payment Terms", to: "/payment-terms" },
  { name: "Privacy Policy", to: "/privacy-policy" },
  { name: "Refund & Return", to: "/refund-and-return" },
  { name: "Terms & Condition", to: "/terms-and-conditions" },
  { name: "Blog", to: "/blog" },
];

const Footer = () => {
  const pathname = usePathname();
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <footer>
      <div className="bg-black pb-20">
        <div className="my-container">
          <div className="flex justify-center">
            <Link href={"/"}>
              <Image
                src={globalData?.results?.logo ?? logo}
                alt="logo"
                width={200}
                height={200}
              />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-5">
            {footerLinks?.map((item, i) => (
              <Link key={i} href={item?.to}>
                <p
                  className={`border border-primary text-white p-2 rounded-full text-xs font-medium duration-300 tracking-widest ${
                    item?.to === pathname
                      ? "bg-primary text-primaryLight"
                      : "hover:bg-primary hover:text-primaryLight"
                  }`}
                >
                  {item?.name}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 my-container mb-10">
            <h3 className="text-2xl font-bold mb-2">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link
                href={globalData?.results?.businessFacebook ?? "/"}
                target="_blank"
                className="flex items-center gap-4"
              >
                <FaFacebook className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={`https://wa.me/${globalData?.results?.businessWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={globalData?.results?.businessYoutube ?? "/"}
                target="_blank"
                className="flex items-center gap-4"
              >
                <FaYoutube className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={globalData?.results?.businessLinkedin ?? "/"}
                target="_blank"
                className="flex items-center gap-4"
              >
                <FaLinkedin className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={globalData?.results?.businessInstagram ?? "/"}
                target="_blank"
                className="flex items-center gap-4"
              >
                <FaInstagram className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={globalData?.results?.businessTwitter ?? "/"}
                target="_blank"
                className="flex items-center gap-4"
              >
                <FaSquareXTwitter className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
            </div>
          </div>

          <div className="sm:text-center">
            <h2 className="text-white text-sm font-normal">
              © Copyright {dayjs().year()} Genesis Carpenter
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
