import {  useEffect, useState } from 'react';
import { Flex, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Select} from '@chakra-ui/react';
import {MdArrowDropDown} from 'react-icons/md';
import AlertComponent from '../../alert';

const AddNominee = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState(null);
    const [inputCheck, setInputCheck] = useState(false)
    const [response, setResponse] = useState('');
    
    useEffect(() => {
      if(position.length < 2 || name.length < 2 || image == null){
        setInputCheck(true)
      }
      else{
        setInputCheck(false)
    }
    }, [position])
  
    const submitHandler = async (e) => {
      e.preventDefault()
      const form = new FormData()
      form.append('name', name)
      form.append('position', position)
      form.append('image', image)
      form.append('user', props.user.email)
      form.append('positions', JSON.stringify(props.positions))
  
      const res = await fetch(`/api/admin/nominees/add`, {
      method: "POST",
      body: form
    });
    const data = await res.json()

    if(res.status == 404){
      setName("")
      setPosition('')
      setAlertError(true)
      setResponse(data.msg)
    }
    else{
      setName("")
      setPosition('')
      props.refreshDrawer()
      props.listNomineeModal(true)
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
    <ModalHeader align='center'>Add Nominee</ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
        
        <FormControl isRequired >
            <FormLabel htmlFor='name'>Full Name</FormLabel>
            <Input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl isRequired >
            <FormLabel htmlFor='position'>Position</FormLabel>
            <Select icon={<MdArrowDropDown />} placeholder='Select Nominee Position' onChange={(e) => setPosition(e.target.value)}>
            {props.positions.map((ele) => {
            return (
            <option key={props.positions.indexOf(ele)} value={ele.name}>{ele.name}</option>
            )}
            )}

            </Select>
        </FormControl>

         <FormControl isRequired >
            <FormLabel htmlFor='image'>Upload Image</FormLabel>
            <Input id='image' type='file' onChange={(e) => setImage(e.target.files[0])} />
        </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button disabled={inputCheck} bg='#e8e8e8' mr={3} onClick={(e) => {
          props.isClose(false)
          submitHandler(e)
      }}>
        Submit
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal> 
</Flex>
    </>
  )
}


export default AddNominee;
