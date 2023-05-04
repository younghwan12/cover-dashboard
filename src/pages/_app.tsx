import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
// import "moment/locale/ko";

import "primereact/resources/themes/lara-light-indigo/theme.css";
// 한글
import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>PMS helpdesk</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/* <SessionProvider session={session}> */}
                    <ConfigProvider locale={koKR}>
                        <Component {...pageProps} />
                    </ConfigProvider>
                    {/* </SessionProvider> */}
                </PersistGate>
            </Provider>
        </>
    );
};

export default App;
