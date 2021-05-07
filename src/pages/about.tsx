import Head from "next/head";
import { useColorMode, Heading, Text, Flex, Stack } from "@chakra-ui/react";

import Container from "src/components/Container";

const About = () => {
  const { colorMode } = useColorMode();
  const colorSecondary = {
    light: "gray.700",
    dark: "gray.400",
  };
  return (
    <Container>
      <Head>
        <title>Home - Shinichi Yamashita</title>
      </Head>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading mb={2}>Shinichi Yamashita</Heading>
          <Text color={colorSecondary[colorMode]}>description for me.</Text>
        </Flex>
      </Stack>
    </Container>
  );
};

export default About;
