import '../styles/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/Header';
import UserDetailsProvider from '../components/userDetailsProvider';

function MyApp({ Component, pageProps }) {
  return <ChakraProvider >
    <UserDetailsProvider>
          <Header />
          <Component {...pageProps} />
    </UserDetailsProvider>
   
      </ChakraProvider>
}

export default MyApp
