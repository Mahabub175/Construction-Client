import AboutBanner from "@/components/LandingPages/About-us/AboutBanner";
import Specialize from "@/components/LandingPages/About-us/Specialize";
import React from "react";

export const metadata = {
  title: "About Us - Genesis Carpentry",
  description: "This is the about us page of Genesis Carpentry website.",
};

const page = () => {
  return <div>
    <AboutBanner/>
    <Specialize/>
  </div>;
};

export default page;
