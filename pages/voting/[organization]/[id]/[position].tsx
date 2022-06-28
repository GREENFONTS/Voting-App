import {  useEffect, useState} from 'react';
import {withRouter, useRouter} from 'next/router';
import {Box, Text, Flex, VStack, Image, Button, Center} from '@chakra-ui/react';
import { useCounter } from '../../../../services/state';
import Nominee from '../../../../models/Nominee';

const Posts = () => {
  const router = useRouter()
  const [state, actions] = useCounter();
  const [post, setPost] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [id, setId] = useState<string>('')

  const verifyToken = async (token :string) => {
    const res = await fetch(`/api/voting/auth/?token=${token}`);
      if(res.status === 403){    
        localStorage.setItem('admin', null)
        router.push(`/voting/${organization}/${id}/` )
    } 
  }
  
  useEffect(() => {
    actions.votingEnd(false)
    const queryValue = window.location.pathname.split('/').slice(2,)
  
    setOrganization(queryValue[0])    
    setId(queryValue[1])
    setPost(queryValue[2].split('%20').join(' '))

  let token = localStorage.getItem('codeToken')
  let nominees = JSON.parse(localStorage.getItem('nominees'))
 
  let nomineesData = nominees.filter((ele : Nominee) => ele.post === queryValue[2].split('%20').join(' '))
  actions.getNominees(nomineesData)
  
    if(token === null){
      router.push(`/voting/${queryValue[0]}/${queryValue[1]}`)
    }
    else{
      verifyToken(token)
  }
  console.log(post)

  }, [])

  useEffect(() => {
    let nominees = JSON.parse(localStorage.getItem('nominees'))
     let nomineesData : Nominee[] = nominees.filter((ele : Nominee) => ele.post === post)
    actions.getNominees(nomineesData)
  }, [post])

  const submitHandler = async (ele: Nominee) => {
   
    const res = await fetch(`/api/voting/updateNominee/?nominee=${JSON.stringify(ele)}`);
    const data = await res.json();

    if(res.status == 404){
      console.log(data.msg)
    }
    if (res.status === 200){
      let positions = state.positions
      if(positions.length > 0){
        let nextPost = positions[0]  
        setPost(nextPost)
        router.push(`/voting/${organization}/${id}/${nextPost}`)
        positions.shift()
        actions.getPositions(positions)
      }
     else{
       localStorage.setItem('codeToken', null)
       actions.votingEnd(true)
      router.push(`/voting/${organization}/${id}`)
     }
      
    }
  }
  return (
      <>
   <Box w='100%' h='100vh'  bgGradient='linear(to-r, gray.200, white, gray.100)'>
     <Center>
       <Text fontFamily='cursive' fontSize='50px'>{post}</Text>
     </Center>
   <Flex display={{base: 'block'}}mt='5' p='4'>
      {state.nominees.length > 0 ? state.nominees.map((ele) => {
        return(
        <Box mb='2' display={ {md: 'inline-block'}} key={ele.id} p='1' w={{base: "100%", md: "47%", lg:"32%" }} mr={{lg:'3'}} h={{base: "40vh", md: "35vh", lg:"40vh" }} borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
        <Center>
        <Image src={ele.image} alt='Nominee Image' objectFit='cover' boxSize={{base: "27vh", md: "20vh", lg:"25vh" }}/>
        <Flex p='1' justify='space-between'>
          <VStack align='start' spacing='2'>
            <Text>Name: {ele.name}</Text>
            <Button color='blackAlpha.800' onClick={() => submitHandler(ele)}>Vote</Button>
          </VStack>
          
        </Flex>
        </Center>
       
        </Box>
        )
      }) :  <></>} 
      
      
    </Flex> 
     </Box>
    </>
  )
}


export default withRouter(Posts);
