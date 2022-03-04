import { Component } from 'react';
import Link from "next/link";
import { Box, Flex, HStack, Icon, LinkBox, Text, VStack, Button, useDisclosure, useMediaQuery, Image, Center} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { RiYoutubeFill } from 'react-icons/ri';
import { BiGitBranch, BiMoon } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';



export default function Home() {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [isLargerThan500] = useMediaQuery('(min-width: 500px)')
    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');
    const logoColor = useColorModeValue('red.500', 'red.500');
    const textColor = useColorModeValue('themeLight.logo', 'themeDark.logo');
    const icon = useColorModeValue(BiMoon, ImSun)
    const { isOpen, onOpen, onClose } = useDisclosure();

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

         <Box w={{md: '50%'}} h={{ base: '200px', md: '250px', lg: '450px' }}>
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
                <Link  href='/login'  _hover={{ transform: 'scale(1.05)', cursor: "pointer" }} fontWeight='500' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >Let's get Started </Link>
                </Button>
             
              </Center>
            </Box>
             </Box>
           
           </Center>
            
         </Box>
      </Box>
        
      
      </Center>}
    <Box align='center' mt={5}>
    <Box height={{ base: '270px', md: '350px' }} w='95%' borderLeft='2px' borderBottom='2px' borderRight='1px'borderTop='0.5px' borderColor='gray.200' boxShadow='base'
          display={{ md: 'flex'}} px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} >

         <Box w={{base: '100%', md: '50%'}} h={{ base: '200px', md: '250px', lg: '450px' }}>
         <Bounce left>         
         <Image src='/images/votingbg.png' alt='Topic' h={{ base: '200px', md: '250px', lg: '450px' }}  width='100%' />         
         </Bounce>
         </Box>

         <Box w={{md: '50%'}} h={{ base: '200px', md: '250px', lg: '450px' }}>

         </Box>
      </Box>
    </Box>
      

      
      
    </Box>

    </>
  )
}
