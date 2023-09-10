import { Flex, Box, Text, Center, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddPosition from "../../components/admin/positions/addPosition";
import PositionList from "../../components/admin/positions/listPositions";
import { selectAuthState } from "../../redux/features/Users/auth";
import {
  GetPositions,
  selectElectState,
} from "../../redux/features/Users/election";
import { dispatch } from "../../redux/store";

const PositionPage = () => {
  const { user } = useSelector(selectAuthState);
  const { positions } = useSelector(selectElectState);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (user !== null) {
      dispatch(GetPositions(user.email));
    }
  }, []);


  return (
    <Box padding="20px" width={{base:"95%", md: "75%", lg:"50%"}} margin="auto">
      <Flex alignItems="center" justifyContent="center" mb="5">
        <Text textAlign="center" fontSize="30px">
          Election Positions
        </Text>
      </Flex>

      <Flex mb="5">
        <Button onClick={() => setModal(true)}>Add Position</Button>
        {modal && (
          <AddPosition
            email={user.email}
            isOpen={modal}
            setModalState={setModal}
          />
        )}
      </Flex>

      <Box>
        {positions.length === 0 ? (
          <Text fontSize="20px" fontWeight="500">
            No Position had been added...
          </Text>
        ) : (
          <Box>
            <PositionList positions={positions} user={user.email} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PositionPage;
