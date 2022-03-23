import { Component, useEffect, useState } from 'react';
import Link from "next/link";
import router from 'next/router';
import { Flex, Box,Text,Button,  useMediaQuery, Image, Center, Stack, Icon, Skeleton} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import Socials from '../components/social';
import { ensureAuthenticated } from '../config/auth';
import { getStorage, setStorage } from '../services/storage';


const dashboard = () => {
    const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
    const [isLesserThan900] = useMediaQuery('(max-width: 900px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');
    const [checkToken, setCheckToken] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        const verifyToken = ensureAuthenticated(token)
        console.log(token, verifyToken)
        if(!verifyToken){
            
            setCheckToken(true)
            router.push('/login')
        }
    }, [])



  return (
    <>
    {checkToken ? 
    <Flex align='center'>
        <Stack>
        <Skeleton height='20vh' />
        <Skeleton height='20vh' />
        <Skeleton height='20vh' />
        </Stack>
    </Flex> 
    :
    <Text>Dashboard</Text>
  }
    </>
  )
}


export default dashboard;
