import { useEffect, useState } from "react";
import router from "next/router";
import {
  Box,
  Text,
  Button,
  useMediaQuery,
  Image,
  Center,
  FormControl,
  FormLabel,
  Input,
  Flex
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { dispatch } from "../../../../redux/store";
import {
  setPositions,
  VerifyCode,
} from "../../../../redux/features/Users/voting";
import {
  GetVotingData,
  selectVoteState,
} from "../../../../redux/features/Users/voting";
import { useSelector } from "react-redux";
import { ErrorTypes } from "../../../../models/auth/stateModel";
import { createResponse } from "../../../../redux/features/Users/auth";

const Voting = () => {
  const { electionStatus, nominees, positions, user, token } =
    useSelector(selectVoteState);
  const [isLargerThan900] = useMediaQuery("(min-width: 800px)");
  const [isLesserThan900] = useMediaQuery("(max-width: 800px)");
  const bgColor = useColorModeValue("themeLight.bg", "themeDark.bgBody");
  const [code, setCode] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [organization, setOrganization] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    let positions = [];
    if (nominees.length !== 0) {
      nominees.forEach((ele) => {
        positions.push(ele.post);
      });
      dispatch(setPositions(positions));
    }
  }, [nominees]);

  useEffect(() => {
    const queryValue = window.location.pathname.split("/").slice(2);
    const userId = queryValue[1];
    setId(queryValue[1]);
    setOrganization(queryValue[0]);

    dispatch(GetVotingData(userId));
  }, []);

  //code validation
  useEffect(() => {
    if (code.length > 1) {
      setIsRequired(false);
    }
  }, [code]);

  //to voting route
  const submitHandler = async () => {
    if (electionStatus === false) {
      dispatch(
        createResponse({
          type: ErrorTypes.Error,
          title: "Error",
          message: `Voting has ended`,
        })
      );
      setCode("");
      setIsRequired(true);
    } else {
      dispatch(VerifyCode(code, user));
    }
  };

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("token", token);
      if (positions.length >= 1) {
        router.push(`/voting/${organization}/${id}/${positions[0]}`);
      }
      let updatedPositions = [...positions].filter(
        (ele) => ele !== positions[0]
      );
      dispatch(setPositions(updatedPositions));
    }
  }, [token]);

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        bgGradient="linear(to-r, gray.200, white, gray.200)"
      >
        {/* {isLargerThan900 && ( */}
          <Flex h="90vh" w="100%">
            <Box
              height={{ base: "230px", md: "300px", lg: "80vh" }}
              w="95%"
              display={{ md: "flex" }}
              px={{ base: "24px", md: "27px", lg: "30px" }}
              py={4}
              bg={bgColor}
              alignSelf="center"
            >
              <Box
                w={{ base: "100%", md: "45%" }}
                h={{ base: "200px", md: "250px", lg: "75vh" }}
              >
                <Image
                  src="/votingbg.png"
                  alt="Topic"
                  h={{ base: "200px", md: "250px", lg: "75vh" }}
                  width="100%"
                  animation="bounceFromBottomLeft 0.5s"
                />
              </Box>

              <Box
                w={{ base: "100%", md: "5%" }}
                h={{ base: "200px", md: "250px", lg: "60vh" }}
                display={{ base: "none", md: "block" }}
              ></Box>
              <Box
                w={{ base: "100%", md: "75%", lg: "45%" }}
                h={{ base: "200px", md: "250px", lg: "50vh" }}
                mt={{ lg: "12" }}
              >
                <Text
                  fontSize={{ base: "30px",  lg: "50px" }}
                  color="black"
                >
                  Welcome To <br /> {organization} Elections
                </Text>

                <Box mt="5">
                  <FormControl isRequired>
                    <FormLabel htmlFor="code" color="black">
                      Enter code to Vote:{" "}
                    </FormLabel>
                    <Input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <Box mt="5">
                  <Button
                    id="button"
                    isDisabled={isRequired}
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                    onClick={(e) => submitHandler()}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
            </Flex>
        {/* )} */}
        {/* {isLesserThan900 && (
          <Center h="100vh" w="100%">
            <Box height="100vh" w="95%" bg={bgColor} alignSelf="center">
              <Center mb="3" p="3">
                <Text>Welcome To {organization} Elections</Text>
              </Center>

              <Box h="35vh">
                <Image
                  src="/votingbg.png"
                  alt="Topic"
                  h="35vh"
                  width="100%"
                  animation="bounceFromBottomLeft 0.5s"
                />
              </Box>
              <Box h="2vh"></Box>

              <Box mt="5">
                <FormControl isRequired>
                  <FormLabel htmlFor="code">Enter code to Vote: </FormLabel>
                  <Input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </FormControl>
              </Box>

              <Box mt="5">
                <Button
                  id="button"
                  isDisabled={isRequired}
                  _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                  onClick={(e) => submitHandler()}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Center>
        )} */}
      </Box>
    </>
  );
};

export default Voting;
