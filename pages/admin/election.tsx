import { Flex, Box, Text, Center, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GenerateLink from "../../components/admin/election/generateLink";
import ResetVotesModal from "../../components/admin/election/resetVotes";
import ShowResults from "../../components/admin/election/showResults";
import { selectAuthState } from "../../redux/features/Users/auth";
import {
  GetElectionStatus,
  GetNominees,
  selectElectState,
  UpdateElectionStatus,
} from "../../redux/features/Users/election";
import { dispatch } from "../../redux/store";

const ElectionPage = () => {
  const { user } = useSelector(selectAuthState);
  const { nominees, positions, electionStatus } = useSelector(selectElectState);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (user !== null) {
      dispatch(GetElectionStatus({ user: user.email }));
    }
    setModal(false);
  }, [user]);

  return (
    <Box
      padding="20px"
      width={{ base: "95%", md: "90%", lg: "80%" }}
      margin="auto"
    >
      <Flex alignItems="center" justifyContent="center" mb="5">
        <Text textAlign="center" fontSize="30px">
          Election DashBoard
        </Text>
      </Flex>

      <Flex mb="5" justifyContent="space-between">
        <Button
          onClick={() => dispatch(UpdateElectionStatus({ user: user.email }))}
        >
          {electionStatus ? "End Election" : "Start Election"}
        </Button>
        <Button onClick={() => setModal(true)}>Reset Votes</Button>
      </Flex>

      <GenerateLink user={user} />

      <Box>
        {electionStatus ? (
          <ShowResults
            Nominees={nominees}
            Positions={positions}
            electionStatus={electionStatus}
          />
        ) : (
          <Box mt="5" fontSize="25px">
            Voting has not started...
          </Box>
        )}
      </Box>
      {modal && (
        <ResetVotesModal
          email={user.email}
          isOpen={modal}
          setModalState={setModal}
        />
      )}
    </Box>
  );
};

export default ElectionPage;
