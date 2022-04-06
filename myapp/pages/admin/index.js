import {  useEffect, useState } from 'react';
import Link from "next/link";
import router from 'next/router';
import { useCounter } from '../../services/state';
import { Box } from '@chakra-ui/react';
import AddPosition from '../../components/admin/positions/addPosition';
import PositionList from '../../components/admin/positions/listPositions';
import AddNominee from '../../components/admin/nominees/addNominees';
import NomineesList from '../../components/admin/nominees/listNominees';
import ClearNominees from '../../components/admin/nominees/clearNominees';
import GenerateCode from '../../components/admin/codes/generate';
import CodeList from '../../components/admin/codes/listCodes';
import GenerateLink from '../../components/admin/election/generateLink';

const admin = () => {
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
    // console.log(state.listNomineeModal)
  return (
    <>
    <Box>
    {state.listNomineeModal ? <NomineesList isOpen={state.listNomineeModal} isClose={actions.listNominees} positions={state.positions} user={state.user} nominees={state.nominees} refreshDrawer={actions.refreshDrawer} /> : <></> }
    {state.listCodesModal ? <CodeList isOpen={state.listCodesModal} isClose={actions.listCodesModal} codes={state.codes} user={state.user} refreshDrawer={actions.refreshDrawer} /> : <></> }
    <AddPosition isOpen={state.addPositionModal} isClose={actions.addPosition} user={state.user} getPositions={actions.getPositions} refreshDrawer={actions.refreshDrawer}/>
    <PositionList isOpen={state.listPositionModal} isClose={actions.listPositions} user={state.user} positions={state.positions} refreshDrawer={actions.refreshDrawer}/>
    <AddNominee isOpen={state.addNomineeModal} listNomineeModal={actions.listNominees} isClose={actions.addNominee} user={state.user} positions={state.positions} refreshDrawer={actions.refreshDrawer}/>
    <ClearNominees clearNominees={actions.clearNominees} isOpen={state.clearNomineesModal} refreshDrawer={actions.refreshDrawer}/>
    <GenerateLink isClose={actions.generateLink} isOpen={state.generateLinkModal} user={state.user} />
    <GenerateCode generateCode={actions.generateCode} isOpen={state.generateCodeModal} refreshDrawer={actions.refreshDrawer} user={state.user} />
    </Box>
    
    </>
  )
}


export default admin;
