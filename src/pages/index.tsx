import React, { useMemo, useState } from "react";
import Head from "next/head";
import {
  Heading,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import Container from "../components/Container";
import BlogTile from "../components/BlogTile";

import { SearchIcon } from "@chakra-ui/icons";
import { BlogMeta } from "src/types/blog";
import { getBlogMetas } from "src/lib/blog/getBlogPosts";

type staticProps = {
  metas: BlogMeta[];
};

const Index: React.FC<staticProps> = ({ metas }) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredMetas = useMemo(
    () =>
      metas
        .sort(
          (a, b) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        )
        .filter((meta) =>
          meta.title.toLowerCase().includes(searchValue.toLowerCase())
        ),
    [metas, searchValue]
  );

  return (
    <>
      <Head>
        <title>Shinichi Yamashita :: Blog</title>
      </Head>
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            px={4}
          >
            <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
              Blog ({metas.length} posts)
            </Heading>
            <InputGroup mb={4} mr={4} w="100%">
              <Input
                aria-label="Search by title"
                placeholder="Search by title"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <InputRightElement>
                <SearchIcon color="gray.300" />
              </InputRightElement>
            </InputGroup>
            {!filteredMetas.length && "No metas found :("}
            {filteredMetas.map((meta) => (
              <BlogTile key={meta.title} {...meta} />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const metas = await getBlogMetas();

  return { props: { metas } };
};

export default Index;
