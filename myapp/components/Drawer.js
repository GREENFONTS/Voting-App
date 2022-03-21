import React from 'react';
import Link from "next/link";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader,DrawerOverlay, DrawerContent, Text, Box, LinkBox, HStack,
    LinkOverlay, VStack, Icon, Button, Flex, Image, useColorModeValue} from '@chakra-ui/react'
import {VscGithub} from 'react-icons/vsc';
import { FaInstagram } from 'react-icons/fa';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import Fade from 'react-reveal/Fade';
import { FaVoteYea } from 'react-icons/fa';

const DrawerComponent = (props) => {

    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const textColor = useColorModeValue('black', 'white');
    const bgInstagram = useColorModeValue('red', 'white');
    const bgGithub = useColorModeValue('black', 'white');
    const bgLinkedIn = useColorModeValue('#0077b5', 'white');
    const bgTwitter = useColorModeValue('#1DA1F2', 'white');
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');


   return (
        <Drawer
            isOpen={props.isOpen}
            placement='right'
            onClose={props.onClose}
        >
            <DrawerOverlay />
            <DrawerContent backgroundColor={bgColor}>
                <DrawerHeader>
                    <Flex w='100%' align='center' justify='space-between'>
                        <Box alignItems='center'>
                            <LinkBox>
                            <HStack _hover={{ cursor: "pointer" }}>
                        <Link href='/' _focus={{ outline: 'none' }}>
                               <Icon as={FaVoteYea} w={{ base: '18px', md: '20px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
                           </Link>
                        <Text fontWeight="bold"  fontSize={{ base: '14px', md: '16px', lg: '20px' }} fontFamily="cursive" color={textColor}>easy-vote</Text>

                    </HStack>
                            </LinkBox>
                        </Box>
                        <Button h={10} w={10} variant='unstyled' m={3} onClick={props.onClose}>
                            x
                        </Button>
                    </Flex>
                </DrawerHeader>

                <DrawerBody>
                <Link href='/' target='_blank' mb='10px' _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='500' >Home</Link>
                    <Fade right>
                        <Link href='/about' target='_blank' mb='10px' _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='500' >About</Link>
                    </Fade>
                    <Fade bottom>
                        <Box  _hover={{ transform: 'scale(1.02)', cursor: "pointer" }}>
                            <Link href='/register' target='_blank' _hover={{ cursor: "pointer" }} fontWeight='500' >Sign Up</Link>
                        </Box>
                    </Fade>
                    <Fade left>
                        <Box mb='10px' _hover={{ transform: 'scale(1.02)', cursor: "pointer" }}>
                            <Link href='/login' target='_blank' _hover={{ cursor: "pointer" }} fontWeight='500' >Sign In</Link>
                        </Box>
                    </Fade>
                </DrawerBody>

                <DrawerFooter>
                    <Flex direction='column' px='4px' py='6px' h='100%' w='100%' bg={bgColor} borderTop='1px' borderColor='gray.200' align="center" justify="space-between" >
                        <Flex paddingLeft='10px' align="center" justify="center">
                            <Text paddingRight='10px'>© 2022</Text>
                            <Box w='15px' h='15px' marginRight='10px'>
                                <Image w='100%' h='100%' src='/images/flag.png' />
                            </Box>
                        </Flex>
                        <Text >Godwill Onyewuchi Humphrey</Text>
                        <Flex align="center" justify="center" paddingRight='10px'>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://github.com/GREENFONTS' isExternal _focus={{ outline: 'none' }}><Icon as={VscGithub} color={bgGithub} /></Link>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://www.instagram.com/onyewuchigodwill/' isExternal _focus={{ outline: 'none' }}><Icon as={FaInstagram} color={bgInstagram} /></Link>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://twitter.com/GODWILLONYEWUC1' isExternal _focus={{ outline: 'none' }}><Icon as={BsTwitter} color={bgTwitter} /></Link>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://www.linkedin.com/in/godwill-onyewuchi-6746621b4/' isExternal _focus={{ outline: 'none' }}><Icon as={BsLinkedin} color={bgLinkedIn} /></Link>
                            </Box>
                        </Flex>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerComponent