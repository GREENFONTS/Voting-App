import {Box, Text, Table, TableContainer, Tr, Td, Th, Tbody, Tfoot, Thead, Button} from '@chakra-ui/react';

const CodeList = (props) => {

  return (
      <>
    <Box p='5' align='center'>
      <Box mb='2' align='center'>
        <Text fontSize={{base: '20px', md:'25px', lg:'35px'}} fontFamily='cursive' fontWeight='700'>Election Codes</Text>
      </Box>
    
      <TableContainer w={{md:'50%'}} mt='3'>
        <Table variant='striped' colorScheme='gray' size='sm' >
    <Thead>
      <Tr>
        <Th fontSize='17px'>S/N</Th>
        <Th fontSize='17px'>Code</Th>
      </Tr>
    </Thead>
    <Tbody>
    {props.codes.map((ele) => {
        return(
            <Tr key={props.codes.indexOf(ele)} p='4'>
            <Td>{props.codes.indexOf(ele) + 1}</Td>
            <Td fontSize='20px'>{ele.codes}</Td>
          </Tr>
        )
    })}    
      
    </Tbody>
    <Tfoot align='center'>
         <Button mt='4' fontSize='20px' fontFamily='cursive' fontWeight='600' _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} onClick={() => window.print()}>Download PDF</Button>
    </Tfoot>
  </Table>
</TableContainer>
  
    </Box>
    </>


  )
}


export default CodeList;
