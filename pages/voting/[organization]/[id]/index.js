import {  useEffect, useState} from 'react';
import {FaDownload} from 'react-icons/fa';
import {withRouter} from 'next/router';
import Link from 'next/link'
import { useCounter } from '../../../../services/state';
import { Box,Text,Button,  useMediaQuery, Image, Center, FormControl, FormLabel, Input,Alert, CloseButton, AlertIcon} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';

const Voting = ({router}) => {
  const [state, actions] = useCounter();
  const [isLargerThan900] = useMediaQuery('(min-width: 800px)')
    const [isLesserThan900] = useMediaQuery('(max-width: 800px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const [code, setCode] = useState('');
    const [isRequired, setIsRequired] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null)
    const [organization, setOrganization] = useState('');
    const [id, setId] = useState('')
    
    useEffect(async () => {
      const queryValue = window.location.pathname.split('/').slice(2,)
      const userId = queryValue[1]
      setId(queryValue[1])
      setOrganization(queryValue[0])
        const res = await fetch(`/api/voting?id=${userId}`);
        const data = await res.json()
        let email = data.user

        const electionRes = await fetch('/api/voting/state', {
          method: 'POST',
          body: email
      }) 
      const electionState = await electionRes.json()
      actions.electionState(electionState.state)
      
        if(res.status == 404){
            router.push('/404.js')
        }
        if(res.status == 200){
            localStorage.setItem('admin', email) 

            const positionsRes = await fetch('/api/admin/positions/find', {
              method: 'POST',
              body: email
          }) 
          const positionData = await positionsRes.json()
          localStorage.setItem('positions', JSON.stringify(positionData))

          const nomineesRes = await fetch('/api/admin/nominees/find', {
              method: 'POST',
              body: email
          }) 
          const nomineesData = await nomineesRes.json()
          localStorage.setItem('nominees', JSON.stringify(nomineesData))

          // console.log(positionData, nomineesData)
        }
    }, [])

    useEffect(() => {
        if(code.length > 1){
            setIsRequired(false)
        }        
    }, [code])

    const submitHandler = async () => {
      let positions = []
      JSON.parse(localStorage.getItem('positions')).forEach((ele) => {
        positions.push(ele.name)
      })

      if(state.electionState == false){
        setAlertMessage('Voting has ended')
        setCode('')
        setIsRequired(true)
      }
      else{
        
        let email = localStorage.getItem('admin')
        const res = await fetch(`/api/voting/code/?code=${code}&user=${email}`)
        const data = await res.json()

        if(res.status == 404){
            setAlertMessage(data.msg)
            setCode('')
        }
        if(res.status == 200){
            localStorage.setItem('codeToken', data.token)
            router.push(`/voting/${organization}/${id}/${positions[0]}`)
            positions.shift()
            actions.getPositions(positions)
        }
      }
    }
 
  return (
      <>
    <Box w='100%' h='100vh'  bgGradient='linear(to-r, gray.200, white, gray.200)'>

    {isLargerThan900 && <Center h='90vh' w='100%'>
        <Box height={{ base: '230px', md: '300px', lg: '80vh' }} w='95%' display={{ md: 'flex'}} px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} alignSelf="center">
      
      <Box w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '75vh' }}>    
     
      <Fade right> <Bounce bottom>
      <Image src='/votingbg.png' alt='Topic' h={{ base: '200px', md: '250px', lg: '75vh' }}  width='100%' />    </Bounce>     
      </Fade>
        
         </Box>
         

         <Box w={{base: '100%', md: '5%'}} h={{ base: '200px', md: '250px', lg: '60vh' }}></Box>
         <Box   w={{base: '100%', md: '45%'}} h={{ base: '200px', md: '250px', lg: '50vh' }} mt={{lg: '12'}}>
              <Box align='center'>
                  <Text fontSize={{md: '40px', lg:'50px'}} color='black'>Welcome To <br/> {organization} <br/> Elections</Text>
              </Box>

              <Box mt='5'> 
              {alertMessage !== null ? <Alert status='error'> <AlertIcon />
                        {alertMessage}
                        <CloseButton position='absolute' right='8px' top='8px' onClick={(e) => setAlertMessage(null)} />
                    </Alert> : <></>}

                    {state.votingEnd  ? <Alert status='success'> <AlertIcon />
                      Thanks for Voting
                        <CloseButton position='absolute' right='8px' top='8px' onClick={(e) => actions.votingEnd(false)} />
                    </Alert> : <></>}

              <FormControl isRequired >
                    <FormLabel htmlFor='code' color='black'>Enter code to Vote: </FormLabel>
                    <Input id='code' type='text' value={code} onChange={(e) => setCode(e.target.value)} />
                    </FormControl>
              </Box>

              <Box mt='5'>
                       <Button id='button' isDisabled={isRequired} _hover={{ transform: 'scale(1.05)', cursor: "pointer" }} onClick={(e) => submitHandler()}>Submit</Button>
                </Box>
      </Box>
      
      </Box>
        
      
      </Center>}
    {isLesserThan900 && <Center h='100vh' w='100%'>
        <Box height='100vh' w='95%'  px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} alignSelf="center">
      
              <Box align='center' mb='3'>
                  <Text fontSize='35px'>Welcome To <br/> {organization}  <br/> Elections</Text>
              </Box>

              <Box h='35vh'>    
     
              <Fade right> <Bounce bottom>
              <Image src='/votingbg.png' alt='Topic' h='35vh'  width='100%' />    </Bounce>     
              </Fade>
       
        </Box>
        <Box h='2vh'></Box> 
        

              <Box mt='5'> 
              {alertMessage !== null ? <Alert status='error'> <AlertIcon />
                        {alertMessage}
                        <CloseButton position='absolute' right='8px' top='8px' onClick={(e) => setAlertMessage(null)} />
                    </Alert> : <></>}

                    {state.votingEnd  ? <Alert status='success'> <AlertIcon />
                      Thanks for Voting
                        <CloseButton position='absolute' right='8px' top='8px' onClick={(e) => actions.votingEnd(false)} />
                    </Alert> : <></>}

              <FormControl isRequired >
                    <FormLabel htmlFor='code'>Enter code to Vote: </FormLabel>
                    <Input id='code' type='text' value={code} onChange={(e) => setCode(e.target.value)} />
                    </FormControl>
              </Box>

              <Box mt='5'>
                       <Button id='button' isDisabled={isRequired} _hover={{ transform: 'scale(1.05)', cursor: "pointer" }} onClick={(e) => submitHandler()}>Submit</Button>
                </Box>
      
      </Box>
        
      
      </Center>

 }
 </Box>
    
    </>


  )
}


export default withRouter(Voting);
