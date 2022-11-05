import { ReactHTMLElement, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Flex,
  Box,
  Text,
  Icon,
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
import Position from "../../../models/election/positions";
import { dispatch } from "../../../redux/store";
import { DeletePosition, UpdatePosition } from "../../../redux/features/Users/election";

interface Props{
  positions : Position[],
  user: string
}

const PositionList : React.FC<Props> = ({ positions, user }) => {
  const { onClose } = useDisclosure();
  const [position, setPosition] = useState<string>("");
  const [Id, setId] = useState<string>("")
  const [inputCheck, setInputCheck] = useState<boolean>(false);
  const [IsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (position.length < 1) {
      setInputCheck(true);
    } else {
      setInputCheck(false);
    }
  }, [position]);


  const UpdateHandler = async () => {
    const formBody : Position = {
      id: Id,
      name : position,
      user
    }
    dispatch(UpdatePosition(formBody));
  };

  const deleteHandler = async (Id: string) => {
    dispatch(DeletePosition(Id))
  };
  return (
    <Box p="5" mt="5">
      {positions.map((ele: Position) => {
        return (
          <Flex p="1" borderRadius="2px" mb="2" key={ele.id}>
            <Box w="80%">
              <Text fontSize={{ lg: "20px" }} fontFamily="cursive">
                {ele.name}
              </Text>
            </Box>
            <Center w="20%" p="2">
              <Icon
                mr={{ base: "10px", md: "20px" }}
                as={FaEdit}
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
                onClick={() => {
                  setPosition(ele.name);
                  setId(ele.id)
                  setIsOpen(true);
                }}
              />
              <Icon
                as={FaTrash}
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
                onClick={() => deleteHandler(ele.id)}
              />
            </Center>
          </Flex>
        );
      })}

      <Modal isOpen={IsOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <Center>Update Position </Center>
          </ModalHeader>
          <ModalCloseButton onClick={() => setIsOpen(false)} />
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
                setIsOpen(false);
                UpdateHandler();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PositionList;
