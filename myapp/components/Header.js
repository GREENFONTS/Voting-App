import React, { useState } from 'react';
import Link from "next/link";
import { Box, Flex, HStack, Icon, LinkBox, Text, VStack, Button, useDisclosure, useMediaQuery, Image, } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaVoteYea } from 'react-icons/fa';
import { BiMoon } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import DrawerComponent from './Drawer';

const Header = () => {

    const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('#e8e8e8', 'gray.800')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');
    const textColor = useColorModeValue('themeLight.logo', 'themeDark.logo');
    const icon = useColorModeValue(BiMoon, ImSun)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tokenCheck, setTokenCheck] = useState(false)
    // const user = JSON.parse(localStorage.getItem('token'))

    return (
        <Flex px={{ base: '24px', md: '27px', lg: '30px' }} py={2} h='50px' w='full' bg={bgColor} align="center" justify="space-between">
            {!tokenCheck ? <>  <Box alignItems='center'> 
                <LinkBox>
                    <HStack _hover={{ cursor: "pointer" }}>
                        <Link href='/' _focus={{ outline: 'none' }}>
                               <Icon as={FaVoteYea} w={{ base: '27px', md: '30px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
                           </Link>
                        <Text fontWeight='700' fontSize={{ base: '17px', md: '18px', lg: '20px' }} fontFamily="cursive" color={textColor}>easy-vote</Text>

                    </HStack>
                </LinkBox>
            </Box>
            <Flex h='full' align="center" justify="space-between">
                <Flex align="center" justify="space-between">
                <Icon as={icon} onClick={toggleColorMode} mx={10} w={{ base: '18px', md: '20px', lg: '22px' }} h={{ base: '18px', md: '20px', lg: '22px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} />
                    {isLargerThan900 && <>
                    <Button bgColor={bgColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer", borderBottom: '1px solid purple'}} fontFamily="cursive"><Link  href='/about'  fontSize={{ base: '12px', md: '14px', lg: '16px' }} >About</Link></Button>
                    <Button bgColor={bgColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer", borderBottom: '1px solid purple'}} fontFamily="cursive"><Link  href='/register' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >SignUp</Link></Button>
                    <Button bgColor={bgColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer", borderBottom: '1px solid purple'}} fontFamily="cursive"><Link  href='/login' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >SignIn</Link></Button>
                </>}
                   
                </Flex>

               {isLesserThan900 && <HamburgerIcon ml={4} onClick={onOpen} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} />} 
                <DrawerComponent isOpen={isOpen} onClose={onClose}  />
            </Flex> </> : 
            <>
            <Box alignItems='center'> 
                <LinkBox>
                    <HStack _hover={{ cursor: "pointer" }}>
                        <Link href='/' _focus={{ outline: 'none' }}>
                               <Icon as={FaVoteYea} w={{ base: '27px', md: '30px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
                           </Link>
                        <Text fontWeight='700' fontSize={{ base: '17px', md: '18px', lg: '20px' }} fontFamily="cursive" color={textColor}>easy-vote</Text>

                    </HStack>
                </LinkBox>
            </Box>
            <Flex h='full' align="center" justify="space-between">
                <Flex align="center" justify="space-between">
                <Icon as={icon} onClick={toggleColorMode} mx={10} w={{ base: '18px', md: '20px', lg: '22px' }} h={{ base: '18px', md: '20px', lg: '22px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} />
                    {isLargerThan900 && <>
                    <Button bgColor={bgColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer", borderBottom: '1px solid purple'}} fontFamily="cursive"><Link  href='/about'  fontSize={{ base: '12px', md: '14px', lg: '16px' }} >About</Link></Button>
                    <Button bgColor={bgColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer", borderBottom: '1px solid purple'}} fontFamily="cursive"><Link  href='/register' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >SignUp</Link></Button>
                    <Button bgColor={bgColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer", borderBottom: '1px solid purple'}} fontFamily="cursive"><Link  href='/login' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >SignIn</Link></Button>
                </>}
                   
                </Flex>

               {isLesserThan900 && <HamburgerIcon ml={4} onClick={onOpen} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} />} 
                <DrawerComponent isOpen={isOpen} onClose={onClose}  />
            </Flex></>}
        </Flex >
        
    )
        
}
export default Header