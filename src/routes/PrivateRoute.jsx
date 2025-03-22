import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { logout, useCurrentToken } from "@/redux/services/auth/authSlice";
import { useRouter } from "next/navigation";
import { useGetSingleUserQuery } from "@/redux/services/auth/authApi";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector(useCurrentToken);

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      router.push("/sign-in");
      toast.error("You don't have permission to access this page!");
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      dispatch(logout());
      router.push("/sign-in");
      toast.error("Invalid token! Please log in again.");
      return;
    }

    const tokenExpirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (tokenExpirationTime <= currentTime) {
      dispatch(logout());
      router.push("/sign-in");
      toast.error("Your session has expired! Please log in again.");
      return;
    }
  }, [token, dispatch, router]);

  const { data, isLoading } = useGetSingleUserQuery(
    token ? jwtDecode(token).userId : "",
    {
      skip: !token,
    }
  );

  useEffect(() => {
    if (!isLoading && data && token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== data.role) {
        dispatch(logout());
        router.push("/sign-in");
        toast.error("You don't have permission to access this page!");
      }
    }
  }, [data, isLoading, token, dispatch, router]);

  if (!token || isLoading) return null;

  return children;
};

export default PrivateRoute;
