import React, { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import {
  Box,
  Text,
  Button,
  useMediaQuery,
  Image,
  Center,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import User from "../models/auth/User";
import { dispatch } from "../redux/store";
import {
  AddUserData,
  createResponse,
  selectAuthState,
  setLoading,
  UserRegister,
} from "../redux/features/Users/auth";
import { useSelector } from "react-redux";
import UserService from "../Utils/axios/apis/auth";
import { ErrorHandler } from "../Utils/Error";

const Register = () => {
  const { token } = useSelector(selectAuthState);
  const [isLesserThan900] = useMediaQuery("(max-width: 900px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [isPasswordLengthError, setIsPasswordLengthError] =
    useState<boolean>(false);
  const [isPasswordMatchError, setIsPasswordMatchError] =
    useState<boolean>(false);
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<boolean>(null);

  const bgColor = useColorModeValue("themeLight.bg", "themeDark.bgBody");

  useEffect(() => {
    if (
      userName === "" ||
      email === "" ||
      organization === "" ||
      isPasswordLengthError ||
      isPasswordMatchError
    ) {
      setIsRequired(true);
    } else {
      setIsRequired(false);
    }
  }, [userName, email, organization]);

  useEffect(() => {
    if (password.length > 1 && password.length < 8) {
      setFormError("Password must be greater than 8 characters");
      setIsPasswordLengthError(true);
    } else {
      setFormError("");
      setIsPasswordLengthError(false);
    }
  }, [password]);

  useEffect(() => {
    if (password1.length > 3 && password != password1) {
      setFormError("Passwords don't match");
      setIsPasswordMatchError(true);
    } else {
      setFormError("");
      setIsPasswordMatchError(false);
    }
  }, [password1]);

  useEffect(() => {
    if (token !== null) {
      router.push("/admin");
    }
  }, [token]);

  const submitHandler = async () => {
    const formBody: User = {
      firstName,
      lastName,
      organization,
      tel,
      userName,
      email,
      password,
      id: "",
    };

    try {
      dispatch(setLoading(true));
      const res = await UserService.CreateUser(formBody);
      if (res.data) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(AddUserData(res.data));
        dispatch(setLoading(false));
      }
    } catch (err: any) {
      console.log(err);
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
              <Box w={{ base: "100%", md: "35%" }} h={{ lg: "85vh" }} mt="5">
                <Image
                  src="signup.png"
                  alt="Topic"
                  h="70vh"
                  width="100%"
                  animation="bounceFromBottomLeft 0.5s"
                />
              </Box>
              <Box w="5%"></Box>
              <Box w="60%">
                <Box>
                  <Text
                    fontSize="30px"
                    fontFamily="sans-serif"
                    mb="4"
                    fontWeight="700"
                  >
                    Register
                  </Text>
                  <Text fontSize="18px" fontFamily="sans-serif" mb="2">
                    Create and host an online Election efficiently{" "}
                  </Text>
                  <Text
                    fontSize="15px"
                    fontFamily="sans-serif"
                    mb="2"
                    color="gray.500"
                  >
                    Lets get you all set up so that you can create your admin
                    account <br />
                    and set up the election{" "}
                  </Text>
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

                <Box display={{ lg: "flex" }}>
                  <FormControl w="45%">
                    <FormLabel htmlFor="firstName">FirstName</FormLabel>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>

                  <Box w="5%"></Box>
                  <FormControl w="45%">
                    <FormLabel htmlFor="lastName">LastName</FormLabel>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <Box display={{ lg: "flex" }} mt="2">
                  <FormControl isRequired w="45%">
                    <FormLabel htmlFor="userName">UserName</FormLabel>
                    <Input
                      id="userName"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </FormControl>

                  <Box w="5%"></Box>
                  <FormControl isRequired w="45%">
                    <FormLabel htmlFor="tel">Organization</FormLabel>
                    <Input
                      id="organization"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                    <FormHelperText fontSize="11px">
                      {" "}
                      The organization or group participating in the election{" "}
                    </FormHelperText>
                  </FormControl>
                </Box>

                <Box display={{ lg: "flex" }} mt="2">
                  <FormControl isRequired w="45%">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <Box w="5%"></Box>
                  <FormControl w="45%">
                    <FormLabel htmlFor="tel">Tel</FormLabel>
                    <Input
                      id="tel"
                      type="text"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <Box display={{ lg: "flex" }} mt="2">
                  <FormControl isRequired w="45%">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {isPasswordLengthError ? (
                      <FormHelperText color="red.500" fontSize="11px">
                        {formError}
                      </FormHelperText>
                    ) : (
                      <></>
                    )}
                  </FormControl>

                  <Box w="5%"></Box>
                  <FormControl isRequired w="45%">
                    <FormLabel htmlFor="password1">Confirm Password</FormLabel>
                    <Input
                      id="password1"
                      type="password"
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                    />
                    {isPasswordMatchError ? (
                      <FormHelperText color="red.500" fontSize="11px">
                        {formError}
                      </FormHelperText>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                </Box>

                <Box mt="5">
                  <Button
                    id="button"
                    disabled={
                      isPasswordLengthError ||
                      isPasswordMatchError ||
                      isRequired
                    }
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                    onClick={(e) => submitHandler()}
                  >
                    Create Account
                  </Button>
                </Box>

                <Box mt="5" display="flex">
                  <Text mr="2">Already have an account? </Text>
                  <Text
                    color="purple.600"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                  >
                    <Link href="/login">LogIn</Link>
                  </Text>
                </Box>
              </Box>
            </Box>
          )}

          {isLesserThan900 && (
            <Box
              display={{ md: "flex" }}
              w="100%"
              px={{ base: "24px", md: "27px", lg: "30px" }}
              py={4}
              bg={bgColor}
            >
              <Box>
                <Image
                  src="signup.png"
                  alt="Topic"
                  h="30vh"
                  width="100%"
                  animation="bounceFromBottomLeft 0.5s"
                />
              </Box>
              <Box w="100%">
                <Box>
                  <Text
                    fontSize="20px"
                    fontFamily="sans-serif"
                    mb="4"
                    fontWeight="700"
                  >
                    Register
                  </Text>
                  <Text fontSize="15px" fontFamily="sans-serif" mb="2">
                    Create and host an online Election efficiently{" "}
                  </Text>
                  <Text
                    fontSize="12px"
                    fontFamily="sans-serif"
                    mb="2"
                    color="gray.500"
                  >
                    Lets get you all set up so that you can create your admin
                    account and set up the election{" "}
                  </Text>
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

                <FormControl>
                  <FormLabel htmlFor="firstName">FirstName</FormLabel>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">LastName</FormLabel>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="userName">UserName</FormLabel>
                  <Input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="tel">Organization</FormLabel>
                  <Input
                    id="organization"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                  <FormHelperText fontSize="11px">
                    {" "}
                    The organization or group participating in the election{" "}
                  </FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="tel">Tel</FormLabel>
                  <Input
                    id="tel"
                    type="text"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isPasswordLengthError ? (
                    <FormHelperText color="red.500" fontSize="11px">
                      {formError}
                    </FormHelperText>
                  ) : (
                    <></>
                  )}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="password1">Confirm Password</FormLabel>
                  <Input
                    id="password1"
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  {isPasswordMatchError ? (
                    <FormHelperText color="red.500" fontSize="11px">
                      {formError}
                    </FormHelperText>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <Box mt="5">
                  <Button
                    id="button"
                    disabled={
                      isPasswordLengthError ||
                      isPasswordMatchError ||
                      isRequired
                    }
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                    onClick={(e) => submitHandler()}
                  >
                    Create Account
                  </Button>
                </Box>

                <Box mt="5" display="flex">
                  <Text mr="2">Already have an account? </Text>
                  <Text
                    color="purple.600"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                  >
                    <Link href="/login">LogIn</Link>
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

export default Register;
