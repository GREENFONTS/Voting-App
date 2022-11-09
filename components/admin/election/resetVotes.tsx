import { Dispatch, SetStateAction } from "react";
import {
  Flex,
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
import { ResetVotes } from "../../../redux/features/Users/election";

type Props = {
  email: string;
  isOpen: boolean;
  setModalState: Dispatch<SetStateAction<Boolean>>;
};

const ResetVotesModal : React.FC<Props> = ({ isOpen, email, setModalState }) => {
  const {onClose } = useDisclosure();

  const submitHandler = async () => {
    dispatch(ResetVotes({user : email}));
  };

  return (
    <>
      <Flex p="5">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <Center>Reset votes</Center>
            </ModalHeader>
            <ModalCloseButton onClick={(e) => setModalState(false)} />
            <ModalBody>
              <Text fontSize="15px" fontFamily="cursive" fontWeight="600">
                This will clear the election votes
              </Text>
              <Text fontSize="20px" fontFamily="cursive" fontWeight="600">
                {" "}
                Do you want to reset the elections?
              </Text>
              <HStack mt="3">
                <Button onClick={() => submitHandler()}>Yes</Button>
                <Button onClick={() => setModalState(false)}>No</Button>
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

export default ResetVotesModal;
