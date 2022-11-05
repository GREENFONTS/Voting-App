import { Spinner, Box, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import router from "next/router";
import { dispatch } from "../../redux/store";
import { setLoading, verifyToken } from "../../redux/features/Users/auth";

const Loading = ({ loading }) => {
  useEffect(() => {
    let token: string = localStorage.getItem("token")!;
    const { pathname } = window.location;
    if (token === "null" || token === null || token === undefined) {
      localStorage.clear();
      if (pathname.includes("/admin")) {
        router.push("/login");
        dispatch(setLoading(false));
      } else {
        router.push(pathname);
        dispatch(setLoading(false));
      }
    } else {
      if (pathname.includes("/admin")) {
        dispatch(verifyToken(token));
      }
    }
  }, []);

  return (
    <>
      {loading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="9999999"
          bg="white"
          w="100%"
          h="100vh"
          opacity="0.9"
        >
          <Stack justifyContent="center" h="inherit" alignItems="center">
            <Spinner size="xl" color="primary-1" />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Loading;
