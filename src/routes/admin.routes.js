import { FaImage, FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";

export const adminSidebarRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: TbLayoutDashboardFilled,
  },
  {
    name: "Sliders",
    path: "slider",
    icon: FaImage,
  },
  {
    name: "User",
    path: "user",
    icon: FaUser,
  },
  {
    name: "Account Setting",
    path: "account-setting",
    icon: RiUserSettingsFill,
  },
  {
    name: "Global Setting",
    path: "global-setting",
    icon: IoSettingsSharp,
  },
];
