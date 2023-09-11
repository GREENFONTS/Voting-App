import React, { useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";
import { auth, provider, signInWithPopup } from "../firebase/config";
import {
  Box,
  Text,
  Button,
  useMediaQuery,
  Image,
  Center,
  Alert,
  Icon,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import FormInput from "../components/Elements/FormInput";
import { useColorModeValue } from "@chakra-ui/react";
import { FaUserLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { dispatch } from "../redux/store";
import {
  AddUserData,
  createResponse,
  selectAuthState,
  setLoading,
} from "../redux/features/Users/auth";
import { ErrorTypes } from "../models/auth/stateModel";
import UserService from "../Utils/axios/apis/auth";
import { ErrorHandler } from "../Utils/Error";

const Login = () => {
  const { token } = useSelector(selectAuthState);
  const [isLesserThan900] = useMediaQuery("(max-width: 900px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const bgColor = useColorModeValue("themeLight.bg", "themeDark.bgBody");

  useEffect(() => {
    if (email === "" || password === "") {
      setIsRequired(true);
    } else {
      setIsRequired(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (token !== null) {
      router.push("/admin");
    }
  }, [token]);

  const SignInWithFirebase = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const email: string = result.user.email;
        try {
          if (email !== null) {
            dispatch(setLoading(true));
            const res = await UserService.GoogleLogin(email);
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("user", JSON.stringify(res.data.user))
            dispatch(AddUserData(res.data));
            dispatch(setLoading(false));
          }
        } catch (err: any) {
          dispatch(setLoading(false));
          dispatch(createResponse(ErrorHandler(err)));
        }
      })
      .catch(() => {
        dispatch(
          createResponse({
            type: ErrorTypes.Error,
            title: "Error",
            message: "Something went wrong, Check your network",
          })
        );
      });
  };

  const submitHandler = async () => {
    const formBody = {
      email,
      password,
    };

    try {
        dispatch(setLoading(true));
        const res = await UserService.Login(formBody);
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("user", JSON.stringify(res.data.user))
        dispatch(AddUserData(res.data));
        dispatch(setLoading(false));
      
    } catch (err: any) {
      dispatch(setLoading(false));
      dispatch(createResponse(ErrorHandler(err)));
    }
  };

  return (
    <>
      <Box>
        <Center>
          {isLargerThan900 && (
            <Box
              display={{ md: "flex" }}
              height={{ base: "70vh", md: "90vh" }}
              w="95%"
              px={{ base: "24px", md: "27px", lg: "30px" }}
              py={4}
              bg={bgColor}
            >
              <Box w={{ base: "100%", md: "55%" }} h={{ lg: "85vh" }} mt="5">
                <Image
                  src="Login.png"
                  alt="Topic"
                  h="70vh"
                  width="100%"
                  animation="bounceFromBottomLeft 0.5s"
                />
              </Box>
              <Box w="5%"></Box>
              <Box w="30%" mt="5">
                <Center mb="3">
                  <Icon as={FaUserLock} color="gray.300" w="120px" h="100px" />
                </Center>
                <Box>
                  <Text
                    fontSize="30px"
                    fontFamily="sans-serif"
                    mb="6"
                    fontWeight="700"
                  >
                    Login
                  </Text>
                  <Text
                    fontSize="15px"
                    fontFamily="sans-serif"
                    mb="2"
                    color="gray.500"
                  >
                    Welcome back, lets get back to business{" "}
                  </Text>
                </Box>

                <Box>
                  <Button
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                    onClick={SignInWithFirebase}
                    w="100%"
                    borderRadius="20"
                  >
                    Sign In with Google
                  </Button>
                </Box>

                <Box>
                  <Center pt="2">
                    <Text fontWeight="600" fontSize="20px">
                      or
                    </Text>
                  </Center>
                </Box>

                <Box>
                  <Center pt="2">
                    <Text fontWeight="600" fontSize="20px">
                      Login with Email
                    </Text>
                  </Center>
                </Box>

                {alertMessage !== null ? (
                  <Alert status="error" id="alert">
                    {" "}
                    <AlertIcon />
                    {alertMessage}
                    <CloseButton
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={(e) => setAlertMessage(null)}
                    />
                  </Alert>
                ) : (
                  <></>
                )}

                <FormInput
                  label="Email"
                  value={email}
                  name="email"
                  onChange={setEmail}
                />

                <FormInput
                  label="Password"
                  name="password"
                  value={password}
                  onChange={setPassword}
                />

                <Box mt="5">
                  <Button
                    id="button"
                    isDisabled={isRequired}
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                    onClick={(e) => submitHandler()}
                  >
                    Login
                  </Button>
                </Box>

                <Box mt="5" display="flex">
                  <Text mr="2">Dont have an account yet? </Text>
                  <Text
                    color="purple.600"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                  >
                    <Link href="/register">SignUp</Link>
                  </Text>
                </Box>
              </Box>
              <Box w="10%"></Box>
            </Box>
          )}

          {isLesserThan900 && (
            <Box
              h="100vh"
              w="100%"
              px={{ base: "24px", md: "27px", lg: "30px" }}
              py={4}
              bg={bgColor}
              pb="5"
            >
              <Box w="100%" mt="2">
                <Image
                  src="Login.png"
                  alt="Topic"
                  h="35vh"
                  width="100%"
                  animation="bounceFromBottomLeft 0.5s"
                />
              </Box>
              <Box>
                <Center>
                  <Icon as={FaUserLock} color="gray.300" w="80px" h="80px" />
                </Center>
                <Box mt="2">
                  <Center>
                    <Text
                      fontSize="12px"
                      fontFamily="sans-serif"
                      mb="2"
                      color="gray.500"
                    >
                      Welcome back, lets get back to business{" "}
                    </Text>
                  </Center>
                </Box>

                <Center>
                  <Button
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                    onClick={SignInWithFirebase}
                    w="80%"
                    borderRadius="20"
                  >
                    Sign In with Google
                  </Button>
                </Center>

                <Box pt="3">
                  <Center>
                    <Text fontWeight="600" fontSize="20px">
                      or
                    </Text>
                  </Center>
                </Box>

                <Box pt="3">
                  <Center>
                    <Text fontWeight="600" fontSize="20px">
                      Login with Email
                    </Text>
                  </Center>
                </Box>

                {alertMessage !== null ? (
                  <Alert status="error">
                    {" "}
                    <AlertIcon />
                    {alertMessage}
                    <CloseButton
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={(e) => setAlertMessage(null)}
                    />
                  </Alert>
                ) : (
                  <></>
                )}

                <FormInput
                  label="Email"
                  value={email}
                  name="email"
                  onChange={setEmail}
                />

                <FormInput
                  label="Password"
                  name="password"
                  value={password}
                  onChange={setPassword}
                />

                <Box mt="5">
                  <Button
                    id="button"
                    isDisabled={isRequired}
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                    onClick={(e) => submitHandler()}
                  >
                    Login
                  </Button>
                </Box>

                <Box mt="3" display="flex">
                  <Text mr="2">Don't have an account yet? </Text>
                  <Text
                    color="purple.600"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                  >
                    <Link href="/register">SignUp</Link>
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </Center>
      </Box>
    </>
  );
};

export default Login;
