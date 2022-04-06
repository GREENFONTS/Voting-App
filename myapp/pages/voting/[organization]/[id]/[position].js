import {  useEffect, useState} from 'react';
import {FaDownload} from 'react-icons/fa';
import {withRouter} from 'next/router';
import {Box, Text, Icon, Flex, HStack, Image, VStack} from '@chakra-ui/react';
import { useCounter } from '../../../../services/state';

const Posts = ({router}) => {
  const [state, actions] = useCounter();
  
 let positions = []
 let nominees = []
  

  useEffect(async() => {

   actions.getPositions(JSON.parse(window.localStorage.getItem('positions')))
   actions.getNominees(JSON.parse(window.localStorage.getItem('nominees')))
  let admin = localStorage.getItem('admin')
  let token = localStorage.getItem('codeToken')

  let user = router.query
 

    if(token === null){
      router.push(`/api/voting/${user.organization}/${user.id}`)
    }
    else{
      const res = await fetch(`/api/voting/auth/?token=${token}`);
      const data = await res.json()
      if(res.status === 403){            
        localStorage.setItem('admin', null)
        router.push(`/api/voting/${user.organization}/${user.id}/`)
    } 
    }
    console.log(nominees)
  }, [])

console.log(nominees)
  return (
      <>
   <Box w='100%' h='100vh'  bgGradient='linear(to-r, gray.200, white, gray.100)'>
   <Flex display={{base: 'block'}}>
      {state.nominees.map((ele) => {
        console.log('enetered')
        return(
        <Box mb='2' display={ {md: 'inline-block'}} key={ele.id} align='center' p='1' w={{base: "100%", md: "47%", lg:"32%" }} mr={{lg:'3'}} h={{base: "50vh", md: "30vh", lg:"40vh" }} borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
        <Image src='/Images/flag.png' alt='Nominee Image' objectFit='cover' boxSize={{base: "40vh", md: "20vh", lg:"25vh" }}/>
        <Flex p='1' justify='space-between'>
          <VStack align='start'>
            <Text>Name: {ele.name}</Text>
            <Text>Position: {ele.post}</Text>
          </VStack>
          
        </Flex>
        </Box>
        )
      })}
      
      
    </Flex> 
     </Box>
    </>


  )
}


export default withRouter(Posts);
