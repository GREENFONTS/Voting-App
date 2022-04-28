import {  useEffect } from 'react';
import router from 'next/router';
import Link from 'next/link'
import { useCounter } from '../../services/state';
import { Box, Container, Text, Flex, Button, Image } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import Tilt from 'react-parallax-tilt'
import AddPosition from '../../components/admin/positions/addPosition';
import PositionList from '../../components/admin/positions/listPositions';
import AddNominee from '../../components/admin/nominees/addNominees';
import NomineesList from '../../components/admin/nominees/listNominees';
import ClearNominees from '../../components/admin/nominees/clearNominees';
import GenerateCode from '../../components/admin/codes/generate';
import CodeList from '../../components/admin/codes/listCodes';
import GenerateLink from '../../components/admin/election/generateLink';
import EndElection from '../../components/admin/election/endElection';
import ShowResults from '../../components/admin/election/showResults';
import ResetVotes from '../../components/admin/election/resetVotes';


const Admin = () => {
    const [state, actions] = useCounter();

    useEffect(async () => {
        let token = JSON.parse(localStorage.getItem('token'))
        let users = JSON.parse(localStorage.getItem('user'))
        
        if(token === null){
          router.push('/login')
        }
        else{
          const res = await fetch(`/api/admin/?token=${token}`);
          const data = await res.json()
          if(res.status === 403){            
            localStorage.setItem('user', null)
            router.push('/login')
        } else if (data.email === users.email){
          actions.addUser(users)
        }
        }
        
    }, [])

    if(state.listNomineeModal || state.listCodesModal || state.showResultsModal){
      actions.landingPage(false)
    }
    else{
      actions.landingPage(true)
    }

  return (
    <>

    <Box>
      {
        state.landingPage ? 
    <Container maxW='container.xl' w='100%' h='calc(100vh - 80px)' padding='10px'>
            <Box display={{md: 'flex'}} py='8%' my='2%' borderRight='1px' borderTop='1px' borderColor='gray.200' boxShadow='base' overflowY='scroll' sx={{
                '&::-webkit-scrollbar': {
                    width: '1px',
                    borderRadius: '8px',
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '8px',
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
            }}>
                <Bounce left>
                    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                        <Box h={{ base: '150px', md: '250px', lg: '350px' }} ml='5' align='center'>
                            <Image src='/landing.png' w='inherit' h='inherit' alt='Welcome' />
                        </Box >
                    </Tilt>
                </Bounce>
                 <Box align='center' justify='center'  p={4} w={{ base: '95%', md: '50%', lg: '45%' }}>
                    <Box p={8} wrap='wrap' align='center' justify='center'>
                        <Text textAlign='center' fontStyle='italic' fontFamily='Georgia' p='5' fontSize={{ base: '25px', md: '35px', lg: '40px' }}>Hello {state.user === null || undefined ? " " : state.user.userName}</Text>
                        <Text textAlign='center' fontSize={{ base: '14px', md: '16px', lg: '18px' }} fontFamily='Georgia'>Welcome to your dashboard😊</Text>
                    </Box>
                    
                </Box>
            </Box >
        </Container > : <></>
        
          }
        <>
        {state.listNomineeModal ? <NomineesList isOpen={state.listNomineeModal} isClose={actions.listNominees} positions={state.positions} user={state.user} nominees={state.nominees} refreshDrawer={actions.refreshDrawer} /> : <></> }
    {state.listCodesModal ? <CodeList isOpen={state.listCodesModal} isClose={actions.listCodesModal} codes={state.codes} user={state.user} refreshDrawer={actions.refreshDrawer} /> : <></> }
    {state.showResultsModal ? <ShowResults isOpen={state.showResultsModal}  positions={state.positions} user={state.user} nominees={state.nominees} /> : <></> }
    <AddPosition isOpen={state.addPositionModal} isClose={actions.addPosition} user={state.user} getPositions={actions.getPositions}  getNominees={actions.getNominees}/> 
    <PositionList isOpen={state.listPositionModal} isClose={actions.listPositions} user={state.user} positions={state.positions} refreshDrawer={actions.refreshDrawer}/>
    <AddNominee isOpen={state.addNomineeModal} listNomineeModal={actions.listNominees} positions={state.positions} isClose={actions.addNominee} user={state.user} getNominees={actions.getNominees} />
    <ClearNominees clearNominees={actions.clearNominees} isOpen={state.clearNomineesModal} refreshDrawer={actions.refreshDrawer} user={state.user}/>
    <GenerateLink isClose={actions.generateLink} isOpen={state.generateLinkModal} user={state.user} />
    <GenerateCode generateCode={actions.generateCode} isOpen={state.generateCodeModal} refreshDrawer={actions.refreshDrawer} user={state.user} />
    <EndElection electionState={state.electionState} endElection={actions.electionState} user={state.user} isClose={actions.endElectionModal} refreshDrawer={actions.refreshDrawer} isOpen={state.endElectionModal}/>
    <ResetVotes user={state.user} isClose={actions.resetVotes} refreshDrawer={actions.refreshDrawer} isOpen={state.resetVotesModal}/></>
    
    
    </Box>
    
    </>
  )
}


export default Admin;
