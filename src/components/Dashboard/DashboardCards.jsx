import Link from "next/link";
import React from "react";

const DashboardCards = ({ icon, title, data, href }) => {
  return (
    <Link
      href={href ?? "/"}
      className="bg-white p-5 rounded-xl shadow-xl text-base font-semibold text-end flex flex-col justify-center lg:justify-around items-center gap-2 hover:bg-primary hover:text-white group transition-all duration-300"
    >
      {React.createElement(icon, {
        className:
          "text-[40px] text-primary group-hover:text-white duration-300",
      })}
      {data >= 0 && (
        <div className="flex items-center gap-2 lg:gap-4 text-center">
          <p className="text-sm lg:text-lg">Total {title}</p>
          <p className="text-2xl lg:text-3xl">{data}</p>
        </div>
      )}
      {!data && data !== 0 && (
        <p className="text-center text-sm lg:text-lg">{title}</p>
      )}
    </Link>
  );
};

export default DashboardCards;
