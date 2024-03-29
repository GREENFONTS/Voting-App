import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  HStack,
  Icon,
  LinkBox,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaVoteYea } from "react-icons/fa";
import { BiMoon } from "react-icons/bi";
import { ImSun } from "react-icons/im";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import DrawerComponent from "./Drawer";
import { dispatch } from "../../redux/store";
import { setDrawerState } from "../../redux/features/Utils/utils";
import { reset } from "../../redux/features/Users/auth";

const Header = ({ user }) => {
  const router = useRouter()
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLesserThan900] = useMediaQuery("(max-width: 900px)");
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("#e8e8e8", "gray.800");
  const iconColor = useColorModeValue("themeLight.icon", "themeLight.icon");
  const textColor = useColorModeValue("themeLight.logo", "themeDark.logo");
  const icon = useColorModeValue(BiMoon, ImSun);

  const signOutHandler = () => {
    
    dispatch(reset())
    localStorage.clear()
    router.push("/login")
  };

  return (
    <>
      <Flex
        id="header"
        px={{ base: "15px", md: "20px", lg: "25px" }}
        py={1}
        h="50px"
        bg={bgColor}
        align="center"
        justify="space-between"
      >
        {user === null ? (
          <>
            {" "}
            <Box alignItems="center">
              <LinkBox>
                <HStack _hover={{ cursor: "pointer" }}>
                  <Link href="/">
                    <Icon
                      as={FaVoteYea}
                      _focus={{ outline: "none" }}
                      w={{ base: "27px", md: "30px", lg: "35px" }}
                      h={{ base: "18px", md: "20px", lg: "35px" }}
                      color={iconColor}
                      _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                    />
                  </Link>
                  <Text
                    fontWeight="700"
                    fontSize={{ base: "17px", md: "18px", lg: "20px" }}
                    fontFamily="cursive"
                    color={textColor}
                  >
                    easy-vote
                  </Text>
                </HStack>
              </LinkBox>
            </Box>
            <Flex h="full" align="center" justify="space-between">
              <Flex align="center" justify="space-between">
                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  mx={10}
                  w={{ base: "18px", md: "20px", lg: "22px" }}
                  h={{ base: "18px", md: "20px", lg: "22px" }}
                  color={iconColor}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
                {isLargerThan900 && (
                  <>
                    <Button
                      bgColor={bgColor}
                      _hover={{
                        transform: "scale(1.15)",
                        cursor: "pointer",
                        borderBottom: "1px solid purple",
                      }}
                      fontFamily="cursive"
                      fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                    >
                      <Link href="/register">SignUp</Link>
                    </Button>
                    <Button
                      bgColor={bgColor}
                      _hover={{
                        transform: "scale(1.15)",
                        cursor: "pointer",
                        borderBottom: "1px solid purple",
                      }}
                      fontFamily="cursive"
                      fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                    >
                      <Link href="/login">SignIn</Link>
                    </Button>
                  </>
                )}
              </Flex>

              {isLesserThan900 && (
                <Icon
                  as={GiHamburgerMenu}
                  id="hamburgerIcon"
                  onClick={() => dispatch(setDrawerState(true))}
                  ml={4}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
              )}
              <DrawerComponent user={user} />
            </Flex>{" "}
          </>
        ) : (
          <>
            <Box alignItems="center">
              <LinkBox>
                <HStack _hover={{ cursor: "pointer" }} spacing="4">
                  <Link href="/">
                    <Icon
                      as={FaVoteYea}
                      _focus={{ outline: "none" }}
                      w={{ base: "27px", md: "30px", lg: "35px" }}
                      h={{ base: "18px", md: "20px", lg: "35px" }}
                      color={iconColor}
                      _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                    />
                  </Link>
                  <Text
                    fontWeight="700"
                    mr="9"
                    fontSize={{ base: "17px", md: "18px", lg: "20px" }}
                    fontFamily="cursive"
                    color={textColor}
                  >
                    {user.organization}
                  </Text>
                </HStack>
              </LinkBox>
            </Box>
            <Flex align="center">
              <Flex align="center">
                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  mx={3}
                  w={{ base: "18px", md: "20px", lg: "22px" }}
                  h={{ base: "18px", md: "20px", lg: "22px" }}
                  color={iconColor}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />

                <Button
                  bgColor={bgColor}
                  _hover={{
                    transform: "scale(1.15)",
                    cursor: "pointer",
                    borderBottom: "1px solid purple",
                  }}
                  fontFamily="cursive"
                  fontSize={{ base: "11px", md: "15px", lg: "17px" }}
                  onClick={(e) => signOutHandler()}
                >
                  SignOut
                </Button>
                <Icon
                  as={FaUser}
                  w={{ base: "18px", md: "20px", lg: "22px" }}
                  h={{ base: "18px", md: "20px", lg: "22px" }}
                  mx={3}
                  color={iconColor}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
                <Icon
                  as={GiHamburgerMenu}
                  id="hamburgerIcon"
                  onClick={() => dispatch(setDrawerState(true))}
                  ml={4}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
                <DrawerComponent user={user} />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
export default Header;
