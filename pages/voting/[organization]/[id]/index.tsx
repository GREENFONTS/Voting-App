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
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { dispatch } from "../../../../redux/store";
import {
  setAuthenticated,
  setElectionUser,
  GetVotingData,
  selectVoteState,
  setElectionStatus,
  setVotingNominees,
  setVotingPositions
} from "../../../../redux/features/Users/voting";
import { useSelector } from "react-redux";
import { ErrorTypes } from "../../../../models/auth/stateModel";
import {
  AddUserData,
  createResponse,
  setLoading,
} from "../../../../redux/features/Users/auth";
import VotingService from "../../../../Utils/axios/apis/voting";
import { ErrorHandler } from "../../../../Utils/Error";

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

  const InitRequests = async (userId) => {
    try {
      const res = await VotingService.GetUser(userId);
      dispatch(setElectionUser(res.data.user));
      dispatch(setVotingNominees(res.data.nominees));
      dispatch(setVotingPositions(res.data.positions));
      dispatch(setElectionStatus(res.data.state));
  
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(createResponse(ErrorHandler(err)));
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    const queryValue = window.location.pathname.split("/").slice(2);
    const userId = queryValue[1];
    setId(queryValue[1]);
    setOrganization(queryValue[0]);

    InitRequests(userId)
   
  }, []);

  //code validation
  useEffect(() => {
    if (code.length > 1) {
      setIsRequired(false);
    }
  }, [code]);

  useEffect(() => {
    let Positions  = []
    if(positions.length > 0){
      Positions = positions.map(x => x.name)
      let position = JSON.parse(sessionStorage.getItem("positions"));
      if(!position){
        sessionStorage.setItem("positions", JSON.stringify(Positions))
      }
      
    }
  }, [positions])

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
      try {
        dispatch(setLoading(true));
        const res = await VotingService.VerifyCode(code, user);
        if (res.data) {
          dispatch(setAuthenticated(res.data));
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("user", res.data.user);
          dispatch(setLoading(false));
        }
      } catch (err: any) {
        console.log(err);
        dispatch(setLoading(false));
        dispatch(createResponse(ErrorHandler(err)));
      }
    }
  };

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("token", token);
      if (positions.length >= 1) {
        router.push(`/voting/${organization}/${id}/${positions[0].name}`);
      }
      sessionStorage.setItem("currentPost", JSON.stringify(positions[0]))
      let updatedPositions = [...positions].filter(
        (ele) => ele !== positions[0]
      );
      dispatch(setVotingPositions(updatedPositions));
    }
  }, [token]);

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        bgGradient="linear(to-r, gray.200, white, gray.200)"
      >
        {isLargerThan900 && (
          <Center h="90vh" w="100%">
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
                <Text fontSize={{ base: "30px", lg: "50px" }} color="black">
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
          </Center>
        )}
        {isLesserThan900 && (
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
        )}
      </Box>
    </>
  );
};

export default Voting;
