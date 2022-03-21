import { Component } from 'react';
import Link from "next/link";
import { Box,Text,Button,  useMediaQuery, Image, Center} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';

export default function Home() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');

  return (
    <>
    <Box>
      {isLargerThan900 && <Center h='90vh' w='100%'>
        <Box height={{ base: '230px', md: '300px', lg: '500px' }} w='95%' borderLeft='2px' borderBottom='2px' borderRight='1px'borderTop='0.5px' borderColor='gray.200' boxShadow='base'
          display={{ md: 'flex'}} px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} alignSelf="center">

         <Box w={{base: '100%', md: '50%'}} h={{ base: '200px', md: '250px', lg: '450px' }}>
         <Bounce left>         
         <Image src='/images/votingbg.png' alt='Topic' h={{ base: '200px', md: '250px', lg: '450px' }}  width='100%' />         
         </Bounce>
         </Box>

         <Box w={{base: '100%', md: '50%'}} h={{ base: '200px', md: '250px', lg: '450px' }}>
           <Center h={{ base: '200px', md: '250px', lg: '450px' }}>
             <Box>
             <Box align='center' fontSize='20px'>
              <Text>Have the duty of hosting an online election...We gat you covered </Text>
              <Text>Setup your own election in just few mins with so many functionalities for to make the process easy</Text>
              <Text>Get your own personalized link and voting codes for quick voting</Text>
            </Box>
            <Box>
              <Center>
                <Button bgColor='blue.300'>
                <Link  href='/login'  _hover={{ transform: 'scale(1.05)', cursor: "pointer" }} fontWeight='500' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >Get Started </Link>
                </Button>
             
              </Center>
            </Box>
             </Box>
           
           </Center>
            
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

         <Box align='center' mt='4'>
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
