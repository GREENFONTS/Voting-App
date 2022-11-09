import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
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
  FormHelperText,
  Center,
} from "@chakra-ui/react";
import { CreateCodesData } from "../../../models/election/Codes";
import { dispatch } from "../../../redux/store";
import { GenerateCodes } from "../../../redux/features/Users/election";

type Props = {
  email: string;
  isOpen: boolean;
  setModalState: Dispatch<SetStateAction<Boolean>>;
};

const GenerateCode: React.FC<Props> = ({ isOpen, setModalState, email }) => {
  const { onClose } = useDisclosure();
  const [number, setNumber] = useState<number | null>(null);
  const [inputCheck, setInputCheck] = useState<boolean>(false);

  useEffect(() => {
    if (number === null) {
      setInputCheck(true);
    }
     else {
      setInputCheck(false);
    }
  }, [number]);

  const submitHandler = async () => {
    const formBody : CreateCodesData = {
      number,
      user: email
    }
    dispatch(GenerateCodes(formBody))
    setNumber(null);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <Center> Generate Codes</Center>
          </ModalHeader>
          <ModalCloseButton onClick={(e) => setModalState(false)} />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Number of Codes</FormLabel>
              <Input
                id="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
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
              Generate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenerateCode;
