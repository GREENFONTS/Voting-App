import {  useEffect, useState} from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa'
import { Flex, Box, Text, Icon, Button, FormControl, FormLabel, Input,  Modal, ModalBody, 
    ModalHeader,  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Image, VStack, HStack, Select} from '@chakra-ui/react';
import {MdArrowDropDown} from 'react-icons/md';
import AlertComponent from '../../alert';

const NomineesList = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [position, setPosition] = useState('');
    const [inputCheck, setInputCheck] = useState(false)
    const [response, setResponse] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [currentState, setCurrentState] = useState(null)
    const [id, setId] = useState('')

    useEffect(() => {
      if(position.length < 1 || name.length < 1){
        setInputCheck(true)
      }
      else{
          setInputCheck(false)
      }
    }, [position, name])
  
    const submitHandler = async () => {
      const res = await fetch(`/api/admin/nominees/update?id=${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name, position})
    });
    const data = await res.json()

    if(res.status == 404){
      setPosition('')
      setName('')
      setAlertError(true)
      setResponse(data.msg)
    }
    else{
     setPosition('')
     setName('')
      props.refreshDrawer(true)
      props.isClose(true)
      setAlertSuccess(true)
      setResponse(data.msg)  
    }

    }

    const deleteHandler = async (Id) => {
        const res = await fetch(`/api/admin/nominees/delete?id=${Id}`)
        const data = await res.json()

        if(res.status === 200){
        props.refreshDrawer()
      setAlertSuccess(true)
      setResponse(data.msg) 
        }
        
    }

  return (
    <>
<AlertComponent isAlertError={isAlertError} isAlertSuccess={isAlertSuccess} setAlertError={setAlertError} setAlertSuccess={setAlertSuccess} response={response}/>

    <Box p='5'>
      <Box mb='1' align='center'>
        <Text fontSize={{base: '20px', md:'25px', lg:'35px'}} fontFamily='cursive' fontWeight='700'>Nominees</Text>
      </Box>
    <Flex display={{base: 'block'}}>
      {props.nominees.map((ele) => {
        return(
        <Box key={props.nominees.indexOf(ele)} mb='2' display={ {md: 'inline-block'}} align='center' p='1' w={{base: "100%", md: "47%", lg:"32%" }} mr={{lg:'3'}} h={{base: "45vh", md: "30vh", lg:"40vh" }} border='1px' borderColor='gray.200' boxShadow='base'>
        <Image src={ele.image} alt='Nominee Image' w='95%' h='70%'/>
        <Flex p='1' justify='space-between'>
          <VStack align='start'>
            <Text>Name: {ele.name}</Text>
            <Text>Position: {ele.post}</Text>
          </VStack>
          <Box p='2'>
          <HStack>
          <Icon mr='10px' as={FaEdit} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => { setCurrentState(ele)
                        setIsOpen(true) 
                        setName(ele.name)
                        setPosition(ele.post)
                      setId(ele.id)}
                    }/>
                        <Icon as={FaTrash} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => deleteHandler(ele.id)}/>
          </HStack>
          </Box>
          
        </Flex>
        </Box>
        )
      })}
      
      
    </Flex> 
  



    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader align='center'>Update Nominee - {currentState != null ? currentState.name : ''}</ModalHeader>
    <ModalCloseButton onClick={(e) => setIsOpen(false)} />
    <ModalBody>
        <FormControl isRequired >
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl isRequired >
            <FormLabel htmlFor='position'>Position</FormLabel>
            <Select icon={<MdArrowDropDown />} placeholder='Select Nominee Position' value={position} onChange={(e) => setPosition(e.target.value)}>
            {props.positions.map((ele) => {
            return (
            <option key={props.positions.indexOf(ele)} value={ele.name}>{ele.name}</option>
            )}
            )}

            </Select>
        </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button disabled={inputCheck} bg='#e8e8e8' mr={3} onClick={() => {
          setIsOpen(false)
          submitHandler(name, position)
      }}>
        Submit
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal> 
    </>


  )
}


export default NomineesList;
