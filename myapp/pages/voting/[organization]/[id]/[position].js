import {  useEffect, useState} from 'react';
import {FaDownload} from 'react-icons/fa';
import {withRouter} from 'next/router';
import {Box, Text, Icon, useDisclosure, HStack, Table, TableContainer, Tr, Td, Th, Tbody, Tfoot, Thead} from '@chakra-ui/react';
import { useCounter } from '../../../../services/state';

const Posts = ({router}) => {
  const [state, actions] = useCounter();

  return (
      <>
    Working
    </>


  )
}


export default withRouter(Posts);
