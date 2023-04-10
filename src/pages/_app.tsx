import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import type { AppProps } from "next/app";

import Header from "../layout/header/Header";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
};
export default App;
