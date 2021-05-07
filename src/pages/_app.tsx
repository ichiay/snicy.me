import React from "react";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import customTheme from "src/styles/theme";
import { Global, css } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";

import { prismLightTheme, prismDarkTheme } from "../styles/prism";

const GlobalStyle: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          ${colorMode === "light" ? prismLightTheme : prismDarkTheme};
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === "light" ? "white" : "#171717"};
          }
        `}
      />
      {children}
    </>
  );
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
