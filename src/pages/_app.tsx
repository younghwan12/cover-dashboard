import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { Provider } from "react-redux";
import Header from "../layout/header/Header";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";

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
