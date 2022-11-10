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
} from "@chakra-ui/react";
import Nominee from "../../../../models/election/Nominee";
import { useSelector } from "react-redux";
import {
  selectVoteState,
  setFilteredNominees,
  setPositions,
  VerifyToken,
  VoteNominee,
} from "../../../../redux/features/Users/voting";
import { dispatch } from "../../../../redux/store";
import { ErrorTypes } from "../../../../models/auth/stateModel";
import { createResponse } from "../../../../redux/features/Users/auth";

const Posts = () => {
  const { nominees, positions, filteredNominees } =
    useSelector(selectVoteState);
  const [post, setPost] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    let token = localStorage.getItem("token")
    const queryValue = window.location.pathname.split("/").slice(2);

    setOrganization(queryValue[0]);
    setId(queryValue[1]);
    setPost(queryValue[2].split("%20").join(" "));

    let nomineesData = nominees.filter(
      (ele: Nominee) => ele.post === queryValue[2].split("%20").join(" ")
    );
    dispatch(setFilteredNominees(nomineesData));

    if (token === null) {

      router.push(`/voting/${queryValue[0]}/${queryValue[1]}`);
    } else {
      dispatch(VerifyToken(token));
    }
  }, []);

  useEffect(() => {
    let nomineesData: Nominee[] = nominees.filter(
      (ele: Nominee) => ele.post === post
    );
    dispatch(setFilteredNominees(nomineesData));
  }, [post]);

  const submitHandler = async (ele: Nominee) => {
    dispatch(VoteNominee(ele.id, ele.votes.toString()));

    
    if (positions.length > 0) {
      let nextPost = positions[0];
      setPost(nextPost);
      router.push(`/voting/${organization}/${id}/${nextPost}`);

      let updatedPositions = [...positions].filter(ele => ele !== nextPost);
      dispatch(setPositions(updatedPositions));
    } else {
      localStorage.clear();
      router.push(`/voting/${organization}/${id}`);
      dispatch(
        createResponse({
          type: ErrorTypes.Success,
          title: "Completed",
          message: `Thanks for Voting`,
        })
      );
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
          <Text fontFamily="cursive" fontSize={{ base: "25px", md: "30px", lg: "50px" }}>
            {post}
          </Text>
        </Center>
        <Flex display={{ base: "block" }} mt="5" p="4">
          {filteredNominees.length > 0 ? (
            filteredNominees.map((ele) => {
              return (
                <Box
                  mb="2"
                  display={{ md: "inline-block" }}
                  key={ele.id}
                  p="2"
                  w={{ base: "100%", md: "47%", lg: "32%" }}
                  mr={{ lg: "3" }}
                  h={{ base: "40vh", md: "35vh", lg: "40vh" }}
                  borderLeft="1px"
                  borderBottom="1px"
                  borderColor="gray.200"
                  boxShadow="base"
                >
                  <Center>
                    <Image
                      src={ele.image}
                      alt="Nominee Image"
                      objectFit="cover"
                      m="2"
                      boxSize={{ base: "30vh", md: "20vh", lg: "25vh" }}
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
                  </Center>
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Posts;
