import {  useEffect, useState } from 'react';
import { Flex, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Center} from '@chakra-ui/react';
import AlertComponent from '../../alert';

const AddPosition = (props) => {
    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState<boolean>(false);
    const [isAlertSuccess, setAlertSuccess] = useState<boolean>(false);
    const [position, setPosition] = useState<string>('');
    const [inputCheck, setInputCheck] = useState<boolean>(false)
    const [response, setResponse] = useState<string>('');
    
    useEffect(() => {
      if(position.length < 1){
        setInputCheck(true)
      }
      else{
        setInputCheck(false)
    }
    }, [position])
  
    const submitHandler = async () => {
      const user = props.user.email
      const res = await fetch('/api/admin/positions/add', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({position, user: user})
    });
    const data = await res.json()

    if(res.status == 404){
      setPosition('')
      setAlertError(true)
      setResponse(data.msg)
    }
    else{
      setPosition('')
      setAlertSuccess(true)
      setResponse(data.msg)  

      const res = await fetch('/api/admin/positions/find', {
        method: 'POST',
        body: props.user.email
    }) 
    const datas = await res.json() 
      props.getPositions(datas)
    }

    }
    
  return (
    <>
    <Flex p='2'>
    <Modal isOpen={props.isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader>
      <Center>Add Positions</Center></ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
        <FormControl isRequired >
            <FormLabel htmlFor='position'>Position</FormLabel>
            <Input id='position' type='position' value={position} onChange={(e) => setPosition(e.target.value)} />
        </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button disabled={inputCheck} bg='#e8e8e8' mr={3} onClick={() => {
          props.isClose(false)
          submitHandler()
      }}>
        Submit
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal> 

      <AlertComponent isAlertError={isAlertError} isAlertSuccess={isAlertSuccess} setAlertError={setAlertError} setAlertSuccess={setAlertSuccess} response={response}/>

    </Flex>
    </>
  )
}
export default AddPosition;
