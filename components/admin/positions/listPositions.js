import {  useEffect, useState} from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa'
import { Flex, Box, Text, Icon, Button, FormControl, FormLabel, Input,  Modal, ModalBody, 
    ModalHeader,  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure} from '@chakra-ui/react';
import AlertComponent from '../../alert';

const PositionList = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [position, setPosition] = useState('');
    const [id, setId] = useState('');
    const [inputCheck, setInputCheck] = useState(false)
    const [response, setResponse] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    
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

    const deleteHandler = async (Id) => {
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
    <ModalHeader align='center'>Positions</ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
      <>{props.positions.length == 0 ?  <Text>No Positions added yet</Text> : 
      <>{props.positions.map((ele) => {
        
        return (
            <>
            <Flex  p='1' borderRadius='2px' mb='2' key={props.positions.indexOf(ele)}>
                <Box w='80%'>
                    <Text fontSize={{lg: '20px'}} fontFamily='cursive'>{ele.name}</Text>
                </Box>
                <Box w='20%' align='center' p='2'>
                <Icon mr={{base: '10px', md:'20px'}} as={FaEdit} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => {  setIsOpen(true) 
                  setId(ele.id) 
                  props.isClose(false)
                  setPosition(ele.name)}
                  
                }/>
                    <Icon as={FaTrash} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => deleteHandler(ele.id)}/>
                </Box>
        
            
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
    <ModalHeader align='center'>Update Position </ModalHeader>
    <ModalCloseButton onClick={(e) => setIsOpen(false)} />
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
