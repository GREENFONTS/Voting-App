import React from 'react';
import { Box,Text,Button,  useMediaQuery, Image, Center} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const Login = () => {
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    return (
        <>
        <Box pt='8'>
        <Center>
        <Box display={{md : 'flex'}} height={{ base: '70vh', md: '70vh' }} w='80%' borderLeft='2px' borderBottom='2px' borderRight='1px'borderTop='0.5px' borderColor='gray.200' boxShadow='base'
           px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} align='center'>
               
            </Box>
        </Center> 
        </Box>
        
        </>
    )
}

export default Login;