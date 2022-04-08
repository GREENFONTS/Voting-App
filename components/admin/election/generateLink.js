import {  useEffect, useState } from 'react';
import Link from 'next/link'
import { Flex, Icon, Button, Box, Modal, ModalBody, ModalHeader, 
  ModalCloseButton, ModalContent,  ModalFooter, useDisclosure} from '@chakra-ui/react';
import {MdFileCopy} from 'react-icons/md';
import {TiTick} from 'react-icons/ti';
const GenerateLink = (props) => {
let url = ''
if(process.env.NODE_ENV == 'development'){
  url = 'http://localhost:3000/voting'
}
else{
  url = 'https://acol-elect.herokuapp.com'
}
    const { onOpen, onClose } = useDisclosure();
    const [copy, setCopy] = useState(false)
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
  {/* <ModalOverlay /> */}
   <ModalContent>
    <ModalHeader align='center'>Election Link</ModalHeader>
    <ModalCloseButton onClick={(e) => {props.isClose(false)
    setCopy(false)}} />
    <ModalBody align='center'>
        <Box>
            <Flex>
                <Box border='1px solid black' borderRadius='2' borderRight='0px white' p='3'>
                   {props.user ? <Link _hover={{ transform: 'scale(1.15)', cursor: "pointer" }} href={link}>{link}</Link> : <></>}
                </Box>
                <Box border='1px solid black'  borderRadius='2' p='2'>
                   {!copy ? <Icon fontSize='20px' as={MdFileCopy} onClick={() => {setCopy(true)
                copyToClipboard()}}/> : <Icon fontSize='25px' as={TiTick} />}
                </Box>
            </Flex>
        </Box>
    </ModalBody>
  </ModalContent>
</Modal> 

    </Flex>
    </>
  )
}


export default GenerateLink;
