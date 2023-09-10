import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { dispatch } from "../../../redux/store";
import { addPosition } from "../../../redux/features/Users/election";
import Position from "../../../models/election/positions";

type Props = {
  email: string;
  isOpen: boolean;
  setModalState: Dispatch<SetStateAction<Boolean>>;
};

const AddPosition: React.FC<Props> = ({ email, isOpen, setModalState }) => {
  const { onClose } = useDisclosure();
  const [position, setPosition] = useState<string>("");
  const [inputCheck, setInputCheck] = useState<boolean>(false);

  useEffect(() => {
    if (position.length < 1) {
      setInputCheck(true);
    } else {
      setInputCheck(false);
    }
  }, [position]);

  const submitHandler = async () => {
    const formBody: Position = {
      id: "",
      name: position,
      user: email,
    };
    console.log(email)
    dispatch(addPosition(formBody));
  };

  return (
    <>
      <Flex p="2">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <Center>Add Positions</Center>
            </ModalHeader>
            <ModalCloseButton onClick={(e) => setModalState(false)} />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="position">Position</FormLabel>
                <Input
                  id="position"
                  type="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                disabled={inputCheck}
                bg="#e8e8e8"
                mr={3}
                onClick={() => {
                  setModalState(false);
                  submitHandler();
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default AddPosition;
