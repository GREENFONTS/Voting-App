import Link from "next/link";
import { Box,Text,Button,  useMediaQuery, Image, Center} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import Socials from '../components/social';

export default function Home() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
  
  return (
    <>
    <Box>
      {isLargerThan900 && <Center h='90vh' w='100%'>
        <Box height={{ base: '230px', md: '300px', lg: '80vh' }} w='95%' display={{ md: 'flex'}} px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} alignSelf="center">
      
      <Box w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '75vh' }}>    
     
      <Fade right> <Bounce bottom>
      <Image src='votingbg.png' alt='Topic' h={{ base: '200px', md: '250px', lg: '75vh' }}  width='100%' />    </Bounce>     
      </Fade>
        
         </Box>
         

         <Box w={{base: '100%', md: '5%'}} h={{ base: '200px', md: '250px', lg: '60vh' }}></Box>
         <Box  w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '50vh' }} mt={{lg: '12'}}>
          
            
         <Center display='block'>
           <Box fontSize={{md: '40px', lg:'50px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
            <Text pr='2'>Create and </Text> 
            <Text color="purple.700">Host</Text> 
           </Box>
           <Box fontSize={{md: '40px', lg:'50px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
           <Text color='purple.500' pr='2'>an Online </Text> 
           <Text > Voting</Text>
           </Box>
          <Box fontSize={{md: '40px', lg:'50px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
          <Text pr='2'> for Easy</Text> 
        <Text color='purple.700'>Election</Text> 
          </Box>

          <Box mt='5' fontSize={{md: '13px', lg:'15px'}} fontWeight='600' fontFamily='sans-serif' >
          <Text>Easy-vote helps individuals with the duty of organizing <br/> an  election to setup a fully functional
             online election with <br/> personalized link and voting codes for quick voting  in just <br/>few mins. </Text>
          </Box>
              
          </Center>
            <Box mt='7' align='center'>
              
                <Button id='button' bgColor='purple.500' color='white'  borderRadius='25%' p='7' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                <Link  href='/register'   fontWeight='500' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >Get Started </Link>
                </Button>
     
            </Box>
           </Box>

           <Box w={{base: '100%', md: '5%'}} h={{ base: '200px', md: '250px', lg: '50vh' }} mt={{lg: '10'}} pt='10'>
            <Socials spacing='10'/>
           </Box>
           
            
  
      </Box>
        
      
      </Center>}
    {isLesserThan900 && <Box mt={5} >
    <Box display='flex' height={{ base: '30vh', md: '35vh' }} w='95%' bg={bgColor} >
      <Box w={{base: '10%', md:'20%'}} mt='3'>
        <Socials spacing='2'/>
      </Box>
      <Box w={{base:'10%', md:'70'}}></Box>
      <Box w={{base:'70%'}} mt='2'>
        
        
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

          <Box mt='6'>
              
              <Button id='button' bgColor='purple.500' color='white'  borderRadius='15%' p='2' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
              <Link  href='/register'   fontWeight='500' fontSize={{ base: '11px', md: '14px' }} >Get Started </Link>
              </Button>
     
          </Box>
  
      </Box>
      </Box>

      <Box>
              <Box display="block">
         <Bounce left>         
         <Image src='votingbg.png' alt='Topic' h={{ base: '65vh', md: '55vh'  }}  width='100%' />         
         </Bounce>
         </Box>  
      </Box>

    </Box> }
        
    </Box>

    </>
  )
}
