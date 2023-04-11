import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import type { AppProps } from "next/app";

import Header from "../layout/header/Header";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";

// import getCurrentUser from "./actions/getCurrentUser";

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    // const currentUser = await getCurrentUser();

    return (
        <>
            <Provider store={store}>
                {router.pathname !== "/login" && <Header />}
                <Component {...pageProps} />
            </Provider>
        </>
    );
};
export default App;
