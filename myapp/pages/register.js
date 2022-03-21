import React, { useState } from 'react';
import { Box,Text,Button,  useMediaQuery, Image, Center, FormControl, Input, FormLabel, FormHelperText} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';

const Login = () => {
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
        <Box pt='8'>
        <Center>
        <Box display={{md : 'flex'}} height={{ base: '70vh', md: '80vh' }} w='90%' borderLeft='2px' borderBottom='2px' borderRight='1px'borderTop='0.5px' borderColor='gray.200' boxShadow='base'
           px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} align='center'>
               <Box w={{base: '100%', md: '35%'}} h={{ base: '200px', md: '250px', lg: '450px' }}>
                <Bounce left>         
                    <Image src='/images/Login.png' alt='Topic' h='90%'  width='100%' />         
                </Bounce>
               </Box>
               <Box align='center' >
                   <FormControl>
                   <FormLabel htmlFor='firstName'>FirstName</FormLabel>
                    <Input id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>

                    <FormControl>
                    <FormLabel htmlFor='lastName'>LastName</FormLabel>
                    <Input id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                    <FormLabel htmlFor='userName'>UserName</FormLabel>
                    <Input id='userName' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                   <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl>
                    <FormLabel htmlFor='tel'>Tel</FormLabel>
                    <Input id='tel' type='text' value={tel} onChange={(e) => setTel(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                    <FormLabel htmlFor='tel'>Organization</FormLabel>
                    <Input id='organization' type='text' value={organization} onChange={(e) => setOrganization(e.target.value)} />
                    <FormHelperText> The organization or group participating in the election </FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                    <FormLabel htmlFor='password1'>Confirm Password</FormLabel>
                    <Input id='password1' type='password' value={password1} onChange={(e) => setPassword1(e.target.value)} />
                   </FormControl>
               </Box>
            </Box>
        </Center> 
        </Box>
        
        </>
    )
}

export default Login;