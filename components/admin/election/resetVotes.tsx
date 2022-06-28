import { useState } from "react";
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
import AlertComponent from "../../alert";

const ResetVotes = (props) => {
  const { onOpen, onClose } = useDisclosure();
  const [isAlertError, setAlertError] = useState<boolean>(false);
  const [isAlertSuccess, setAlertSuccess] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const submitHandler = async () => {
    const res = await fetch("/api/voting/resetVotes", {
      method: "POST",
      body: props.user.email,
    });
    if (res.status == 200) {
      setResponse(`Election votes has been cleared`);
      props.isClose(false);
      setAlertSuccess(true);
    } else {
      setResponse("Reset Votes request failed");
      props.refreshDrawer(true);
      props.isClose(false);
      setAlertError(true);
    }
  };

  return (
    <>
      <AlertComponent
        isAlertError={isAlertError}
        isAlertSuccess={isAlertSuccess}
        setAlertError={setAlertError}
        setAlertSuccess={setAlertSuccess}
        response={response}
      />

      <Flex p="5">
        <Modal isOpen={props.isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <Center>Reset votes</Center>
            </ModalHeader>
            <ModalCloseButton onClick={(e) => props.isClose(false)} />
            <ModalBody>
              <Text fontSize="15px" fontFamily="cursive" fontWeight="600">
                This will clear the election votes
              </Text>
              <Text fontSize="20px" fontFamily="cursive" fontWeight="600">
                {" "}
                Do you want to reset the elections?
              </Text>
              <HStack mt="3">
                <Button onClick={(e) => submitHandler()}>Yes</Button>
                <Button onClick={(e) => props.isClose(false)}>No</Button>
              </HStack>
            </ModalBody>

            <ModalFooter>
              <Button
                bg="#e8e8e8"
                mr={3}
                onClick={() => {
                  props.isClose(false);
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

export default ResetVotes;
