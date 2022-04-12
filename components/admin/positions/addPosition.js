import {  useEffect, useState } from 'react';
import { Flex, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure} from '@chakra-ui/react';
import AlertComponent from '../../alert';

const AddPosition = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [position, setPosition] = useState('');
    const [inputCheck, setInputCheck] = useState(false)
    const [response, setResponse] = useState('');
    
    useEffect(() => {
      if(position.length < 1){
        setInputCheck(true)
      }
      else{
        setInputCheck(false)
    }
    }, [position])
  
    const submitHandler = async () => {
      const res = await fetch('/api/admin/positions/add', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({position, user: props.user.email})
    });
    const data = await res.json()

    if(res.status == 404){
      setPosition('')
      setAlertError(true)
      setResponse(data.msg)
    }
    else{
      setPosition('')
      props.refreshDrawer(true)
      setAlertSuccess(true)
      setResponse(data.msg)  

      const res = await fetch('/api/admin/positions/find')
      const datas = await res.json()
      props.getPositions(datas)
    }

    }


  return (
    <>
    <Flex p='5'>
    <Modal isOpen={props.isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader align='center'>Add Positions</ModalHeader>
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
