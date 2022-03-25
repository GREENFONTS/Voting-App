import {  useEffect, useState, useContext } from 'react';
import Link from "next/link";
import router from 'next/router';
import { Flex, Alert, AlertIcon, CloseButton, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, ModalOverlay, ModalCloseButton, ModalContent,  ModalFooter, useDisclosure} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import Socials from '../../components/social';
import { userDetailsContext } from '../../components/userDetailsProvider';


const addPosition = () => {
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');
    const [checkToken, setCheckToken] = useState(false);
    const [user, setUser] = useContext(userDetailsContext);
    const { onOpen, onClose } = useDisclosure();
    const [isOpen, setIsOpen] = useState(true);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [position, setPosition] = useState('')

    const submitHandler = () => {
        setAlertOpen(true)
        console.log(position)
    }


    useEffect(async () => {
        let token = JSON.parse(localStorage.getItem('token'))
        
        if(token === null){
          router.push('/login')
        }
        else{
          const res = await fetch(`/api/dashboard/?token=${token}`);
          const data = await res.json()
          if(res.status === 403){            
            localStorage.setItem('user', null)
            setCheckToken(true)
            router.push('/login')
        }
        else{
          setUser(JSON.parse(localStorage.getItem('user')))
        }
        }
        
        
    }, [])


  return (
    <>
    <Flex p='5'>
    <Modal isOpen={isOpen} onClose={onClose}>
  {/* <ModalOverlay /> */}
  <ModalContent>
    <ModalHeader align='center'>Add Positions</ModalHeader>
    <ModalCloseButton onClick={(e) => setIsOpen(false)} />
    <ModalBody>
        <FormControl isRequired >
            <FormLabel htmlFor='position'>Position</FormLabel>
            <Input id='position' type='position' value={position} onChange={(e) => setPosition(e.target.value)} />
        </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button bg='#e8e8e8' mr={3} onClick={() => {
          setIsOpen(false)
          submitHandler()
      }}>
        Submit
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

{isAlertOpen ? <Alert status='success'> <AlertIcon />
                        {position} Position added successfully
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => setAlertOpen(false)}/>
                    </Alert> : <></>}
    </Flex>
    </>
  )
}


export default addPosition;
