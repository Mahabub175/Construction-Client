import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentUser } from "@/redux/services/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/services/auth/authApi";
import { toast } from "sonner";
import Link from "next/link";
import scrollToTop from "@/utilities/lib/scrollToTop";

const ProfileContent = () => {
  const dispatch = useDispatch();
  const user = useSelector(useCurrentUser);
  const { data } = useGetSingleUserQuery(user?._id, { skip: !user?._id });

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };

  return (
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
            <span className="text-base">{data?.email}</span>
            <span className="text-base">{data?.number}</span>
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
          className="w-full"
          size="large"
          type="default"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileContent;
