import React, { useState } from 'react';
import Link from "next/link";
import { Box,Text,Button, useMediaQuery, Image, Center, FormControl, Input, FormLabel, FormHelperText} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';

const Register = () => {
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [organization, setOrganization] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');

    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    return (
        <>
        <Box >
        <Center>
        {isLargerThan900 && <Box display={{md : 'flex'}} height={{ base: '70vh', md: '90vh' }} w='95%' px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} >
               <Box w={{base: '100%', md: '35%'}} h={{ lg: '85vh' }} mt='5'>
                <Bounce left>         
                    <Image src='/images/signup.png' alt='Topic' h='70vh'  width='100%' />         
                </Bounce>
               </Box>
                <Box w='5%'></Box>
               <Box w='60%'>
                   <Box>
                       <Text fontSize='30px' fontFamily='sans-serif' mb='4' fontWeight='700'>Register</Text>
                       <Text fontSize='18px' fontFamily='sans-serif' mb='2'>Create and host an online Election efficiently </Text>
                       <Text fontSize='15px' fontFamily='sans-serif' mb='2' color='gray.500'>Let's get you all set up so that you can create your admin account <br/>and set up the election </Text>
                   </Box>

                   <Box display={{lg:'flex'}}>
                   <FormControl w='45%'>
                   <FormLabel htmlFor='firstName'>FirstName</FormLabel>
                    <Input id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>

                    <Box w='5%'></Box>
                    <FormControl w='45%'>
                    <FormLabel htmlFor='lastName'>LastName</FormLabel>
                    <Input id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                   </Box>
                   
                   <Box display={{lg:'flex'}} mt='2'>
                   <FormControl isRequired w='45%'>
                    <FormLabel htmlFor='userName'>UserName</FormLabel>
                    <Input id='userName' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>

                    <Box w='5%'></Box>
                    <FormControl isRequired w='45%'>
                    <FormLabel htmlFor='tel'>Organization</FormLabel>
                    <Input id='organization' type='text' value={organization} onChange={(e) => setOrganization(e.target.value)} />
                    <FormHelperText fontSize='11px'> The organization or group participating in the election </FormHelperText>
                    </FormControl>
                   </Box>
                    
                   <Box display={{lg:'flex'}} mt='2'>
                   <FormControl isRequired w='45%'>
                   <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <Box w='5%'></Box>
                    <FormControl w='45%'>
                    <FormLabel htmlFor='tel'>Tel</FormLabel>
                    <Input id='tel' type='text' value={tel} onChange={(e) => setTel(e.target.value)} />
                    </FormControl>
                   </Box>
                    
                   <Box display={{lg:'flex'}} mt='2'>
                   <FormControl isRequired w='45%'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <Box w='5%'></Box>
                    <FormControl isRequired w='45%'>
                    <FormLabel htmlFor='password1'>Confirm Password</FormLabel>
                    <Input id='password1' type='password' value={password1} onChange={(e) => setPassword1(e.target.value)} />
                   </FormControl>
                   </Box>

                   <Box mt='5'>
                       <Button id='button' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>Create Account</Button>
                   </Box>

                   <Box mt='5' display='flex'>
                       <Text mr='2'>Already have an account? </Text>
                       <Text color='purple.600' fontFamily='sans-serif' fontWeight='600' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}><Link href='/login' >LogIn</Link></Text>
                   </Box>
                   
               </Box>
            </Box>
}

{isLesserThan900 && <Box display={{md : 'flex'}} w='100%' px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} >
               <Box>
                <Bounce left>         
                    <Image src='/images/signup.png' alt='Topic' h='30vh'  width='100%' />         
                </Bounce>
               </Box>
               <Box w='100%'>
                   <Box>
                       <Text fontSize='20px' fontFamily='sans-serif' mb='4' fontWeight='700'>Register</Text>
                       <Text fontSize='15px' fontFamily='sans-serif' mb='2'>Create and host an online Election efficiently </Text>
                       <Text fontSize='12px' fontFamily='sans-serif' mb='2' color='gray.500'>Let's get you all set up so that you can create your admin account and set up the election </Text>
                   </Box>

                   <FormControl >
                   <FormLabel htmlFor='firstName'>FirstName</FormLabel>
                    <Input id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>

                    <FormControl >
                    <FormLabel htmlFor='lastName'>LastName</FormLabel>
                    <Input id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                   
                   <FormControl isRequired >
                    <FormLabel htmlFor='userName'>UserName</FormLabel>
                    <Input id='userName' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired >
                    <FormLabel htmlFor='tel'>Organization</FormLabel>
                    <Input id='organization' type='text' value={organization} onChange={(e) => setOrganization(e.target.value)} />
                    <FormHelperText fontSize='11px'> The organization or group participating in the election </FormHelperText>
                    </FormControl>
                    
                   <FormControl isRequired >
                   <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl>
                    <FormLabel htmlFor='tel'>Tel</FormLabel>
                    <Input id='tel' type='text' value={tel} onChange={(e) => setTel(e.target.value)} />
                    </FormControl>
                  
                   <FormControl isRequired >
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired >
                    <FormLabel htmlFor='password1'>Confirm Password</FormLabel>
                    <Input id='password1' type='password' value={password1} onChange={(e) => setPassword1(e.target.value)} />
                   </FormControl>

                   <Box mt='5'>
                       <Button id='button' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>Create Account</Button>
                   </Box>

                   <Box mt='5' display='flex'>
                       <Text mr='2'>Already have an account? </Text>
                       <Text color='purple.600' fontFamily='sans-serif' fontWeight='600' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}><Link href='/login' >LogIn</Link></Text>
                   </Box>
                   
               </Box>
            </Box>}
            
        </Center> 
        

        </Box>
        
        </>
    )
}

export default Register;