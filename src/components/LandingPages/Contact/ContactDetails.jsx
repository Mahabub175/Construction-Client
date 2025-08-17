"use client";

import ContactForm from "./ContactForm";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const ContactDetails = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <section className="max-w-7xl mx-auto px-5 mt-14 -mb-5 lg:mb-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
        <div className="col-span-2 bg-white p-5 rounded-xl shadow-xl mb-10 lg:mb-0">
          <h2 className="text-2xl lg:text-3xl font-medium mb-4">
            Tell Us Your Message :
          </h2>
          <ContactForm />
        </div>
        <div className="">
          <div className="bg-white p-5 rounded-xl shadow-xl mb-10">
            <h2 className="text-xl font-bold text-black/80 mb-4 border-b pb-2">
              Working Days
            </h2>
            <p>{globalData?.results?.businessWorkHours}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-xl mb-10">
            <h2 className="text-xl font-bold text-black/80 mb-4 border-b pb-2">
              Store address
            </h2>
            <div className="flex flex-col gap-2 mt-4">
              <p className="font-bold">Our address information:</p>
              <Link
                href={globalData?.results?.businessLocation ?? "/"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-primary duration-300"
              >
                {globalData?.results?.businessAddress}
              </Link>
              <Link
                href={`tel:+${globalData?.results?.businessNumber ?? "/"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-primary duration-300"
              >
                +{globalData?.results?.businessNumber}
              </Link>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Link
                href={globalData?.results?.businessFacebook ?? "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
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
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={globalData?.results?.businessInstagram ?? "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={`https://wa.me/${globalData?.results?.businessWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
              <Link
                href={globalData?.results?.businessTwitter ?? "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareXTwitter className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
