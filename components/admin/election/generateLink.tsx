import {  useState } from 'react';
import Link from 'next/link'
import { Flex, Icon, Box, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalContent, useDisclosure, Center} from '@chakra-ui/react';
import {MdFileCopy} from 'react-icons/md';
import {TiTick} from 'react-icons/ti';

const GenerateLink = (props) => {
let url = ''
if(process.env.NODE_ENV == 'development'){
  url = 'http://localhost:3000/voting'
}
else{
  url = 'https://vote-fast.herokuapp.com/voting'
}
    const { onOpen, onClose } = useDisclosure();
    const [copy, setCopy] = useState<boolean>(false)
    let link = null 
    if(props.user){
       link  = `${url}/${props.user.organization}/${props.user.id}`
    }
    async function copyToClipboard() {
        try {
          await navigator.clipboard.writeText(link);
          console.log('Page URL copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }


  return (
    <>
    <Flex p='5'>
    <Modal size='3xl' isOpen={props.isOpen} onClose={onClose}>
   <ModalContent>
    <ModalHeader>
      <Center>Election Link</Center>
    </ModalHeader>
    <ModalCloseButton onClick={(e) => {props.isClose(false)
    setCopy(false)}} />
    <ModalBody>
      <Center>
        <Box>
            <Flex>
                <Box border='1px solid black' borderRadius='2' borderRight='0px white' p='3' _hover={{ transform: 'scale(1.15)', cursor: "pointer" }}>
                   {props.user ? <Link  href={link} >{link}</Link> : <></>}
                </Box>
                <Box border='1px solid black'  borderRadius='2' p='2'>
                   {!copy ? <Icon fontSize='20px' as={MdFileCopy} onClick={() => {setCopy(true)
                copyToClipboard()}}/> : <Icon fontSize='25px' as={TiTick} />}
                </Box>
            </Flex>
        </Box>
        </Center>
    </ModalBody>
  </ModalContent>
</Modal> 

    </Flex>
    </>
  )
}


export default GenerateLink;
