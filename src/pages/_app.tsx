import "../../styles/globals.scss";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import React from "react";
import client from "src/graphql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default MyApp;
