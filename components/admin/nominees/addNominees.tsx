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
  Select,
  Center,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import Position from "../../../models/election/positions";
import { dispatch } from "../../../redux/store";
import {
  GetNominees,
} from "../../../redux/features/Users/election";
import { createResponse, setLoading } from "../../../redux/features/Users/auth";
import { ErrorHandler } from "../../../Utils/Error";

type Props = {
  email: string;
  isOpen: boolean;
  setModalState: Dispatch<SetStateAction<Boolean>>;
  positions: Position[];
};

const AddNomineeModal: React.FC<Props> = ({
  email,
  setModalState,
  isOpen,
  positions,
}) => {
  const { onClose } = useDisclosure();
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [image, setImage] = useState(null);
  const [inputCheck, setInputCheck] = useState<boolean>(false);

  useEffect(() => {
    if (name.length < 2 || image == null || position == "") {
      setInputCheck(true);
    } else {
      setInputCheck(false);
    }
  }, [position, name, image]);

  const submitHandler = async () => {
    const form = new FormData();
    form.append("name", name);
    form.append("post", position);
    form.append("image", image);
    form.append("user", email);

    try {
      dispatch(setLoading(true))
      const res = await fetch("/api/admin/nominees/add", {
        method: "POST",
        body: form,
        
      });
      if (res.ok) {
        dispatch(GetNominees(email));
      }
    } catch (err) {
      dispatch(createResponse(ErrorHandler(err)))
      dispatch(setLoading(false))
    }
    setName("");
    setImage(null);
    setPosition("");
  };

  return (
    <>
      <Flex p="5">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <Center> Add Nominee</Center>
            </ModalHeader>
            <ModalCloseButton onClick={() => setModalState(false)} />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="position">Position</FormLabel>
                <Select
                  icon={<MdArrowDropDown />}
                  placeholder="Select Nominee Position"
                  onChange={(e) => setPosition(e.target.value)}
                >
                  {positions.map((ele) => {
                    return (
                      <option key={positions.indexOf(ele)} value={ele.name}>
                        {ele.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="image">Upload Image</FormLabel>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                disabled={inputCheck}
                bg="#e8e8e8"
                mr={3}
                onClick={(e) => {
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

export default AddNomineeModal;
