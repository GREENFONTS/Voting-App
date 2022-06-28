import {  useEffect, useState } from 'react';
import { Flex, Button, FormControl, FormLabel, Input,  Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Select, Center} from '@chakra-ui/react';
import {MdArrowDropDown} from 'react-icons/md';
import AlertComponent from '../../alert';

const AddNominee = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState<boolean>(false);
    const [isAlertSuccess, setAlertSuccess] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [image, setImage] = useState(null);
    const [inputCheck, setInputCheck] = useState<boolean>(false)
    const [response, setResponse] = useState<string>('');
    
    useEffect(() => {
      if(name.length < 2 || image == null || position == ""){
        setInputCheck(true)
      }
      else{
        setInputCheck(false)
    }
    }, [position])
  
    const submitHandler = async () => {
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
      
      setAlertSuccess(true)
      setResponse(data.msg)  

      const res = await fetch('/api/admin/nominees/find', {
        method: 'POST',
        body: props.user.email
    }) 
    const datas = await res.json()
    props.getNominees(datas)

    props.listNomineeModal(true)

    }
  }

  return (
    <>
<AlertComponent isAlertError={isAlertError} isAlertSuccess={isAlertSuccess} setAlertError={setAlertError} setAlertSuccess={setAlertSuccess} response={response}/>
                    
    <Flex p='5'>
    <Modal isOpen={props.isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader>
      <Center> Add Nominee</Center>
     </ModalHeader>
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
          submitHandler()
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
