import { useState } from 'react';
import { Flex, Alert, AlertIcon, CloseButton, Button, Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Text, HStack, Center} from '@chakra-ui/react';

const ClearNominees = (props) => {
    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState<boolean>(false);
    const [isAlertSuccess, setAlertSuccess] = useState<boolean>(false);
    const [response, setResponse] = useState<string>('');
    
    const submitHandler = async () => {
        const res = await fetch(`/api/admin/nominees/deleteAll?user=${props.user.email}`);
        const data = await res.json()

        if(res.status == 404){
        props.isOpen(false)
        setAlertError(true)
        setResponse(data.msg)
        }
        else{
            props.clearNominees(false)
        props.refreshDrawer(true)
        setAlertSuccess(true)
        setResponse(data.msg)  
        }

    }

    const handleClose = () => {
      setAlertError(false)
      setAlertSuccess(false)
    }

  return (
    <>
    {isAlertError ? <Alert status='error'> <AlertIcon />
                        {response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}

                    {isAlertSuccess ? <Alert status='success'> <AlertIcon />
                        {response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}
                    
    <Flex p='5'>
    <Modal isOpen={props.isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader>
      <Center>Clear Nominees</Center>
    </ModalHeader>
    <ModalCloseButton onClick={(e) => props.clearNominees(false)} />
    <ModalBody>
        
       <Text fontSize='20px' fontFamily='cursive' fontWeight='600'> Do you want to clear all Nominees?</Text>
        <HStack mt='3'>
            <Button onClick={(e) => submitHandler()}>Yes</Button>
            <Button onClick={(e) => props.clearNominees(false)}>No</Button>
        </HStack>
    </ModalBody>

    <ModalFooter>
      <Button bg='#e8e8e8' mr={3} onClick={() => {
          props.clearNominees(false)
      }}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal> 



    </Flex>
    </>
  )
}


export default ClearNominees;
