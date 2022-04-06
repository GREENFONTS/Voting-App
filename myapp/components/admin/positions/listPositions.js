import {  useEffect, useState} from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa'
import { Flex, Box, Text, Icon, Alert, AlertIcon, CloseButton, Button, FormControl, FormLabel, Input,  Modal, ModalBody, 
    ModalHeader,  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure} from '@chakra-ui/react';

const PositionList = (props) => {

    const { onOpen, onClose } = useDisclosure();
    const [isAlertError, setAlertError] = useState(false);
    const [isAlertSuccess, setAlertSuccess] = useState(false);
    const [position, setPosition] = useState('');
    const [updateCheck, setUpdateCheck] = useState(false);
    const [inputCheck, setInputCheck] = useState(false)
    const [response, setResponse] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [positionName, setPositionName] = useState(null)
    
    useEffect(() => {
        if(position.length < 1){
          setInputCheck(true)
        }
        else{
            setInputCheck(false)
        }
      }, [position])
  
    const submitHandler = async () => {
      const res = await fetch('/api/admin/positions/update', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({positionName, position, user: props.user.email})
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
      props.isClose(false)
      setAlertSuccess(true)
      setResponse(data.msg)  
    }

    }

    const handleClose = () => {
      setAlertError(false)
      setAlertSuccess(false)
    }

    const deleteHandler = async (name) => {
        const res = await fetch(`/api/admin/positions/delete?position=${name}&user=${props.user.email}`)
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
  {/* <ModalOverlay /> */}
   <ModalContent>
    <ModalHeader align='center'>Positions</ModalHeader>
    <ModalCloseButton onClick={(e) => props.isClose(false)} />
    <ModalBody>
        <>{props.positions.map((ele) => {
            return (
                <>
                <Flex bg='#e9e9e9' p='1' borderRadius='2px' mb='2' key={props.positions.indexOf(ele)}>
                    <Box w='80%'>
                        <Text fontSize={{lg: '20px'}} fontFamily='cursive'>{ele.name}</Text>
                    </Box>
                    <Box w='20%' align='center' p='2'>
                    <Icon mr='20px' as={FaEdit} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => { setPositionName(ele.name)
                        setIsOpen(true) }
                    }/>
                        <Icon as={FaTrash} _hover={{ transform: 'scale(1.1)', cursor: "pointer" }} onClick={() => deleteHandler(ele.name)}/>
                    </Box>
            
                
                </Flex>
                {updateCheck ?
                <Flex p='1'>
                    <Box w='70%'>
                    <FormControl isRequired >
                    <FormLabel htmlFor='position'>Update Position</FormLabel>
                    <Input id='position' type='position' value={position} onChange={(e) => setPosition(e.target.value)} />
                    
                </FormControl>
                    </Box>
                <Box w='30%' align='center' p='2'>
                <br />
                <Button disabled={inputCheck} bg='#e8e8e8' mr={3} onClick={() => {setUpdateCheck(false)
                submitHandler()
      }}>
        Submit
      </Button></Box>
                
                </Flex>
                
                
         : <></>}
         </>
            )
        })}
            
                </>
                
            
        
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
{isAlertError ? <Alert status='error'> <AlertIcon />
                        {response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}

                    {isAlertSuccess ? <Alert status='success'> <AlertIcon />
                        {response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}


    </Flex>

    <Modal isOpen={isOpen} onClose={onClose}>
  {/* <ModalOverlay /> */}
   <ModalContent>
    <ModalHeader align='center'>Update Position - {positionName}</ModalHeader>
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
          submitHandler(positionName)
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
