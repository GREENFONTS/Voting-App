import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  Box,
  LinkBox,
  HStack,
  useDisclosure,
  Icon,
  Button,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import router from "next/router";
import { VscGithub } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaVoteYea } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  selectUtilState,
  setDrawerState,
} from "../../redux/features/Utils/utils";
import { dispatch } from "../../redux/store";

const DrawerComponent = ({ user }) => {
  const { drawerState } = useSelector(selectUtilState);
  const bgColor = useColorModeValue("themeLight.bg", "themeDark.bgBody");
  const textColor = useColorModeValue("black", "white");
  const bgInstagram = useColorModeValue("red", "white");
  const bgGithub = useColorModeValue("black", "white");
  const bgLinkedIn = useColorModeValue("#0077b5", "white");
  const bgTwitter = useColorModeValue("#1DA1F2", "white");
  const iconColor = useColorModeValue("themeLight.icon", "themeLight.icon");
  const { onClose } = useDisclosure();

  return (
    <Drawer
      onClose={onClose}
      isOpen={drawerState}
      placement="right"
      isFullHeight={false}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor={bgColor}>
        {user === null ? (
          <>
            <DrawerHeader>
              <Flex w="100%" align="center" justify="space-between">
                <Box alignItems="center">
                  <HStack _hover={{ cursor: "pointer" }}>
                    <Icon
                      _focus={{ outline: "none" }}
                      as={FaVoteYea}
                      w={{ base: "25px", md: "30px", lg: "40px" }}
                      h={{ base: "18px", md: "20px", lg: "35px" }}
                      color={iconColor}
                      _hover={{
                        transform: "scale(1.15)",
                        cursor: "pointer",
                      }}
                      onClick={() => router.push("/")}
                    />
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "20px", md: "25px", lg: "30px" }}
                      fontFamily="cursive"
                      color={textColor}
                    >
                      easy-vote
                    </Text>
                  </HStack>
                </Box>
                <Button
                  h={10}
                  w={10}
                  variant="unstyled"
                  m={3}
                  onClick={() => dispatch(setDrawerState(false))}
                >
                  x
                </Button>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <Box animation="bounceFromBottom 1s">
                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                    onClick={() => dispatch(setDrawerState(false))}
                  >
                    <Link href="/">Home</Link>
                  </Button>
                </Box>

                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                    onClick={() => dispatch(setDrawerState(false))}
                  >
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </Box>
                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                    onClick={() => dispatch(setDrawerState(false))}
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                </Box>
              </Box>
            </DrawerBody>
          </>
        ) : (
          <>
            <DrawerHeader pt="0" pb="0">
              <Flex w="100%" align="center" p="0" justify="space-between">
                <Box alignItems="center">
                  <LinkBox>
                    <HStack _hover={{ cursor: "pointer" }}>
                      <Icon
                        _focus={{ outline: "none" }}
                        as={FaVoteYea}
                        w={{ base: "18px", md: "20px", lg: "35px" }}
                        h={{ base: "18px", md: "20px", lg: "35px" }}
                        color={iconColor}
                        _hover={{
                          transform: "scale(1.15)",
                          cursor: "pointer",
                        }}
                        onClick={() => router.push("/")}
                      />
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "14px", md: "16px", lg: "20px" }}
                        fontFamily="cursive"
                        color={textColor}
                      >
                        {user === null ? "" : user.organization}
                      </Text>
                    </HStack>
                  </LinkBox>
                </Box>
                <Button
                  h={10}
                  w={10}
                  variant="unstyled"
                  m={3}
                  onClick={() => dispatch(setDrawerState(false))}
                >
                  x
                </Button>
              </Flex>
            </DrawerHeader>

            <DrawerBody pt="5" pb="0">
              <Box animation="bounceFromBottom 0.7s">
                <Flex
                  onClick={() => dispatch(setDrawerState(false))}
                  justifyContent="center"
                  _hover={{
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  }}
                >
                  <Text
                    p="3"
                    _hover={{
                      borderBottom: "2px solid #0f0d8d",
                      borderRadius: "12px",
                    }}
                    fontWeight="700"
                    fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                    color="gray.500"
                  >
                    <Link passHref href="/admin/position/">
                      Positions
                    </Link>
                  </Text>
                </Flex>

                <Flex
                  onClick={() => dispatch(setDrawerState(false))}
                  justifyContent="center"
                  _hover={{
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  }}
                >
                  <Text
                    p="3"
                    _hover={{
                      borderBottom: "2px solid #0f0d8d",
                      borderRadius: "12px",
                    }}
                    fontWeight="700"
                    fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                    color="gray.500"
                  >
                    <Link passHref href="/admin/nominee">
                      Nominees
                    </Link>
                  </Text>
                </Flex>

                <Flex
                  onClick={() => dispatch(setDrawerState(false))}
                  justifyContent="center"
                  _hover={{
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  }}
                >
                  <Text
                    p="3"
                    _hover={{
                      borderBottom: "2px solid #0f0d8d",
                      borderRadius: "12px",
                    }}
                    fontWeight="700"
                    fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                    color="gray.500"
                  >
                    <Link passHref href="/admin/codes">
                      Codes
                    </Link>
                  </Text>
                </Flex>

                <Flex
                  onClick={() => dispatch(setDrawerState(false))}
                  justifyContent="center"
                  _hover={{
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  }}
                >
                  <Text
                    p="3"
                    _hover={{
                      borderBottom: "2px solid #0f0d8d",
                      borderRadius: "12px",
                    }}
                    fontWeight="700"
                    fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                    color="gray.500"
                  >
                    <Link passHref href="/admin/election">
                      Election
                    </Link>
                  </Text>
                </Flex>
              </Box>
            </DrawerBody>
          </>
        )}

        <DrawerFooter>
          <Flex
            direction="column"
            px="4px"
            py="6px"
            h="100%"
            w="100%"
            bg={bgColor}
            borderTop="1px"
            borderColor="gray.200"
            align="center"
            justify="space-between"
          >
            <Flex paddingLeft="10px" align="center" justify="center">
              <Text paddingRight="10px">© 2022</Text>
              <Box w="15px" h="15px" marginRight="10px">
                <Image w="100%" h="100%" src="flag.png" alt="image" />
              </Box>
            </Flex>
            <Text>Godwill Onyewuchi Humphrey</Text>
            <Flex align="center" justify="center" paddingRight="10px">
              <Box
                paddingRight="10px"
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
              >
                <a
                  href="https://github.com/GREENFONTS"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    _focus={{ outline: "none" }}
                    as={VscGithub}
                    color={bgGithub}
                  />
                </a>
              </Box>
              <Box
                paddingRight="10px"
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
              >
                <a
                  href="https://www.instagram.com/onyewuchigodwill/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    _focus={{ outline: "none" }}
                    as={FaInstagram}
                    color={bgInstagram}
                  />
                </a>
              </Box>
              <Box
                paddingRight="10px"
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
              >
                <a
                  href="https://twitter.com/GODWILLONYEWUC1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    as={BsTwitter}
                    _focus={{ outline: "none" }}
                    color={bgTwitter}
                  />
                </a>
              </Box>
              <Box
                paddingRight="10px"
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
              >
                <a
                  href="https://www.linkedin.com/in/godwill-onyewuchi-6746621b4/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    as={BsLinkedin}
                    _focus={{ outline: "none" }}
                    color={bgLinkedIn}
                  />
                </a>
              </Box>
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
