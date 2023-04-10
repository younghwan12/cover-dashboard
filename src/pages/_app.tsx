import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import type { AppProps } from "next/app";

import Header from "../layout/header/Header";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Provider store={store}>
                <Header />
                <Component {...pageProps} />
            </Provider>
        </>
    );
};
export default App;
