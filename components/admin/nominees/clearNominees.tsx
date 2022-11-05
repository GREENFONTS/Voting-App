import { Dispatch, SetStateAction, useState } from "react";
import {
  Flex,
  Alert,
  AlertIcon,
  CloseButton,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Text,
  HStack,
  Center,
} from "@chakra-ui/react";
import { dispatch } from "../../../redux/store";
import { ClearAllNominees } from "../../../redux/features/Users/election";

type Props = {
  email: string;
  isOpen: boolean;
  setModalState: Dispatch<SetStateAction<Boolean>>;
};

const ClearNominees : React.FC<Props> = ({ isOpen, setModalState, email }) => {
  const { onClose } = useDisclosure();

  const submitHandler = async () => {
    dispatch(ClearAllNominees(email))
    setModalState(false)
  };

  return (
    <>
      <Flex p="5">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <Center>Clear Nominees</Center>
            </ModalHeader>
            <ModalCloseButton onClick={(e) => setModalState(false)} />
            <ModalBody>
              <Text fontSize="20px" fontFamily="cursive" fontWeight="600">
                {" "}
                Do you want to clear all Nominees?
              </Text>
              <HStack mt="3">
                <Button onClick={(e) => submitHandler()}>Yes</Button>
                <Button onClick={(e) => setModalState(false)}>No</Button>
              </HStack>
            </ModalBody>

            <ModalFooter>
              <Button
                bg="#e8e8e8"
                mr={3}
                onClick={() => {
                  setModalState(false);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default ClearNominees;
