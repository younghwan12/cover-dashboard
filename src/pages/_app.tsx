import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import type { AppProps } from "next/app";
import Header from "../layout/header/Header";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import getCurrentUser from "@/actions/getCurrentUser";
import { useEffect } from "react";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const router = useRouter();

    // `Header` 컴포넌트의 렌더링 여부를 결정하는 변수
    const shouldRenderHeader =
        router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/findUserId" &&
        router.pathname !== "/lostPassword";

    return (
        <>
            <Provider store={store}>
                <SessionProvider session={session}>
                    {shouldRenderHeader && <Header />}
                    <Component {...pageProps} />
                </SessionProvider>
            </Provider>
        </>
    );
};

export default App;
