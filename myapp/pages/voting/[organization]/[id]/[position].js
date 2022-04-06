import {  useEffect, useState} from 'react';
import {FaDownload} from 'react-icons/fa';
import {withRouter} from 'next/router';
import {Box, Text, Icon, useDisclosure, HStack, Table, TableContainer, Tr, Td, Th, Tbody, Tfoot, Thead} from '@chakra-ui/react';
import { useCounter } from '../../../../services/state';

const Posts = ({router}) => {
  const [state, actions] = useCounter();
  // console.log(localStorage)
  // let positions = JSON.parse(window.localStorage.getItem('positions'))
  // let nominees = JSON.parse(window.localStorage.getItem('nominees'))
  let admin = localStorage.getItem('admin')
  let token = localStorage.getItem('codeToken')
  let user = router.query

  useEffect(async() => {
    if(token === null){
      router.push(`/voting/${user.organization}/${user.id}`)
    }
    else{
      const res = await fetch(`/voting/auth/?token=${token}`);
      const data = await res.json()
      console.log(data)
      if(res.status === 403){            
        localStorage.setItem('admin', null)
        router.push(`/voting/${user.organization}/${user.id}`)
    } 
    }
  }, [])
  return (
      <>
    Working
    </>


  )
}


export default withRouter(Posts);
