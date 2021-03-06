import {
  Box,
  Text,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Tbody,
  Thead,
  Button,
  Center,
} from "@chakra-ui/react";
import Nominee from "../../../models/Nominee";
import Position from "../../../models/positions";

const ShowResults = (props) => {
  const positions: string[] = [];
  let list = [];
  props.positions.map((ele: Position) => {
    positions.push(ele.name);
  });

  const maxNomineePerpost = () => {
    let counts: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      const nomineesCount = props.nominees.filter(
        (ele: Nominee) => ele.post == positions[i]
      );
      counts.push(nomineesCount.length);
    }
    let i = 0;
    while (i < Math.max(...counts)) {
      list.push(i + 1);
      i++;
    }
    return list;
  };

  const getNominees = (post: string) => {
    let nominees: Nominee[] = props.nominees.filter(
      (ele: Nominee) => ele.post == post
    );
    return nominees;
  };

  maxNomineePerpost();
  return (
    <>
      <Box p="5">
        <Box mb="2">
          <Center>
            <Text
              fontSize={{ base: "20px", md: "25px", lg: "35px" }}
              fontFamily="cursive"
              fontWeight="700"
            >
              Election Results
            </Text>
          </Center>
        </Box>

      <Box>
        <Center>
            <TableContainer w={{ md: "90%" }} mt="3" display={{ lg: "flex" }}>
            
              <Table variant="striped" colorScheme="gray" size="sm" width="70%">
                <Thead>
                  <Tr>
                    <Th fontSize="17px">Post</Th>
                    {list.map((ele) => {
                      return (
                        <Th
                          key={list.indexOf(ele)}
                          fontSize="17px"
                          align="center"
                        >
                          Nominee {ele}
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {positions.map((ele) => {
                    let nominees = getNominees(ele);
                    return (
                      <Tr key={positions.indexOf(ele)} h="7vh">
                        <Td w="15%">{ele}</Td>
                        {nominees.map((ele) => {
                          return (
                            <Td key={nominees.indexOf(ele)} w="20%">
                              {ele.name} - {ele.votes}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              
            </TableContainer>
            </Center>
            <Box>
              <Center>
              <Button
              mt="4"
              fontSize="20px"
              fontFamily="cursive"
              fontWeight="600"
              _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
              onClick={() => window.print()}
            >
              Download PDF
            </Button>
              </Center>
           
            </Box>
            
          
            </Box>
         
      </Box>
    </>
  );
};

export default ShowResults;
