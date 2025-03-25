"use client";

import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const FloatingContact = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <div className="fixed bottom-[10%] right-2 lg:right-7 z-40">
      <Link
        href={`https://wa.me/${globalData?.results?.businessWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl cursor-pointer animate-pulse"
      >
        <FaWhatsapp />
      </Link>
    </div>
  );
};

export default FloatingContact;
