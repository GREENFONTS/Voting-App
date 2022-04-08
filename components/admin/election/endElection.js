import { useState } from 'react';
import { Flex, Alert, AlertIcon, CloseButton, Button, Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Text, HStack} from '@chakra-ui/react';

const EndElection = (props) => {
    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [response, setResponse] = useState('');
    
    const submitHandler = () => {
        props.isClose(false)
        props.endElection(true)
        setAlertSuccess(true)
        setResponse("Election Link has been disabled")  
        console.log(props.electionState)
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
  {/* <ModalOverlay /> */}
   <ModalContent>
    <ModalHeader align='center'>End Election</ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
        <Text fontSize='15px' fontFamily='cursive' fontWeight='600'>This will disable the voting link</Text>
       <Text fontSize='20px' fontFamily='cursive' fontWeight='600'> Do you want to end the elections?</Text>
        <HStack mt='3'>
            <Button onClick={(e) => submitHandler()}>Yes</Button>
            <Button onClick={(e) => props.isClose(false)}>No</Button>
        </HStack>
    </ModalBody>

    <ModalFooter>
      <Button bg='#e8e8e8' mr={3} onClick={() => {
          props.isClose(false)
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


export default EndElection;
