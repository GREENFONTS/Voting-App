import '../styles/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider >
    <Header />
          <Component {...pageProps} />
        </ChakraProvider>
}

export default MyApp
