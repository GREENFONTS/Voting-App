import {  useEffect, useState } from 'react';
import { Flex, Alert, AlertIcon, CloseButton, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, StatHelpText} from '@chakra-ui/react';
import { sha1Generator } from '../../../services/sha';

const AddNominee = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState(null);
    const [inputCheck, setInputCheck] = useState(false)
    const [response, setResponse] = useState('');
     
    let formBody = {
      name, 
      position,
      positions: props.positions,
      user : props.user
    }

    useEffect(() => {
      if(position.length < 1 || name.length < 1){
        setInputCheck(true)
      }
      else{
        setInputCheck(false)
    }
    }, [position])
  
    const submitHandler = async () => {
      const res = await fetch(`/api/admin/nominees/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, position, positions: props.positions, user: props.user})
    });
    const data = await res.json()

    if(res.status == 404){
      setAlertError(true)
      setResponse(data.msg)
    }
    else{

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
    <Flex p='5'>
    <Modal isOpen={props.isOpen} onClose={onClose}>
  {/* <ModalOverlay /> */}
   <ModalContent>
    <ModalHeader align='center'>Add Nominee</ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
        
        <FormControl isRequired >
            <FormLabel htmlFor='name'>Full Name</FormLabel>
            <Input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl isRequired >
            <FormLabel htmlFor='position'>Position</FormLabel>
            <Input id='position' type='text' value={position} onChange={(e) => setPosition(e.target.value)} />
        </FormControl>

         {/* <FormControl isRequired >
            <FormLabel htmlFor='image'>Upload Image</FormLabel>
            <Input id='image' type='file' onChange={(e) => setImage(e.target.files[0])} />
        </FormControl> */}
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
{isAlertError ? <Alert status='error'> <AlertIcon />
                        {response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}

                    {isAlertSuccess ? <Alert status='success'> <AlertIcon />
                        {response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}


    </Flex>
    </>
  )
}


export default AddNominee;
