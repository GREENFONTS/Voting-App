import { Flex, Box, Text, Center, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddNomineeModal from "../../components/admin/nominees/addNominees";
import ClearNominees from "../../components/admin/nominees/clearNominees";
import NomineesList from "../../components/admin/nominees/listNominees"
import { selectAuthState } from "../../redux/features/Users/auth";
import {
  GetNominees,
  selectElectState,
} from "../../redux/features/Users/election";
import { dispatch } from "../../redux/store";

const NomineePage = () => {
  const { user } = useSelector(selectAuthState);
  const { nominees, positions } = useSelector(selectElectState);
  const [modal, setModal] = useState(false);
  const [clearModal, setClearModal] = useState(false);

  useEffect(() => {
    if (user !== null) {
      dispatch(GetNominees(user.email));
    }
  }, []);

  return (
    <Box padding="20px" width="80%" margin="auto">
      <Flex alignItems="center" justifyContent="center" mb="5">
        <Text textAlign="center" fontSize="30px">
          Election Nominees
        </Text>
      </Flex>

      <Flex mb="5" justifyContent="space-between">
        <Button onClick={() => setModal(true)}>Add Nominee</Button>
        <Button onClick={() => setClearModal(true)}>Clear Nominees</Button>
       
      </Flex>

      <Box>
        {nominees.length === 0 ? (
          <Text fontSize="20px" fontWeight="500">
            No Nominee had been added...
          </Text>
        ) : (
          <Box>
            <NomineesList positions={positions} user={user.email} nominees={nominees}/>
          </Box>
        )}
      </Box>
      {modal && (
          <AddNomineeModal
            email={user.email}
            isOpen={modal}
            setModalState={setModal}
            positions={positions}
          />
        )}

        {clearModal && (
          <ClearNominees
            email={user.email}
            isOpen={clearModal}
            setModalState={setClearModal}
          />
        )}
    </Box>
  );
};

export default NomineePage;
