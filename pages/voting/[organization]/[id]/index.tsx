import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { useCounter } from "../../../../services/state";
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
  Alert,
  CloseButton,
  AlertIcon,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const Voting = ({ router }) => {
  const [state, actions] = useCounter();
  const [isLargerThan900] = useMediaQuery("(min-width: 800px)");
  const [isLesserThan900] = useMediaQuery("(max-width: 800px)");
  const bgColor = useColorModeValue("themeLight.bg", "themeDark.bgBody");
  const [code, setCode] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [organization, setOrganization] = useState<string>("");
  const [id, setId] = useState<string>("");

  const GetData = async (userId : string) => {
    let positions : string[] = [];
    const res = await fetch(`/api/voting?id=${userId}`);
    const data = await res.json();
    let email = data.user;

    const electionRes = await fetch("/api/voting/state", {
      method: "POST",
      body: email,
    });
    const electionState = await electionRes.json();
    actions.electionState(electionState.state);

    if (res.status == 404) {
      router.push("/404.js");
    }
    if (res.status == 200) {
      localStorage.setItem("admin", email);

      const nomineesRes = await fetch("/api/admin/nominees/find", {
        method: "POST",
        body: email,
      });
      const nomineesData = await nomineesRes.json();

      nomineesData.forEach((e) => {
        positions.push(e.post);
      });

      positions = [...new Set(positions)];
      actions.getPositions(positions);
      localStorage.setItem("nominees", JSON.stringify(nomineesData));
    }
  };

  useEffect(() => {
    const queryValue = window.location.pathname.split("/").slice(2);
    const userId = queryValue[1];
    setId(queryValue[1]);
    setOrganization(queryValue[0]);

    GetData(userId);
  }, []);

  //code validation
  useEffect(() => {
    if (code.length > 1) {
      setIsRequired(false);
    }
  }, [code]);

  //to voting route
  const submitHandler = async () => {
    let positions = [];
    state.positions.forEach((ele) => {
      positions.push(ele);
    });

    if (state.electionState == false) {
      setAlertMessage("Voting has ended");
      setCode("");
      setIsRequired(true);
    } else {
      let email = localStorage.getItem("admin");
      const res = await fetch(`/api/voting/code/?code=${code}&user=${email}`);
      const data = await res.json();

      if (res.status == 404) {
        setAlertMessage(data.msg);
        setCode("");
      }
      if (res.status == 200) {
        localStorage.setItem("codeToken", data.token);
        router.push(`/voting/${organization}/${id}/${positions[0]}`);
        positions.shift();
        actions.getPositions(positions);
      }
    }
  };

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
              ></Box>
              <Box
                w={{ base: "100%", md: "45%" }}
                h={{ base: "200px", md: "250px", lg: "50vh" }}
                mt={{ lg: "12" }}
              >
                <Center>
                  <Text fontSize={{ md: "40px", lg: "50px" }} color="black">
                    Welcome To <br /> {organization} <br /> Elections
                  </Text>
                </Center>

                <Box mt="5">
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

                  {state.votingEnd ? (
                    <Alert status="success">
                      {" "}
                      <AlertIcon />
                      Thanks for Voting
                      <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={(e) => actions.votingEnd(false)}
                      />
                    </Alert>
                  ) : (
                    <></>
                  )}

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
              <Center mb="3">
                <Text fontSize="35px">
                  Welcome To <br /> {organization} <br /> Elections
                </Text>
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

                {state.votingEnd ? (
                  <Alert status="success">
                    {" "}
                    <AlertIcon />
                    Thanks for Voting
                    <CloseButton
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={(e) => actions.votingEnd(false)}
                    />
                  </Alert>
                ) : (
                  <></>
                )}

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

export default withRouter(Voting);
