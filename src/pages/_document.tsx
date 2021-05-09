import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja" prefix="og: http://ogp.me/ns#">
        <Head />
        <body>
          <ColorModeScript initialColorMode="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
