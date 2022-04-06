import {  useEffect, useState} from 'react';
import {FaDownload} from 'react-icons/fa';
import {withRouter} from 'next/router';
import Link from 'next/link'
import { useCounter } from '../../../../services/state';
import { Box,Text,Button,  useMediaQuery, Image, Center, FormControl, FormLabel, Input,Alert, CloseButton, AlertIcon} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';

const Voting = ({router}) => {
  const [state, actions] = useCounter();
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');
    const [code, setCode] = useState('');
    const [isRequired, setIsRequired] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null)
    const user = router.query;
    useEffect(() => {
        if(code.length > 1){
            setIsRequired(false)
        }
    }, [code])
    const submitHandler = async () => {
        const res = await fetch(`/api/voting/code/?code=${code}&user=${user.id}`)
        const data = await res.json()

        if(res.status == 404){
            setAlertMessage(data.msg)
        }
        if(res.status == 200){
            localStorage.setItem('token', data.token)
            router.push(`/voting/${user.organization}/${user.id}/name`)
        }
    }
  return (
      <>
    <Box w='100%' h='100vh'  bgGradient='linear(to-r, gray.200, white, gray.100)'>

    {isLargerThan900 && <Center h='90vh' w='100%'>
        <Box height={{ base: '230px', md: '300px', lg: '80vh' }} w='95%' display={{ md: 'flex'}} px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} alignSelf="center">
      
      <Box w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '75vh' }}>    
     
      <Fade right> <Bounce bottom>
      <Image src='/images/votingbg.png' alt='Topic' h={{ base: '200px', md: '250px', lg: '75vh' }}  width='100%' />    </Bounce>     
      </Fade>
        
         </Box>
         

         <Box w={{base: '100%', md: '5%'}} h={{ base: '200px', md: '250px', lg: '60vh' }}></Box>
         <Box   w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '50vh' }} mt={{lg: '12'}}>
              <Box align='center'>
                  <Text fontSize={{md: '40px', lg:'50px'}}>Welcome To <br/> Tesla <br/> Elections</Text>
              </Box>

              <Box mt='5'> 
              {alertMessage !== null ? <Alert status='error'> <AlertIcon />
                        {alertMessage}
                        <CloseButton position='absolute' right='8px' top='8px' onClick={(e) => setAlertMessage(null)} />
                    </Alert> : <></>}

              <FormControl isRequired >
                    <FormLabel htmlFor='code'>Enter code to Vote: </FormLabel>
                    <Input id='code' type='text' value={code} onChange={(e) => setCode(e.target.value)} />
                    </FormControl>
              </Box>

              <Box mt='5'>
                       <Button id='button' isDisabled={isRequired} _hover={{ transform: 'scale(1.05)', cursor: "pointer" }} onClick={(e) => submitHandler()}>Submit</Button>
                </Box>
      </Box>
      
      </Box>
        
      
      </Center>}
    {isLesserThan900 && <Box align='center' mt={5} >
    <Box display='flex' height={{ base: '30vh', md: '35vh' }} w='95%' bg={bgColor} >
      <Box w={{base: '10%', md:'20%'}} mt='3'>
      </Box>
      <Box w={{base:'10%', md:'70'}}></Box>
      <Box w={{base:'70%'}} mt='2'>
        
        <Center display='block'>
        <Box fontSize={{base: '25px', md: '35px'}} fontWeight='700' fontFamily='sans-serif' display='flex'>
            <Text pr='2'>Create and </Text> 
            <Text color="purple.600">Host</Text> 
           </Box>
           <Box fontSize={{base: '25px', md: '35px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
           <Text color='purple.500' pr='2'>an Online </Text> 
           <Text > Voting</Text>
           </Box>
          <Box fontSize={{base: '25px', md: '35px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
          <Text pr='2'> for Easy</Text> 
        <Text color='purple.600'>Election</Text> 
          </Box>

          <Box mt='6' ml='-2'>
              
              <Button id='button' bgColor='purple.500' color='white' mr='4' borderRadius='15%' p='2' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
              <Link  href='/register'   fontWeight='500' fontSize={{ base: '11px', md: '14px' }} >Get Started </Link>
              </Button>

              <Button id='button' bgColor='purple.500' color='white' mr='4' borderRadius='15%' p='2' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
              <Link  href='/about'   fontWeight='500' fontSize={{ base: '11px', md: '14px' }} >About App </Link>
              </Button>      
          </Box>
        </Center>  
      </Box>
      </Box>

      <Box>
              <Box display="block">
         <Bounce left>         
         <Image src='/images/votingbg.png' alt='Topic' h={{ base: '65vh', md: '55vh'  }}  width='100%' />         
         </Bounce>
         </Box>  
      </Box>
      </Box>

 }
 </Box>
    
    </>


  )
}


export default withRouter(Voting);
