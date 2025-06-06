"use client";

import { menuItems } from "@/assets/data/menuData/menuData";
import logo from "@/assets/images/logo.png";
import { useGetSingleUserQuery } from "@/redux/services/auth/authApi";
import { useCurrentUser } from "@/redux/services/auth/authSlice";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Drawer, Menu, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import MenuItems from "./NavbarItems";
import ProfileContent from "./ProfileContent";

const Navbar = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("home");

  const user = useSelector(useCurrentUser);
  const { data } = useGetSingleUserQuery(user?._id, { skip: !user?._id });
  const { data: globalData } = useGetAllGlobalSettingQuery();

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const onClick = (e) => {
    setCurrent(e.key);

    const selectedItem =
      menuItems.find((item) => item.key === e.key) ||
      menuItems
        .flatMap((item) => item.children || [])
        .find((subItem) => subItem.key === e.key);

    if (selectedItem && selectedItem.href) {
      router.push(selectedItem.href);
      closeDrawer();
    }
  };

  const filteredItems = data
    ? menuItems.filter((item) => item?.key !== "sign-in")
    : menuItems;

  return (
    <nav className={`bg-black fixed top-0 z-50 w-full`}>
      <div className={`-my-3 lg:-my-5 my-container`}>
        <div className="flex justify-between lg:justify-center items-center gap-4">
          <Link href="/" className="w-auto lg:hidden -ml-4">
            <Image
              src={globalData?.results?.logo ?? logo}
              alt="logo"
              width={80}
              height={80}
              onClick={() => {
                setCurrent("home");
              }}
            />
          </Link>
          <div className="lg:hidden mr-2">
            <FaBars
              onClick={showDrawer}
              className="text-lg cursor-pointer text-white"
            />
          </div>
          <div className="lg:flex items-center gap-10 hidden">
            <div className="hidden lg:flex lg:flex-wrap gap-4 lg:gap-2 xl:gap-8 items-center">
              <MenuItems
                items={filteredItems}
                setCurrent={setCurrent}
                closeDrawer={closeDrawer}
                globalData={globalData}
              />
            </div>
            <div className="hidden lg:block">
              {user ? (
                <div className="flex items-center gap-2">
                  <Popover
                    placement="bottomRight"
                    content={ProfileContent}
                    className="cursor-pointer bg-primary border rounded-full border-primary"
                  >
                    {data?.profile_image ? (
                      <Image
                        src={data?.profile_image}
                        alt="profile"
                        height={40}
                        width={40}
                        className="rounded-full w-[40px] h-[40px] border-2 border-primary mr-7"
                      />
                    ) : (
                      <Avatar className="" size={40} icon={<UserOutlined />} />
                    )}
                  </Popover>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <Drawer
          title="Menu"
          placement="left"
          onClose={closeDrawer}
          open={visible}
        >
          <div className="flex justify-between items-center -mt-5">
            <Link href="/" onClick={closeDrawer}>
              <Image
                src={globalData?.results?.logo ?? logo}
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
            <IoClose
              onClick={closeDrawer}
              className="text-2xl cursor-pointer"
            />
          </div>
          <div>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              defaultSelectedKeys={[current]}
              mode="inline"
              items={filteredItems}
              style={{
                borderRight: "none",
                fontWeight: "bold",
              }}
            />
          </div>
          <div className="flex lg:hidden items-center gap-6 ml-5 mt-2">
            {data?._id ? (
              <div className="flex items-center gap-2">
                <Popover
                  placement="topRight"
                  content={ProfileContent}
                  className="cursor-pointer bg-primary border rounded-full border-primary"
                >
                  {data?.profile_image ? (
                    <Image
                      src={data?.profile_image}
                      alt="profile"
                      height={40}
                      width={40}
                      className="rounded-full w-[40px] h-[40px] border-2 border-primary mr-7"
                    />
                  ) : (
                    <Avatar className="" size={40} icon={<UserOutlined />} />
                  )}
                </Popover>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
