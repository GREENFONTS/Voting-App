import React, { useState } from 'react';
import Link from "next/link";
import { Box,Text,Button, useMediaQuery, Image, Center, FormControl, Input, FormLabel, FormHelperText, Icon} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import { FaUserLock } from 'react-icons/fa';

const Login = () => {
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    return (
        <>
        <Box >
        <Center>
        {isLargerThan900 && <Box display={{md : 'flex'}} height={{ base: '70vh', md: '90vh' }} w='95%' px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} >
               <Box w={{base: '100%', md: '55%'}} h={{ lg: '85vh' }} mt='5'>
                <Bounce left>         
                    <Image src='/images/Login.png' alt='Topic' h='70vh'  width='100%' />         
                </Bounce>
               </Box>
                <Box w='5%'></Box>
               <Box w='30%' mt='7' >
                   <Box align='center'>
                       <Icon as={FaUserLock} color='gray.300'  w='120px' h='120px' />
                   </Box>
                   <Box>
                       <Text fontSize='30px' fontFamily='sans-serif' mb='9' fontWeight='700'>Login</Text>
                       <Text fontSize='18px' fontFamily='sans-serif' mb='5'>Login to your account </Text>
                       <Text fontSize='15px' fontFamily='sans-serif' mb='2' color='gray.500'>Welcome back, let's get back to business </Text>
                   </Box>
                   
                    
                   <FormControl isRequired >
                   <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    
                   <FormControl isRequired >
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                   <Box mt='5'>
                       <Button id='button' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>Create Account</Button>
                   </Box>

                   <Box mt='5' display='flex'>
                       <Text mr='2'>Don't have an account yet? </Text>
                       <Text color='purple.600' fontFamily='sans-serif' fontWeight='600' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}><Link href='/register' >SignUp</Link></Text>
                   </Box>
                   
                   </Box>  
                   <Box w='10%'></Box>
            </Box>
}

{isLesserThan900 && <Box h='100vh' w='100%' px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} pb='5'>

               <Box w='100%' mt='2'>                
                <Bounce left>         
                    <Image src='/images/Login.png' alt='Topic' h='35vh'  width='100%' />         
                </Bounce>
               </Box>
               <Box>
                   <Box align='center'>
                       <Icon as={FaUserLock} color='gray.300'  w='80px' h='80px' />
                   </Box>
                   <Box>
                       <Text fontSize='20px' fontFamily='sans-serif' mb='9' fontWeight='700'>Login</Text>
                       <Text fontSize='15px' fontFamily='sans-serif' mb='5'>Login to your account </Text>
                       <Text fontSize='12px' fontFamily='sans-serif' mb='2' color='gray.500'>Welcome back, let's get back to business </Text>
                   </Box>
                   
                    
                   <FormControl isRequired >
                   <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    
                   <FormControl isRequired >
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                   <Box mt='5'>
                       <Button id='button' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>Create Account</Button>
                   </Box>

                   <Box mt='3' display='flex' >
                       <Text mr='2'>Don't have an account yet? </Text>
                       <Text color='purple.600' fontFamily='sans-serif' fontWeight='600' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}><Link href='/register' >SignUp</Link></Text>
                   </Box>
                   
                   </Box>  
                
            </Box>}
            
        </Center> 
        

        </Box>
        
        </>
    )
}

export default Login;