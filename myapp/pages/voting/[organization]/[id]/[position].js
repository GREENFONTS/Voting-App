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
  

  useEffect(async() => {
    console.log('enetered')
    const queryValue = window.location.pathname.split('/').slice(2,)
    const organization = queryValue[0]
    setOrganization(queryValue[0])
    const id = queryValue[1]
    setId(queryValue[1])
    setPost(queryValue[2])

  let admin = localStorage.getItem('admin')
  let token = localStorage.getItem('codeToken')
  actions.getPositions(JSON.parse(localStorage.getItem('positions')))

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
    if(state.positions.length != 0){
      state.positions.forEach((ele) => {
        positions.push(ele.name)
      })
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
      let nextPostIndex = data.nominee.postNo
      let nextPost = state.positions[nextPostIndex].name
      setPost(nextPost)
      router.push(`/voting/${organization}/${id}/${nextPost}`)
      
    }
  }
  return (
      <>
   <Box w='100%' h='100vh'  bgGradient='linear(to-r, gray.200, white, gray.100)'>
     <Box align='center'>
       <Text fontFamily='cursive' fontSize='50px'>{post}</Text>
     </Box>
   <Flex display={{base: 'block'}}>
      {state.nominees.length > 0 ? state.nominees.map((ele) => {
        return(
        <Box mb='2' display={ {md: 'inline-block'}} key={ele.id} align='center' p='1' w={{base: "100%", md: "47%", lg:"32%" }} mr={{lg:'3'}} h={{base: "50vh", md: "30vh", lg:"40vh" }} borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
        <Image src='/Images/flag.png' alt='Nominee Image' objectFit='cover' boxSize={{base: "40vh", md: "20vh", lg:"25vh" }}/>
        <Flex p='1' justify='space-between'>
          <VStack align='start' spacing='2'>
            <Text>Name: {ele.name}</Text>
            <Button onClick={() => submitHandler(ele)}>Vote</Button>
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
