import React from 'react';
import { VStack, Icon} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Fade from 'react-reveal/Fade';
import {VscGithub} from 'react-icons/vsc';
import { FaInstagram } from 'react-icons/fa';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';

const Socials = (props) => {
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');

      return (
        <Fade bottom>
            <VStack spacing={props.spacing}>
        <a href='https://www.linkedin.com/in/godwill-onyewuchi-6746621b4/' target='_blank' rel="noreferrer" _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
             <Icon as={BsLinkedin} w={{ base: '18px', md: '20px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
          </a>

          <a href='https://twitter.com/GODWILLONYEWUC1' target='_blank' rel="noreferrer" _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
             <Icon as={BsTwitter} w={{ base: '18px', md: '20px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
          </a>

          <a href='https://www.instagram.com/onyewuchigodwill/' target='_blank' rel="noreferrer"  _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
             <Icon as={FaInstagram} w={{ base: '18px', md: '20px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
          </a>

          <a href='https://github.com/GREENFONTS' target='_blank' rel="noreferrer" _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
             <Icon as={VscGithub} w={{ base: '18px', md: '20px', lg: '35px' }} h={{ base: '18px', md: '20px', lg: '35px' }} color={iconColor} _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}/> 
          </a>
      </VStack>
        </Fade>
        
      )
}

export default Socials;