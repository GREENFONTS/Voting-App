import React from 'react';
import Link from "next/link";
import { Box, Flex, HStack, Icon, LinkBox, Text, VStack, Button, useDisclosure, useMediaQuery, Image, } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { RiYoutubeFill } from 'react-icons/ri';
import { BiGitBranch, BiMoon } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import Tilt from 'react-parallax-tilt';
import DrawerComponent from './Drawer';

const Header = () => {

    const [isLargerThan700] = useMediaQuery('(min-width: 700px)')
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
        <Flex px={{ base: '24px', md: '27px', lg: '30px' }} py={2} h='50px' w='full' bg={bgColor} boxShadow='md' align="center" justify="space-between">
            <Box alignItems='center'> 
                <LinkBox>
                    <HStack _hover={{ cursor: "pointer" }}>
                        <Link href='/' _focus={{ outline: 'none' }}>
                            <a>
                            <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}><Image src="/Images/voting.png" w={{ base: '35px', md: '40px', lg: '45px' }} h={{ base: '35px', md: '40px', lg: '45px' }} color={logoColor} /></Tilt>
                            </a>                            
                        </Link>
                        <VStack>
                            <Text fontWeight="bold" lineHeight={{ base: '6px', md: '8px', lg: '18px' }} fontSize={{ base: '14px', md: '16px', lg: '18px' }} color={textColor}>EASY</Text>
                            <Text fontWeight="bold" lineHeight={{ base: '6px', md: '8px', lg: '10px' }} fontSize={{ base: '14px', md: '16px', lg: '18px' }} color={textColor}>VOTE</Text>
                        </VStack>
                    </HStack>
                </LinkBox>
            </Box>
            <Flex h='full' w='30%' align="center" justify="space-between">
                <Flex w='90%' align="center" justify="space-between">
                    {isLargerThan400 && <Link  href='/about' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }} fontWeight='500' fontSize={{ base: '12px', md: '14px', lg: '16px' }} >About </Link>}
                    {isLargerThan500 && <Link mt={2} href='https://github.com/GREENFONTS/Voting-App' isExternal _focus={{ outline: 'none' }}>
                        <Icon as={BiGitBranch} w={{ base: '18px', md: '20px', lg: '22px' }} h={{ base: '18px', md: '20px', lg: '22px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} />
                        </Link>}
                    <Icon as={icon} onClick={toggleColorMode} mx={10} w={{ base: '18px', md: '20px', lg: '22px' }} h={{ base: '18px', md: '20px', lg: '22px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} />
                    {isLargerThan700 && <Button>
                        <Link mt={2} href='/login' isExternal _focus={{ outline: 'none' }} w={{ base: '18px', md: '20px', lg: '22px' }} h={{ base: '18px', md: '20px', lg: '22px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}>Get Started</Link>
                    </Button>}
                    
                </Flex>

                <HamburgerIcon ml={4} onClick={onOpen} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} />
                <DrawerComponent isOpen={isOpen} onClose={onClose}  />
            </Flex>
        </Flex >
        
    )
        
}
export default Header