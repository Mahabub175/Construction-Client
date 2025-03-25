"use client";

import DashboardCards from "@/components/Dashboard/DashboardCards";
import LogoutButton from "@/components/Dashboard/LogoutButton";
import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAdminDashboardQuery } from "@/redux/services/dashboard/dashboardApi";
import { useEffect } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaImage, FaPager, FaUser } from "react-icons/fa";
import { GrBusinessService } from "react-icons/gr";
import { RiGalleryFill, RiShoppingCartFill } from "react-icons/ri";
import { TbBrandAirtable } from "react-icons/tb";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const { data: dashboardData, isLoading } = useGetAdminDashboardQuery();

  return (
    <section>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5 gap-10">
          <DashboardCards
            icon={FaImage}
            title="Sliders"
            data={dashboardData?.results?.sliders || 0}
            href={"/admin/slider"}
          />
          <DashboardCards
            icon={GrBusinessService}
            title="Services"
            data={dashboardData?.results?.services || 0}
            href={"/admin/service"}
          />
          <DashboardCards
            icon={BsPersonWorkspace}
            title="Works"
            data={dashboardData?.results?.works || 0}
            href={"/admin/work"}
          />
          <DashboardCards
            icon={RiGalleryFill}
            title="Gallery Images"
            data={dashboardData?.results?.galleries || 0}
            href={"/admin/gallery"}
          />
          <DashboardCards
            icon={RiShoppingCartFill}
            title="Shops"
            data={dashboardData?.results?.shops || 0}
            href={"/admin/shop"}
          />
          <DashboardCards
            icon={FaPager}
            title="Blogs"
            data={dashboardData?.results?.blogs || 0}
            href={"/admin/blog"}
          />
          <DashboardCards
            icon={FaUser}
            title="Users"
            data={dashboardData?.results?.users || 0}
            href={"/admin/user"}
          />
          <DashboardCards
            icon={TbBrandAirtable}
            title="Account Setting"
            href={"/admin/account-setting"}
          />
          <DashboardCards
            icon={TbBrandAirtable}
            title="Global Settings"
            href={"/admin/global-setting"}
          />
          <LogoutButton />
        </div>
      )}
    </section>
  );
};

export default Dashboard;
