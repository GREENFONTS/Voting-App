import "../styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import store from "../redux/store";
import { Provider } from "react-redux";
import { NextPage } from "next";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../services/cache";
import Layout from "../components/shared/Layout";

interface RootProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: NextPage<RootProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: RootProps) => {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ChakraProvider>
          <Layout>
            <Component {...(pageProps || {})} />
          </Layout>
        </ChakraProvider>
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;
