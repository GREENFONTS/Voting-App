import { useState } from 'react';
import { Flex, Alert, AlertIcon, CloseButton, Button, Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Text, HStack} from '@chakra-ui/react';

const ResetVotes = (props) => {
    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [response, setResponse] = useState('');
    
    const submitHandler = async () => {
      const res = await fetch('/api/voting/resetVotes', {
        method: 'POST',
        body: props.user.email
    }) 
    if(res.status == 200){
      setResponse(`Election votes has been cleared`)  
        props.isClose(false)
        setAlertSuccess(true)
    }
    else{
      setResponse("Reset Votes request failed")  
      props.refreshDrawer(true)
        props.isClose(false)
        setAlertError(true)
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
  {/* <ModalOverlay /> */}
   <ModalContent>
    <ModalHeader align='center'>Reset votes</ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
        <Text fontSize='15px' fontFamily='cursive' fontWeight='600'>This will clear the election votes</Text>
       <Text fontSize='20px' fontFamily='cursive' fontWeight='600'> Do you want to reset the elections?</Text>
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


export default ResetVotes;
