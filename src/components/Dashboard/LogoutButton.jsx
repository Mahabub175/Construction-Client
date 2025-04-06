import { logout } from "@/redux/services/auth/authSlice";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    dispatch(logout());
  };

  return (
    <div
      className="bg-white p-5 rounded-xl shadow-xl text-base font-bold text-end flex flex-col justify-center lg:justify-around items-center gap-2 hover:bg-primary hover:text-white group transition-all duration-300"
      onClick={handleLogout}
    >
      <MdLogout className="text-[40px] text-primary group-hover:text-white duration-300" />
      <p className="text-center text-sm lg:text-lg">Log Out</p>
    </div>
  );
};

export default LogoutButton;
