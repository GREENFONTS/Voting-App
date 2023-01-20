import { useEffect, useState } from "react";
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
  Center,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Image,
  VStack,
  HStack,
  Select,
  Grid
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import Nominee, { UpdateNomineeData } from "../../../models/election/Nominee";
import Position from "../../../models/election/positions";
import { dispatch } from "../../../redux/store";
import { DeleteNominee, UpdateNominee } from "../../../redux/features/Users/election";

interface Props {
  positions: Position[];
  nominees: Nominee[];
  user: string;
}

const NomineesList: React.FC<Props> = ({ nominees, positions, user }) => {
  const { onClose } = useDisclosure();
  const [position, setPosition] = useState<string>("");
  const [inputCheck, setInputCheck] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [currentState, setCurrentState] = useState<Nominee | null>(null);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (position.length < 1 || name.length < 1) {
      setInputCheck(true);
    } else {
      setInputCheck(false);
    }
  }, [position, name]);

  const submitHandler = async () => {
    const formBody: UpdateNomineeData = {
      name,
      position,
      user,
      id,
    };
    dispatch(UpdateNominee(formBody));

    setName("");
    setPosition("");
    setId("");
  };

  const deleteHandler = async (Id : string) => {
    dispatch(DeleteNominee(Id))
  };

  return (
    <>
      <Box>
        <Flex display={{ base: "block" }}>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{  base: '8px', lg: '20px', xl: '24px' }}
        >
          {nominees.map((ele: Nominee) => {
            return (
              <Box
                key={nominees.indexOf(ele)}
                mb="2"
                p="1"
                h={{ base: "45vh", md: "33vh", lg: "40vh" }}
                border="1px"
                borderColor="gray.200"
                boxShadow="base"
              >
                <Center  w="100%"
                    h="70%">
                  <Image
                  w="70%"
                  h='80%'
                    src={ele.image}
                    alt="Nominee Image"
                   
                  />
                </Center>

                <Flex p="1" justify="space-between">
                  <VStack align="start">
                    <Text>Name: {ele.name}</Text>
                    <Text>Position: {ele.post}</Text>
                  </VStack>
                  <Box p="2">
                    <HStack>
                      <Icon
                        mr="10px"
                        as={FaEdit}
                        _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
                        onClick={() => {
                          setCurrentState(ele);
                          setIsOpen(true);
                          setName(ele.name);
                          setPosition(ele.post);
                          setId(ele.id);
                        }}
                      />
                      <Icon
                        as={FaTrash}
                        _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
                        onClick={() => deleteHandler(ele.id)}
                      />
                    </HStack>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Grid>
          
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            Update Nominee - {currentState != null ? currentState.name : ""}
          </ModalHeader>
          <ModalCloseButton onClick={(e) => setIsOpen(false)} />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
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
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                {positions.map((ele: Position) => {
                  return (
                    <option key={positions.indexOf(ele)} value={ele.name}>
                      {ele.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={inputCheck}
              bg="#e8e8e8"
              mr={3}
              onClick={() => {
                setIsOpen(false);
                submitHandler();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NomineesList;
