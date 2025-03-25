import { FaImage, FaPager, FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiUserSettingsFill, RiGalleryFill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";

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
    name: "Service",
    path: "service",
    icon: GrBusinessService,
  },
  {
    name: "Work",
    path: "work",
    icon: BsPersonWorkspace,
  },
  {
    name: "Gallery",
    path: "gallery",
    icon: RiGalleryFill,
  },
  {
    name: "Blog",
    path: "blog",
    icon: FaPager,
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
