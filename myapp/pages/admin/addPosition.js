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
    
    const [user, setUser] = useContext(userDetailsContext);
    const { onOpen, onClose } = useDisclosure();
    const [isOpen, setIsOpen] = useState(true);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [position, setPosition] = useState('');
    const [response, setResponse] = useState('')

    
    let formBody = {
      position,
    }

    useEffect(async () => {
        let token = JSON.parse(localStorage.getItem('token'))
        
        if(token === null){
          router.push('/login')
        }
    }, [])
    
    const submitHandler = async () => {
      console.log(formBody)
      const res = await fetch('/api/admin/addPositions', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({position, user: user.email})
    });
    const data = await res.json()

    if(res.status == 404){
      setAlertOpen(true)
      setResponse(data.msg)
    }
    else{
    
      setIsOpen(false)
      setResponse(data.msg)
      router.push('/admin')
      
     
      
    }

    }

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

{isAlertOpen ? <Alert status='error'> <AlertIcon />
                        {response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => setAlertOpen(false)}/>
                    </Alert> : <></>}
    </Flex>
    </>
  )
}


export default addPosition;
