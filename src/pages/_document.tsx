import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="ko">
            <Head>
                <link
                    href="https://webfontworld.github.io/gmarket/GmarketSans.css"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
