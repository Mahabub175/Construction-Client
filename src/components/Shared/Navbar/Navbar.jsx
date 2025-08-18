"use client";

import { menuItems } from "@/assets/data/menuData/menuData";
import logo from "@/assets/images/logo.png";
import { useGetSingleUserQuery } from "@/redux/services/auth/authApi";
import { useCurrentUser } from "@/redux/services/auth/authSlice";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Drawer, Menu, Popover, Button } from "antd";
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
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="w-auto lg:hidden -ml-4 py-2.5">
            <Image
              src={globalData?.results?.logo ?? logo}
              alt="logo"
              width={60}
              height={60}
              onClick={() => setCurrent("home")}
            />
          </Link>
          <div className="lg:hidden mr-2">
            <FaBars
              onClick={showDrawer}
              className="text-lg cursor-pointer text-white"
            />
          </div>
          <div className="hidden lg:flex items-center justify-center flex-1 gap-5 xl:gap-10">
            <MenuItems
              items={filteredItems}
              setCurrent={setCurrent}
              closeDrawer={closeDrawer}
              globalData={globalData}
            />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
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
                    className="rounded-full w-[40px] h-[40px] border-2 border-primary"
                  />
                ) : (
                  <Avatar size={40} icon={<UserOutlined />} />
                )}
              </Popover>
            ) : (
              <Link href="/sign-in">
                <Button type="primary">Sign In</Button>
              </Link>
            )}
          </div>
        </div>

        <Drawer
          title="Menu"
          placement="right"
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
              <Link href="/sign-in">
                <Button type="primary" onClick={closeDrawer}>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
