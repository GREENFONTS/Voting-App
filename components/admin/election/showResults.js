import {Box, Text, Table, TableContainer, Tr, Td, Th, Tbody, Thead, Button} from '@chakra-ui/react';

const ShowResults = (props) => {

    const positions = []
    let list = []
    props.positions.map((ele) => {
        positions.push(ele.name)
    })

    const maxNomineePerpost = () => {
      let counts = []
      for(let i = 0; i < positions.length; i++){
        const nomineesCount = props.nominees.filter((ele) => ele.post == positions[i])
        counts.push(nomineesCount.length)
      }
      let i = 0
      while(i < Math.max(...counts)){
        list.push(i + 1)
        i++
      }
       return list
    }
    


    const getNominees = (post) => {
      let nominees = props.nominees.filter((ele) => ele.post == post)
      return nominees
    }

    maxNomineePerpost()
  return (
      <>
    <Box p='5' align='center'>
      <Box mb='2' align='center'>
        <Text fontSize={{base: '20px', md:'25px', lg:'35px'}} fontFamily='cursive' fontWeight='700'>Election Results</Text>
      </Box>
    
      <TableContainer w={{md:'90%'}} mt='3' display={{lg: "flex"}}>
        <Table variant='striped' colorScheme='gray' size='sm' width='70%'>
    <Thead>
      <Tr>
        <Th fontSize='17px'>Post</Th>
        {list.map((ele) => {
          return(
          <Th key={list.indexOf(ele)} fontSize='17px' align='center'>Nominee {ele}</Th>
          )
        }) }
      </Tr>
    </Thead>
    <Tbody>
    {positions.map((ele) => {
        let nominees = getNominees(ele)
        return(
            <Tr key={positions.indexOf(ele)} h='7vh' >
            <Td w='15%'>{ele}</Td>
            {nominees.map((ele) => {
                return (
                    <Td key={nominees.indexOf(ele)} w="20%">{ele.name} - {ele.votes}</Td>
                )
            })}
          </Tr>
        )
    })}    
      
    </Tbody>
  </Table>

</TableContainer>

         <Button mt='4' fontSize='20px' fontFamily='cursive' fontWeight='600' _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} onClick={() => window.print()}>Download PDF</Button>
  
    </Box>
    </>


  )
}


export default ShowResults;
