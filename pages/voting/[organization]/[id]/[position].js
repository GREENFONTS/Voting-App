import {  useEffect, useState} from 'react';
import {FaDownload} from 'react-icons/fa';
import {withRouter, useRouter} from 'next/router';
import {Box, Text, Icon, Flex, VStack, Image, Button} from '@chakra-ui/react';
import { useCounter } from '../../../../services/state';

const Posts = () => {
  const router = useRouter()
  const [state, actions] = useCounter();
  const [post, setPost] = useState('');
  const [organization, setOrganization] = useState('');
  const [id, setId] = useState('')
  
 let positions = []
 let nominees = []
  

  useEffect(async () => {
    actions.votingEnd(false)
    const queryValue = window.location.pathname.split('/').slice(2,)
    const organization = queryValue[0]
    setOrganization(queryValue[0])
    const id = queryValue[1]
    setId(queryValue[1])
    setPost(queryValue[2])

  let admin = localStorage.getItem('admin')
  let token = localStorage.getItem('codeToken')
  let nominees = JSON.parse(localStorage.getItem('nominees'))
 
  let nomineesData = nominees.filter((ele) => ele.post === queryValue[2])
  actions.getNominees(nomineesData)
  
  
    if(token === null){
      router.push(`/voting/${organization}/${id}`)
    }
    else{
      const res = await fetch(`/api/voting/auth/?token=${token}`);
      const data = await res.json()
      if(res.status === 403){  
        
        localStorage.setItem('admin', null)
        router.push(`/voting/${organization}/${id}/` )
    } 
  }
  

  }, [])

  useEffect(() => {
    let nominees = JSON.parse(localStorage.getItem('nominees'))
     let nomineesData = nominees.filter((ele) => ele.post === post)
    actions.getNominees(nomineesData)
  }, [post])

  const submitHandler = async (ele) => {
   
    const res = await fetch(`/api/voting/updateNominee/?nominee=${JSON.stringify(ele)}`);
    const data = await res.json();

    if(res.status == 404){
      console.log(data.msg)
    }
    if (res.status === 200){
      let positions = state.positions
      if(positions.length > 0){
        let nextPost = positions[0]  
        console.log(nextPost)    
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
     <Box align='center'>
       <Text fontFamily='cursive' fontSize='50px'>{post}</Text>
     </Box>
   <Flex display={{base: 'block'}}mt='5' p='4'>
      {state.nominees.length > 0 ? state.nominees.map((ele) => {
        return(
        <Box mb='2' display={ {md: 'inline-block'}} key={ele.id} align='center' p='1' w={{base: "100%", md: "47%", lg:"32%" }} mr={{lg:'3'}} h={{base: "40vh", md: "35vh", lg:"40vh" }} borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
        <Image src={ele.image} alt='Nominee Image' objectFit='cover' boxSize={{base: "27vh", md: "20vh", lg:"25vh" }}/>
        <Flex p='1' justify='space-between'>
          <VStack align='start' spacing='2'>
            <Text>Name: {ele.name}</Text>
            <Button color='blackAlpha.800' onClick={() => submitHandler(ele)}>Vote</Button>
          </VStack>
          
        </Flex>
        </Box>
        )
      }) :  <></>} 
      
      
    </Flex> 
     </Box>
    </>


  )
}


export default withRouter(Posts);
