import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.png";

const MenuItems = ({ items, setCurrent, closeDrawer, globalData }) => {
  const pathname = usePathname();

  const handleItemClick = (key) => {
    setCurrent(key);
    closeDrawer();
  };

  return (
    <>
      {items?.slice(0, Math.ceil(items.length / 2)).map((item) => {
        const isActive = pathname === item?.href;
        return (
          <Link
            key={item?.key}
            href={item?.href ?? "/"}
            target={item?.to ? "_blank" : "_self"}
            rel={item?.to ? "noopener noreferrer" : ""}
            onClick={() => handleItemClick(item?.key)}
          >
            <span
              className={`relative text-base font-medium mx-2 group hover:text-primary duration-300 pb-1 ${
                isActive ? "text-primary" : ""
              }`}
            >
              {item?.label}
              <span
                className={`absolute bottom-0 h-[2.5px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 ${
                  isActive
                    ? "w-full left-0"
                    : "font-semibold text-primary left-1/2"
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
            href={item?.href ?? "/"}
            target={item?.to ? "_blank" : "_self"}
            rel={item?.to ? "noopener noreferrer" : ""}
            onClick={() => handleItemClick(item?.key)}
          >
            <span
              className={`relative text-base font-medium mx-2 group hover:text-primary duration-300 pb-1 ${
                isActive ? "text-primary" : ""
              }`}
            >
              {item?.label}
              <span
                className={`absolute bottom-0 h-[2.5px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 ${
                  isActive
                    ? "w-full left-0"
                    : "font-semibold text-primary left-1/2"
                }`}
              />
            </span>
          </Link>
        );
      })}
    </>
  );
};

export default MenuItems;
