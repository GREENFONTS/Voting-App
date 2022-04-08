import React, {useEffect, useState} from 'react';
import Link from "next/link";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader,DrawerOverlay, DrawerContent, Text, Box, LinkBox, HStack,  Accordion, useDisclosure,
    AccordionItem,  AccordionButton,  AccordionPanel,     AccordionIcon,
    LinkOverlay, VStack, Icon, Button, Flex, Image, useColorModeValue} from '@chakra-ui/react'
import {VscGithub} from 'react-icons/vsc';
import { FaInstagram, FaEdit, FaList, FaDownload, FaDoorClosed } from 'react-icons/fa';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import {BiReset} from 'react-icons/bi';
import Fade from 'react-reveal/Fade';
import { FaVoteYea } from 'react-icons/fa';
import {AiOutlineClear} from 'react-icons/ai';
import { useCounter } from '../services/state';

const DrawerComponent = (props) => {

    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const textColor = useColorModeValue('black', 'white');
    const bgInstagram = useColorModeValue('red', 'white');
    const bgGithub = useColorModeValue('black', 'white');
    const bgLinkedIn = useColorModeValue('#0077b5', 'white');
    const bgTwitter = useColorModeValue('#1DA1F2', 'white');
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');
    const [user, setUser] = useState({})
    const [userCheck, setUserCheck] = useState(true)
    const [check, setCheck] = useState(true)
    const [state, actions] = useCounter();
    const {isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(async () => {
        if(state.user === null || state.user === undefined){
            setUserCheck(false)
        }
        else{
            const positionsRes = await fetch('/api/admin/positions/find', {
                method: 'POST',
                body: JSON.stringify({user: state.user.email})
            }) 
            const positionData = await positionsRes.json()
            actions.getPositions(positionData) 

            const nomineesRes = await fetch('/api/admin/nominees/find', {
                method: 'POST',
                body: JSON.stringify({user: state.user.email})
            }) 
            const nomineesData = await nomineesRes.json()
            actions.getNominees(nomineesData)

            const codesRes = await fetch('/api/admin/codes/find', {
                method: 'POST',
                body: JSON.stringify({user: state.user.email})
            }) 
            const codesData = await codesRes.json()
            actions.getCodes(codesData)
        }
                 
    }, [state.refreshDrawer])

    return (
        <Drawer
            onClose={onClose}
            isOpen={state.drawerState}
            placement='right'
            isFullHeight={false}
        >
            <DrawerOverlay />
            <DrawerContent backgroundColor={bgColor}>
            {!userCheck ? 
                <>
                <DrawerHeader>
                    <Flex w='100%' align='center'  justify='space-between'>
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
                        <Button h={10} w={10} variant='unstyled' m={3} onClick={() => actions.addDrawerState(false)}>
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
                </> : <>
                <DrawerHeader pt='0' pb='0'>
                    <Flex w='100%' align='center' p='0' justify='space-between'>
                        <Box alignItems='center'>
                            <LinkBox>
                            <HStack _hover={{ cursor: "pointer" }}>
                        <Link href='/' _focus={{ outline: 'none' }}>
                               <Icon as={FaVoteYea} w={{ base: '18px', md: '20px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
                           </Link>
                        <Text fontWeight="bold"  fontSize={{ base: '14px', md: '16px', lg: '20px' }} fontFamily="cursive" color={textColor}>{ state.user === null ? '' : state.user.organization }</Text>

                    </HStack>
                            </LinkBox>
                        </Box>
                        <Button h={10} w={10} variant='unstyled' m={3} onClick={() => actions.addDrawerState(false)}>
                            x
                        </Button>
                    </Flex>
                </DrawerHeader>

                <DrawerBody pt='0' pb='0'>
                    <Box>
                        <Text  _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='700' fontSize={{base: '15px', md: '18px', lg:'25px'}} color='purple.300'>MENU</Text>
                    </Box>

                    <Box>
                    <Fade right>
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                            <AccordionButton pt='0.5' pb='0.5'>
                                <Box flex='1' textAlign='left'>
                            <Text _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='700' fontSize={{base: '15px', md: '18px', lg:'20px'}} color='gray.500'>
                            Positions
                            </Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            
                            <AccordionPanel ml='4' p='2px' display='block' >
                            <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaEdit} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.listCodes(false)
                                actions.listNominees(false)
                                actions.addDrawerState(false)
                                actions.addPosition(true)
                            }}>
                            Add Position
                            </Button>
                            </HStack>

                           <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaList} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.listCodes(false)
                                actions.listNominees(false)
                                actions.addDrawerState(false)
                                actions.listPositions(true)
                            }}>
                            Show Positions
                            </Button>
                            </HStack>

                            </AccordionPanel>
                        </AccordionItem>
                        </Accordion>                   
                        
                    </Fade>


                    <Fade left>
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <AccordionButton pt='0.5' pb='0.5'>
                                <Box flex='1' textAlign='left'>
                            <Text _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='700' fontSize={{base: '15px', md: '18px', lg:'20px'}} color='gray.500'>
                            Nominees
                            </Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            
                            <AccordionPanel ml='4' p={2} display='block' >
                            <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaEdit} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.listNominees(false)
                                actions.addDrawerState(false)
                                actions.addNominee(true)
                                actions.listCodes(false)
                            }}>
                            Add Nominees
                            </Button>
                            </HStack>

                           <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaList} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.addDrawerState(false)
                                actions.listNominees(true)
                            }}>
                            Show Nominees
                            </Button>
                            </HStack>
                            
                            <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={AiOutlineClear} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.listNominees(false)
                                actions.addDrawerState(false)
                                actions.clearNominees(true)
                                actions.listCodes(false)
                            }}>
                            Clear Nominees
                            </Button>
                            </HStack>
                            </AccordionPanel>
                        </AccordionItem>
                        </Accordion>                   
                        
                    </Fade>

                    <Fade bottom>
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <AccordionButton pt='0.5' pb='0.5'>
                                <Box flex='1' textAlign='left'>
                            <Text _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='700' fontSize={{base: '15px', md: '18px', lg:'20px'}} color='gray.500'>
                            Codes
                            </Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            
                            <AccordionPanel ml='4' p='2px' display='block' >
                            <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaEdit} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.listNominees(false)
                                actions.addDrawerState(false)
                                actions.generateCode(true)
                                actions.listCodes(false)
                            }}>
                            Generate Codes
                            </Button>
                            </HStack>

                           <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaList} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.listNominees(false)
                                actions.addDrawerState(false)
                                actions.listCodes(true)
                            }}>
                            Show Codes
                            </Button>
                            </HStack>

                            </AccordionPanel>
                        </AccordionItem>
                        </Accordion>           
                        
                    </Fade>

                    <Fade bottom>
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <AccordionButton pt='0.5' pb='0.5'>
                                <Box flex='1' textAlign='left'>
                            <Text _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='700' fontSize={{base: '15px', md: '18px', lg:'20px'}} color='gray.500'>
                            Election
                            </Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            
                            <AccordionPanel ml='4' p='1px' display='block' >
                            <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaEdit} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.listNominees(false)
                                actions.addDrawerState(false)
                                actions.listCodes(false)
                                actions.generateLink(true)
                            }}>
                            Generate Link
                            </Button>
                            </HStack>

                            <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaDoorClosed} />
                            <Button bg='white' _hover={{ bg: 'white'}} onClick={(e) => { 
                                actions.endElectionModal(true)
                                actions.addDrawerState(false)
                            }}>
                           End Election
                            </Button>
                            </HStack>

                           <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={FaList} />
                            <Link href='/showResults' target='_blank'   fontWeight='600' fontSize={{base: '15px', md: '18px', lg:'12px'}} >Show Result</Link>
                            </HStack>

                            <HStack _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} >
                            <Icon as={BiReset} />
                            <Link href='/resetVotes' target='_blank' fontWeight='600' fontSize={{base: '15px', md: '18px', lg:'12px'}} >Reset Votes</Link>
                            </HStack>

                            </AccordionPanel>
                        </AccordionItem>
                        </Accordion>                   
                        
                    </Fade>

                    </Box>
                   
                </DrawerBody>
                </>}

                <DrawerFooter>
                    <Flex direction='column' px='4px' py='6px' h='100%' w='100%' bg={bgColor} borderTop='1px' borderColor='gray.200' align="center" justify="space-between" >
                        <Flex paddingLeft='10px' align="center" justify="center">
                            <Text paddingRight='10px'>© 2022</Text>
                            <Box w='15px' h='15px' marginRight='10px'>
                                <Image w='100%' h='100%' src='flag.png' />
                            </Box>
                        </Flex>
                        <Text >Godwill Onyewuchi Humphrey</Text>
                        <Flex align="center" justify="center" paddingRight='10px'>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <a href='https://github.com/GREENFONTS' target='_blank' rel="noreferrer" _focus={{ outline: 'none' }}><Icon as={VscGithub} color={bgGithub} /></a>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <a href='https://www.instagram.com/onyewuchigodwill/' target='_blank' rel="noreferrer" _focus={{ outline: 'none' }}><Icon as={FaInstagram} color={bgInstagram} /></a>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <a href='https://twitter.com/GODWILLONYEWUC1' target='_blank' rel="noreferrer" _focus={{ outline: 'none' }}><Icon as={BsTwitter} color={bgTwitter} /></a>
                            </Box>
                            <Box paddingRight='10px'  _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <a href='https://www.linkedin.com/in/godwill-onyewuchi-6746621b4/' target='_blank' rel="noreferrer" _focus={{ outline: 'none' }}><Icon as={BsLinkedin} color={bgLinkedIn} /></a>
                            </Box>
                        </Flex>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerComponent