import {  useEffect, useState } from 'react';
import { Flex, Alert, AlertIcon, CloseButton, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, FormHelperText} from '@chakra-ui/react';
import { sha1Generator } from '../../../services/sha';

const GenerateCode = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [number, setNumber] = useState('');
    const [inputError, setInputError] = useState('')
    const [inputCheck, setInputCheck] = useState(false)
    const [response, setResponse] = useState('');
     
    useEffect(() => {
      if(number.length < 1){
        setInputCheck(true)
      }
      if(isNaN(number)){
        setInputError('Input must be a number')
        setInputCheck(true)
      }
      else{
        setInputCheck(false)
    }
    }, [number])
  
    const submitHandler = async () => {
      const res = await fetch(`/api/admin/codes/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({number, user: props.user})
    });
    const data = await res.json()

    if(res.status == 404){
        setNumber('')
      setAlertError(true)
      setResponse(data.msg)
    }
    else{
      setNumber("")
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
  {/* <ModalOverlay /> */}
   <ModalContent>
    <ModalHeader align='center'>Generate Codes</ModalHeader>
    <ModalCloseButton onClick={(e) => props.generateCode(false)} />
    <ModalBody>
        
        <FormControl isRequired >
            <FormLabel htmlFor='name'>Number of Codes</FormLabel>
            <Input id='number' type='text' value={number} onChange={(e) => setNumber(e.target.value)} />
            {inputCheck ? <FormHelperText color='red.500'>{inputError}</FormHelperText> : <></>}
        </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button disabled={inputCheck} bg='#e8e8e8' mr={3} onClick={() => {
          props.generateCode(false)
          submitHandler()
      }}>
        Generate
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal> 



    </Flex>
    </>
  )
}


export default GenerateCode;
