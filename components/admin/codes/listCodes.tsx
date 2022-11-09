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
import Code from "../../../models/election/Codes";

interface Props {
  codes: Code[];
  user: string;
}

const CodeList : React.FC<Props> = ({codes, user}) => {
  return (
    <>
      <Box>
        
     

            <TableContainer w={{ md: "100%" }} mt="3" >
              <Table variant="striped" colorScheme="gray" size="sm">
                <Thead>
                  <Tr>
                    <Th fontSize="17px">S/N</Th>
                    <Th fontSize="17px">Code</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {codes.map((ele: Code) => {
                    return (
                      <Tr key={codes.indexOf(ele)} p="4">
                        <Td>{codes.indexOf(ele) + 1}</Td>
                        <Td fontSize="20px">{ele.codes}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot display="flex" w="100%" pb="3">
                 
                    <Button
                      mt="4"
                      fontSize="20px"
                      fontFamily="cursive"
                      fontWeight="600"
                      _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                      onClick={() => window.print()}
                    >
                      Download PDF
                    </Button>
                </Tfoot>
              </Table>
            </TableContainer>
        </Box>
    </>
  );
};

export default CodeList;
