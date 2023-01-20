import { useSelector } from "react-redux";
import Header from "./Header";
import Loading from "./Loader";
import { RootState } from "../../redux/store";
import Response from "./ResponseToast";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const { isLoading, user } = useSelector((state: RootState) => state.auth);

  const NavShow = !router.pathname.includes("/voting/");
  return (
    <>
      <Loading loading={isLoading} />

      {NavShow && <Header user={user} />}
      <Response />
      {children}
    </>
  );
};

export default Layout;
