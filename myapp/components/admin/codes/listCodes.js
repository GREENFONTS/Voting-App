import {  useEffect, useState} from 'react';
import {FaDownload} from 'react-icons/fa'
import {Box, Text, Icon, useDisclosure, HStack, Table, TableContainer, Tr, Td, Th, Tbody, Tfoot, Thead} from '@chakra-ui/react';

const CodeList = (props) => {

  return (
      <>
    <Box p='5' align='center'>
      <Box mb='2' align='center'>
        <Text fontSize={{base: '20px', md:'25px', lg:'35px'}} fontFamily='cursive' fontWeight='700'>Election Codes</Text>
      </Box>

      <Box mb='1' align='center'>
        <Text fontSize={{base: '15px', md:'20px', lg:'30px'}} fontFamily='cursive' fontWeight='700'>List of unused election codes</Text>
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
            <Td>{ele.codes}</Td>
          </Tr>
        )
    })}    
      
    </Tbody>
    <Tfoot align='center'>
         <Text mt='4' fontSize='20px' fontFamily='cursive' fontWeight='600' _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} onClick={() => window.print()}>Download PDF</Text>
    </Tfoot>
  </Table>
</TableContainer>
  
    </Box>
    </>


  )
}


export default CodeList;
