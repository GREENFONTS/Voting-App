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
  Accordion,
  useDisclosure,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Button,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { VscGithub } from "react-icons/vsc";
import { FaInstagram, FaEdit, FaList, FaDoorClosed } from "react-icons/fa";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { FaVoteYea } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
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

  // const GetData = async () => {
  //   const positionsRes = await fetch("/api/admin/positions/find", {
  //     method: "POST",
  //     body: user.email,
  //   });
  //   const positionData = await positionsRes.json();
  //   actions.getPositions(positionData);

  //   const nomineesRes = await fetch("/api/admin/nominees/find", {
  //     method: "POST",
  //     body: user.email,
  //   });
  //   const nomineesData = await nomineesRes.json();
  //   actions.getNominees(nomineesData);

  //   const codesRes = await fetch("/api/admin/codes/find", {
  //     method: "POST",
  //     body: state.user.email,
  //   });
  //   const codesData = await codesRes.json();
  //   actions.getCodes(codesData);

  //   const electionRes = await fetch("/api/voting/state", {
  //     method: "POST",
  //     body: state.user.email,
  //   });
  //   const electionState = await electionRes.json();
  //   actions.electionState(electionState.state);
  // };

  // useEffect(() => {
  //   if (user === null || user === undefined) {
  //     setUserCheck(false);
  //   } else {
  //     GetData();
  //   }
  // }, [refreshDrawer]);

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
                  <LinkBox>
                    <HStack _hover={{ cursor: "pointer" }}>
                      <Link href="/">
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
                        />
                      </Link>
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "20px", md: "25px", lg: "30px" }}
                        fontFamily="cursive"
                        color={textColor}
                      >
                        easy-vote
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

            <DrawerBody>
              <Box animation="bounceFromBottom 1s">
                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                  >
                    <Link
                      onClick={() => dispatch(setDrawerState(false))}
                      href="/"
                    >
                      {" "}
                      Home
                    </Link>
                  </Button>
                </Box>

                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                  >
                    <Link
                      onClick={() => dispatch(setDrawerState(false))}
                      href="/register"
                    >
                      {" "}
                      Sign Up
                    </Link>
                  </Button>
                </Box>
                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                  >
                    <Link
                      onClick={() => dispatch(setDrawerState(false))}
                      href="/login"
                    >
                      {" "}
                      Sign In
                    </Link>
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
                      <Link href="/">
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
                        />
                      </Link>
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
                <Link href="/admin/position/" onClick={() => dispatch(setDrawerState(false))}>
                  <Text
                    _hover={{
                      transform: "scale(1.02)",
                      cursor: "pointer",
                    }}
                    fontWeight="700"
                    fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                    color="gray.500"
                  >
                    Positions
                  </Text>
                </Link>

                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton pt="0.5" pb="0.5">
                      <Box flex="1" textAlign="left">
                        <Text
                          _hover={{
                            transform: "scale(1.02)",
                            cursor: "pointer",
                          }}
                          fontWeight="700"
                          fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                          color="gray.500"
                        >
                          Nominees
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel ml="4" p={2} display="block">
                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={FaEdit} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.listNominees(false);
                            // actions.addDrawerState(false);
                            // actions.addNominee(true);
                            // actions.showResults(false);
                            // actions.listCodes(false);
                          }}
                        >
                          Add Nominees
                        </Button>
                      </HStack>

                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={FaList} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.addDrawerState(false);
                            // actions.listNominees(true);
                            // actions.showResults(false);
                            // actions.listCodes(false);
                            // actions.landingPage(false);
                          }}
                        >
                          Show Nominees
                        </Button>
                      </HStack>

                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={AiOutlineClear} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.listNominees(false);
                            // actions.addDrawerState(false);
                            // actions.clearNominees(true);
                            // actions.listCodes(false);
                            // actions.showResults(false);
                          }}
                        >
                          Clear Nominees
                        </Button>
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton pt="0.5" pb="0.5">
                      <Box flex="1" textAlign="left">
                        <Text
                          _hover={{
                            transform: "scale(1.02)",
                            cursor: "pointer",
                          }}
                          fontWeight="700"
                          fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                          color="gray.500"
                        >
                          Codes
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel ml="4" p="2px" display="block">
                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={FaEdit} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.listNominees(false);
                            // actions.addDrawerState(false);
                            // actions.generateCode(true);
                            // actions.listCodes(false);
                            // actions.showResults(false);
                          }}
                        >
                          Generate Codes
                        </Button>
                      </HStack>

                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={FaList} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.listNominees(false);
                            // actions.addDrawerState(false);
                            // actions.listCodes(true);
                            // actions.showResults(false);
                            // actions.landingPage(false);
                          }}
                        >
                          Show Codes
                        </Button>
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton pt="0.5" pb="0.5">
                      <Box flex="1" textAlign="left">
                        <Text
                          _hover={{
                            transform: "scale(1.02)",
                            cursor: "pointer",
                          }}
                          fontWeight="700"
                          fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                          color="gray.500"
                        >
                          Election
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel ml="4" p="1px" display="block">
                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={FaEdit} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.listNominees(false);
                            // actions.addDrawerState(false);
                            // actions.listCodes(false);
                            // actions.generateLink(true);
                            // actions.showResults(false);
                          }}
                        >
                          Generate Link
                        </Button>
                      </HStack>

                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={FaDoorClosed} />
                        <Button
                          bg="white"
                          onClick={(e) => {
                            // actions.endElectionModal(true);
                            // actions.addDrawerState(false);
                          }}
                        >
                          {/* {state.electionState
                            ? "End Election"
                            : "Start Election"} */}
                        </Button>
                      </HStack>

                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={FaList} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.listNominees(false);
                            // actions.addDrawerState(false);
                            // actions.listCodes(false);
                            // actions.showResults(true);
                            // actions.landingPage(false);
                          }}
                        >
                          Show Results
                        </Button>
                      </HStack>

                      <HStack
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      >
                        <Icon as={BiReset} />
                        <Button
                          bg={bgColor}
                          onClick={(e) => {
                            // actions.listNominees(false);
                            // actions.addDrawerState(false);
                            // actions.listCodes(false);
                            // actions.resetVotes(true);
                            // actions.showResults(false);
                          }}
                        >
                          Reset Votes
                        </Button>
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
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
                <Image w="100%" h="100%" src="flag.png" />
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
