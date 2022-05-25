import "styles/globals.scss";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import client from "src/graphql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Amiibo memory card game | Credimi</title>
        <meta name="description" content="Author Marco Rigamonti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className="container">
          <h1 className="title">Amiibo memory card game</h1>

          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </div>
      </div>
    </>
  );
}

export default MyApp;
