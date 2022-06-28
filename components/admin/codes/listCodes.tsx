import {
  Box,
  Text,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Tbody,
  Tfoot,
  Thead,
  Button,
  Center,
} from "@chakra-ui/react";
import Code from "../../../models/Codes";

const CodeList = (props) => {
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
              Election Codes
            </Text>
            </Center>           
          </Box>

          <Box>
            <Center>
            <TableContainer w={{ md: "50%" }} mt="3">
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead>
                <Tr>
                  <Th fontSize="17px">S/N</Th>
                  <Th fontSize="17px">Code</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.codes.map((ele : Code) => {
                  return (
                    <Tr key={props.codes.indexOf(ele)} p="4">
                      <Td>{props.codes.indexOf(ele) + 1}</Td>
                      <Td fontSize="20px">{ele.codes}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
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
                
              </Tfoot>
            </Table>
          </TableContainer>
            </Center>
         
          </Box>
        
      </Box>
    </>
  );
};

export default CodeList;
