import {  useEffect, useState} from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa'
import { Flex, Box, Text, Icon, Button, FormControl, FormLabel, Input,  Modal, ModalBody, 
    ModalHeader,  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure, Center} from '@chakra-ui/react';
import AlertComponent from '../../alert';
import Position from '../../../models/positions';

const PositionList = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState<boolean>(false);
    const [isAlertSuccess, setAlertSuccess] = useState<boolean>(false);
    const [position, setPosition] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [inputCheck, setInputCheck] = useState<boolean>(false)
    const [response, setResponse] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    useEffect(() => {
        if(position.length < 1){
          setInputCheck(true)
        }
        else{
            setInputCheck(false)
        }
      }, [position])
  
    const submitHandler = async () => {
      const res = await fetch(`/api/admin/positions/update?id=${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({position})
    });
    const data = await res.json()

    if(res.status == 404){
    setPosition('')
      setAlertError(true)
      props.isClose(false)
      setResponse(data.msg)
    }
    else{
    setPosition('')
      props.refreshDrawer()
      props.isClose(false)
      setAlertSuccess(true)
      setResponse(data.msg)  
    }

    }

    const deleteHandler = async (Id: string) => {
        const res = await fetch(`/api/admin/positions/delete?id=${Id}`)
        const data = await res.json()

        if(res.status === 200){
        props.refreshDrawer()
      props.isClose(false)
      setAlertSuccess(true)
      setResponse(data.msg) 
        }
        
    }
  return (
    <>
    <Flex p='5'>
    <Modal isOpen={props.isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader>
      <Center>Positions</Center></ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
      <>{props.positions.length == 0 ?  <Text>No Positions added yet</Text> : 
      <>{props.positions.map((ele: Position) => {
        
        return (
            <>
            <Flex  p='1' borderRadius='2px' mb='2' key={props.positions.indexOf(ele)}>
                <Box w='80%'>
                    <Text fontSize={{lg: '20px'}} fontFamily='cursive'>{ele.name}</Text>
                </Box>
                <Center w='20%' p='2'>
                <Icon mr={{base: '10px', md:'20px'}} as={FaEdit} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => {  setIsOpen(true) 
                  setId(ele.id) 
                  props.isClose(false)
                  setPosition(ele.name)}
                  
                }/>
                    <Icon as={FaTrash} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => deleteHandler(ele.id)}/>
                </Center>
        
            
            </Flex>
     </>
        )
    })}
            </>} </>
        
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

<AlertComponent isAlertError={isAlertError} isAlertSuccess={isAlertSuccess} setAlertError={setAlertError} setAlertSuccess={setAlertSuccess} response={response}/>


    </Flex>

    <Modal isOpen={isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader>
      <Center>Update Position </Center>
    </ModalHeader>
    <ModalCloseButton onClick={() => setIsOpen(false)} />
    <ModalBody>
        <FormControl isRequired >
            <FormLabel htmlFor='position'>Position</FormLabel>
            <Input id='position' type='position' value={position} onChange={(e) => setPosition(e.target.value)} />
        </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button disabled={inputCheck} bg='#e8e8e8' mr={3} onClick={() => {
          setIsOpen(false)
          submitHandler()
      }}>
        Submit
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal> 
    </>
  )
}


export default PositionList;
