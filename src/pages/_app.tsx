import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";

import "primereact/resources/themes/lara-light-indigo/theme.css";

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
                    <Component {...pageProps} />
                    {/* </SessionProvider> */}
                </PersistGate>
            </Provider>
        </>
    );
};

export default App;
