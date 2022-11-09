import { Flex, Box, Text, Center, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GenerateCode from "../../components/admin/codes/generate";
import { selectAuthState } from "../../redux/features/Users/auth";
import {
    GetCodes,
  selectElectState,
} from "../../redux/features/Users/election";
import { dispatch } from "../../redux/store";
import CodeList from "../../components/admin/codes/listCodes";

const CodesPage = () => {
  const { user } = useSelector(selectAuthState);
  const { codes } = useSelector(selectElectState);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (user !== null) {
      dispatch(GetCodes({user: user.email}));
    }
  }, [user]);

  return (
    <Box padding="20px" width="70%" margin="auto">
      <Flex alignItems="center" justifyContent="center" mb="5">
        <Text textAlign="center" fontSize="30px">
          Election Codes
        </Text>
      </Flex>

      <Flex mb="5" justifyContent="space-between">
        <Button onClick={() => setModal(true)}>Generate Codes</Button>
       
      </Flex>

      <Box>
        {codes.length === 0 ? (
          <Text fontSize="20px" fontWeight="500">
            No Election Code had been generated...
          </Text>
        ) : (
          <Box >
            <CodeList user={user.email} codes={codes}/>
          </Box>
        )}
      </Box>
      {modal && (
          <GenerateCode
            email={user.email}
            isOpen={modal}
            setModalState={setModal}
          />
        )}
    </Box>
  );
};

export default CodesPage;
