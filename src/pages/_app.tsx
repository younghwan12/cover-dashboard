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

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const router = useRouter();

    // `Header` 컴포넌트의 렌더링 여부를 결정하는 변수
    // const shouldRenderHeader =
    //     router.pathname !== "/login" &&
    //     router.pathname !== "/register" &&
    //     router.pathname !== "/findUserId" &&
    //     router.pathname !== "/lostPassword";

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SessionProvider session={session}>
                        {/* {shouldRenderHeader && <Header />} */}
                        {/* <Header /> */}
                        <Component {...pageProps} />
                    </SessionProvider>
                </PersistGate>
            </Provider>
        </>
    );
};

export default App;
