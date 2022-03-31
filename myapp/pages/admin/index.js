import {  useEffect, useState } from 'react';
import Link from "next/link";
import router from 'next/router';
import { Flex} from '@chakra-ui/react';;
import { useCounter } from '../../services/state';
import AddPosition from '../../components/admin/positions/addPosition';
import PositionList from '../../components/admin/positions/listPositions';
import AddNominee from '../../components/admin/nominees/addNominees';

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

  return (
    <>
    <AddPosition isOpen={state.addPositionModal} isClose={actions.addPosition} user={state.user}/>
    <PositionList isOpen={state.listPositionModal} isClose={actions.listPositions} user={state.user} positions={state.positions} refreshDrawer={actions.refreshDrawer}/>
    <AddNominee isOpen={state.addNomineeModal} isClose={actions.addNominee} user={state.user} positions={state.positions} />
    </>
  )
}


export default admin;
