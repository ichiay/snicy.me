import React from "react";
import { parseISO, format } from "date-fns";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import Container from "../components/Container";
import Head from "../components/Head";
import { BlogMeta } from "src/types/blog";

type staticProps = {
  meta: BlogMeta;
};

const BlogLayout: React.FC<staticProps> = ({ children, meta }) => {
  const { colorMode } = useColorMode();
  const textColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  const router = useRouter();
  const slug = router.asPath.replace("/blog", "");
  return (
    <Container>
      <Head title={`${meta.slug} | Shinichi Yamashita`} noIndex={meta.draft}>
        <link rel="canonical" href={"/blog/" + meta.slug} />
      </Head>

      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
        w="100%"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {meta.title}
          </Heading>
          <Flex
            justify="space-between"
            align={["initial", "center"]}
            direction={["column", "row"]}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex align="center">
              <Avatar
                size="xs"
                name="Shinichi Yamashita"
                src="/images/avater.jpg"
                mr={2}
              />
              <Text fontSize="sm" color={textColor[colorMode]}>
                {"Shinichi Yamashita / "}
                {format(parseISO(meta.createdAt), "MMMM dd, yyyy")}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
              {/* {meta.readingTime.text} */}
            </Text>
          </Flex>
        </Flex>
        {children}
      </Stack>
    </Container>
  );
};

export default BlogLayout;
