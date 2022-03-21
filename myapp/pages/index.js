import { Component } from 'react';
import Link from "next/link";
import { Box,Text,Button,  useMediaQuery, Image, Center, HStack} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';

export default function Home() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');

  return (
    <>
    <Box>
      {isLargerThan900 && <Center h='90vh' w='100%'>
        <Box height={{ base: '230px', md: '300px', lg: '80vh' }} w='95%' display={{ md: 'flex'}} px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} alignSelf="center">
      
      <Box w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '75vh' }}>    
     
      <Fade right> <Bounce bottom>
      <Image src='/images/votingbg.png' alt='Topic' h={{ base: '200px', md: '250px', lg: '75vh' }}  width='100%' />    </Bounce>     
      </Fade>
        
         </Box>
         

         <Box w={{base: '100%', md: '5%'}} h={{ base: '200px', md: '250px', lg: '60vh' }}></Box>
         <Box  w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '50vh' }} mt={{lg: '12'}}>
          
            
         <Center display='block'>
           <Box fontSize={{md: '40px', lg:'50px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
            <Text pr='2'>Create and </Text> 
            <Text color="#322659">Host</Text> 
           </Box>
           <Box fontSize={{md: '40px', lg:'50px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
           <Text color='purple.300' pr='2'>an Online </Text> 
           <Text > Voting</Text>
           </Box>
          <Box fontSize={{md: '40px', lg:'50px'}} fontWeight='700' fontFamily='sans-serif' display='flex' letterSpacing='5'>
          <Text pr='2'> for Easy</Text> 
        <Text color='purple.900'>Election</Text> 
          </Box>

          <Box mt='5' fontSize={{md: '13px', lg:'15px'}} fontWeight='600' fontFamily='sans-serif' >
          <Text>Easy-vote helps individuals with the duty of organizing <br/> an  election to setup a fully functional
             online election with <br/> personalized link and voting codes for quick voting  in just <br/>few mins. </Text>
          </Box>
              
          </Center>
            <Box mt='7' ml='10'>
              
                <Button bgColor='purple.300' mr='10' borderRadius='100%' p='7' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                <Link  href='/register'  _hover={{ transform: 'scale(1.05)', cursor: "pointer" }} fontWeight='500' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >Get Started </Link>
                </Button>

                <Button bgColor='purple.300' mr='10' borderRadius='100%' p='7' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                <Link  href='/about'   fontWeight='500' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >About Us </Link>
                </Button>
             
              
            </Box>
            
             </Box>
           
            
  
      </Box>
        
      
      </Center>}
    {isLesserThan900 && <Box align='center' mt={5}>
    <Box height={{ base: '70vh', md: '70vh' }} w='95%' borderLeft='2px' borderBottom='2px' borderRight='1px'borderTop='0.5px' borderColor='gray.200' boxShadow='base'
           px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} align='center'>
              <Box display="block" mb='10'>
         <Bounce left>         
         <Image src='/images/votingbg.png' alt='Topic' h={{ base: '50vh', md: '50vh', lg: '470px' }}  width='100%' />         
         </Bounce>
         </Box>

         <Box align='center' mt='10'>
         <Button padding='7' fontSize='25px' bgColor={iconColor}>
              <Link mt={2} href='/login' isExternal _focus={{ outline: 'none' }}   _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}>Get Started</Link>
                    </Button>
            </Box>
      </Box>
    </Box> }
      

      
      
    </Box>

    </>
  )
}
