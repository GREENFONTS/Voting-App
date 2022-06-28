import {  useEffect, useState } from 'react';
import { Flex, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, FormHelperText, Center} from '@chakra-ui/react';
import AlertComponent from '../../alert';
const GenerateCode = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState<boolean>(false);
    const [isAlertSuccess, setAlertSuccess] = useState<boolean>(false);
    const [number, setNumber] = useState<number | null>(null);
    const [inputError, setInputError] = useState<string>('')
    const [inputCheck, setInputCheck] = useState<boolean>(false)
    const [response, setResponse] = useState<string>('');
     
    useEffect(() => {
      if(number == null){
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
      body: JSON.stringify({number, user: props.user.email})
    });
    const data = await res.json()

    if(res.status == 404){
        setNumber(null)
      setAlertError(true)
      setResponse(data.msg)
    }
    else{
      setNumber(null)
      props.refreshDrawer(true)
      setAlertSuccess(true)
      setResponse(data.msg)  
    }

    }

  return (
    <>
    <AlertComponent isAlertError={isAlertError} isAlertSuccess={isAlertSuccess} setAlertError={setAlertError} setAlertSuccess={setAlertSuccess} response={response}/>
               
    <Flex p='5'>
    <Modal isOpen={props.isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader>
     <Center> Generate Codes</Center>
     </ModalHeader>
    <ModalCloseButton onClick={(e) => props.generateCode(false)} />
    <ModalBody>
        
        <FormControl isRequired >
            <FormLabel htmlFor='name'>Number of Codes</FormLabel>
            <Input id='number' type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} />
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
