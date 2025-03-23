"use client";

import logo from "@/assets/images/logo-black.png";
import { Avatar, Button, Drawer, Menu, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentUser } from "@/redux/services/auth/authSlice";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import scrollToTop from "@/utilities/lib/scrollToTop";
import { useGetSingleUserQuery } from "@/redux/services/auth/authApi";
import { menuItems } from "@/assets/data/menuData/menuData";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const Navbar = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser);
  const { data } = useGetSingleUserQuery(user?._id, { skip: !user?._id });
  const { data: globalData } = useGetAllGlobalSettingQuery();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };

  const content = (
    <div>
      <div className="rounded-md px-16 py-3">
        <div className="flex flex-col items-center gap-4 text-lg">
          {data?.profile_image ? (
            <Image
              src={data?.profile_image}
              alt="profile"
              height={40}
              width={40}
              className="rounded-full w-[60px] h-[60px] border-2 !border-primary"
            />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} />
          )}
          <div className="flex flex-col text-center font-normal">
            <span className="font-bold text-2xl">{data?.name ?? "User"}</span>

            <span className={`text-base`}>{data?.email}</span>
            <span className={`text-base`}>{data?.number}</span>
          </div>
        </div>
      </div>

      <Link href={`/${data?.role}/dashboard`} onClick={scrollToTop}>
        <button className="bg-transparent hover:bg-primary hover:text-white text-black duration-300 font-medium px-4 py-2 rounded-xl border-2 border-primary w-full">
          Dashboard
        </button>
      </Link>

      <div className="flex w-full justify-end pt-3">
        <Button
          onClick={handleLogout}
          className={`w-full`}
          size="large"
          type="default"
        >
          Log Out
        </Button>
      </div>
    </div>
  );

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const [current, setCurrent] = useState("home");

  const handleItemClick = (key) => {
    setCurrent(key);
    closeDrawer();
  };

  const renderMenuItems = (items) => {
    return (
      <>
        {items?.slice(0, Math.ceil(items.length / 2)).map((item) => {
          const isActive = pathname === item?.href;
          return (
            <Link
              key={item?.key}
              href={item?.href}
              target={item?.to ? "_blank" : "_self"}
              rel={item?.to ? "noopener noreferrer" : ""}
              onClick={() => handleItemClick(item?.key)}
            >
              <span className="relative text-base font-medium mx-2 group hover:text-primary duration-300 pb-1">
                {item?.label}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 ${
                    isActive ? "w-full left-0" : "w-0"
                  }`}
                />
              </span>
            </Link>
          );
        })}

        <Link href="/" className="w-auto hidden lg:block">
          <Image
            src={globalData?.results?.logo ?? logo}
            alt="logo"
            width={150}
            height={150}
            onClick={() => {
              setCurrent("home");
            }}
            className="w-full h-[130px]"
          />
        </Link>

        {items?.slice(Math.ceil(items.length / 2)).map((item) => {
          const isActive = pathname === item?.href;
          return (
            <Link
              key={item?.key}
              href={item?.href}
              target={item?.to ? "_blank" : "_self"}
              rel={item?.to ? "noopener noreferrer" : ""}
              onClick={() => handleItemClick(item?.key)}
            >
              <span className="relative text-base font-medium mx-2 group hover:text-primary duration-300 pb-1">
                {item?.label}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 ${
                    isActive ? "w-full left-0" : "w-0"
                  }`}
                />
              </span>
            </Link>
          );
        })}
      </>
    );
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

  return (
    <nav className={`-my-2`}>
      <div className=" flex justify-between lg:justify-center items-center gap-4">
        <Link href="/" className="w-auto lg:hidden">
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
        <div className="lg:hidden mr-4">
          <FaBars onClick={showDrawer} className="text-lg cursor-pointer" />
        </div>
        <div className="lg:flex items-center gap-10 hidden">
          <div className="hidden lg:flex lg:flex-wrap gap-8 justify-center items-center">
            {renderMenuItems(menuItems)}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <Popover
                  placement="bottomRight"
                  content={content}
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
          <IoClose onClick={closeDrawer} className="text-2xl cursor-pointer" />
        </div>
        <div>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={menuItems}
            style={{
              borderRight: "none",
              fontWeight: "bold",
            }}
          />
        </div>
        <div className="flex lg:hidden items-center gap-6 ml-5 mt-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Popover
                placement="topRight"
                content={content}
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
    </nav>
  );
};

export default Navbar;
