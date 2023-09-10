import { useEffect, useState } from "react";
import router from "next/router";
import {
  Box,
  Text,
  Flex,
  VStack,
  Image,
  Button,
  Center,
  Grid,
} from "@chakra-ui/react";
import Nominee from "../../../../models/election/Nominee";
import { useSelector } from "react-redux";
import {
  selectVoteState,
  setFilteredNominees,
  setVotingPositions,
  VerifyToken,
  VoteNominee,
} from "../../../../redux/features/Users/voting";
import { dispatch } from "../../../../redux/store";
import { ErrorTypes } from "../../../../models/auth/stateModel";
import {
  createResponse,
  setLoading,
} from "../../../../redux/features/Users/auth";
import VotingService from "../../../../Utils/axios/apis/voting";
import { ErrorHandler } from "../../../../Utils/Error";
import {
  GetNominees,
  GetPositions,
} from "../../../../redux/features/Users/election";
import Position from "../../../../models/election/positions";

const Posts = () => {
  const { nominees, positions, filteredNominees } =
    useSelector(selectVoteState);
  const [post, setPost] = useState<string>(null);
  const [organization, setOrganization] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (nominees.length < 1 || positions.length < 1) {
      const user = sessionStorage.getItem("user");
      if (user) {
        dispatch(setLoading(true));
        dispatch(GetNominees(user));
        dispatch(GetPositions(user));
      }
    }
  }, []);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    const queryValue = window.location.pathname.split("/").slice(2);

    setOrganization(queryValue[0]);
    setId(queryValue[1]);
    setPost(queryValue[2].split("%20").join(" "));

    if (token === null) {
      router.push(`/voting/${queryValue[0]}/${queryValue[1]}`);
    } else {
      dispatch(VerifyToken(token));
    }
  }, []);

  useEffect(() => {
    const queryValue = window.location.pathname.split("/").slice(2);

    if (nominees) {
      let nomineesData = nominees.filter(
        (ele: Nominee) => ele.post === queryValue[2].split("%20").join(" ")
      );
      dispatch(setFilteredNominees(nomineesData));
    }
  }, [nominees]);

  useEffect(() => {
    let nomineesData: Nominee[] = nominees.filter(
      (ele: Nominee) => ele.post === post
    );
    dispatch(setFilteredNominees(nomineesData));
  }, [post]);

  const submitHandler = async (ele: Nominee) => {
    dispatch(setLoading(true));
    try {
      const res = await VotingService.VoteNominee(ele.id, ele.votes.toString());
      if (res.data) {
        dispatch(setLoading(false));
        if (positions.length > 0) {
          const Positions = JSON.parse(sessionStorage.getItem("positions"));

          let nextPostName = Positions[Positions.indexOf(post) + 1];
          let nextPost = positions.find((x) => x.name === nextPostName);
          console.log(nextPost, positions, nextPostName, positions.indexOf(nextPost));
          let updatedPositions = [];
          if (positions.length >= 1) {
            updatedPositions = [...positions].slice(
              positions.indexOf(nextPost) + 1, 
            );
            setPost(nextPost.name);
            dispatch(setVotingPositions(updatedPositions));
            router.push(`/voting/${organization}/${id}/${nextPost.name}`);
          } else {
            dispatch(setVotingPositions(updatedPositions));
            router.push(`/voting/${organization}/${id}`);
          }
        } else {
          sessionStorage.clear();
          router.push(`/voting/${organization}/${id}`);
          dispatch(
            createResponse({
              type: ErrorTypes.Success,
              title: "Completed",
              message: `Thanks for Voting`,
            })
          );
        }
      } else {
        dispatch(setLoading(false));
      }
    } catch (err) {
      console.log(err);
      dispatch(createResponse(ErrorHandler(err)));
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        bgGradient="linear(to-r, gray.200, white, gray.100)"
      >
        <Center>
          <Text
            fontFamily="cursive"
            fontSize={{ base: "25px", md: "30px", lg: "50px" }}
          >
            {post}
          </Text>
        </Center>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ base: "8px", lg: "20px", xl: "24px" }}
          w="90%"
          m="30px auto"
        >
          {filteredNominees.length > 0 ? (
            filteredNominees.map((ele) => {
              return (
                <Flex
                  flexDirection="column"
                  mb="2"
                  key={ele.id}
                  p="2"
                  h={{ base: "40vh", md: "35vh", lg: "40vh" }}
                  borderLeft="1px"
                  borderBottom="1px"
                  borderColor="gray.200"
                  boxShadow="base"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={ele.image}
                    alt="Nominee Image"
                    objectFit="cover"
                    m="2"
                  />
                  <Flex p="1" justify="space-between">
                    <VStack align="start" spacing="2">
                      <Text>Name: {ele.name}</Text>
                      <Button
                        color="blackAlpha.800"
                        onClick={() => submitHandler(ele)}
                      >
                        Vote
                      </Button>
                    </VStack>
                  </Flex>
                </Flex>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
