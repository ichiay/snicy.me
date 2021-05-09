import React, { useMemo, useState } from "react";
import {
  Heading,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Box,
} from "@chakra-ui/react";

import Container from "../components/Container";
import BlogTile from "../components/BlogTile";

import { SearchIcon } from "@chakra-ui/icons";
import { BlogMeta } from "src/types/blog";
import { getBlogMetas } from "src/lib/blog/getBlogPosts";
import Head from "src/components/Head";

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
      <Head title="snicy.me" />
      <Container>
        <Stack
          as="main"
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
            <Stack alignItems="center" mb={8} w="100%">
              <Heading
                letterSpacing="tight"
                as="h1"
                size="4xl"
                mb={6}
                fontFamily="Montserrat"
              >
                snicy.me
              </Heading>
              <Text fontSize="sm" whiteSpace="pre-wrap" align="center">
                {
                  "It ’s working, so it ’s okay, I guess so XD\n動いてるからおk、しらんけど XD"
                }
              </Text>
              <Text fontSize="sm"></Text>
            </Stack>
            <InputGroup w="100%">
              <Input
                aria-label="Search by title"
                placeholder="Search by title"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <InputRightElement>
                <SearchIcon color="gray.300" />
              </InputRightElement>
            </InputGroup>
            <Text mb={8} align="right" w="100%" px={2} color="#999999">
              {filteredMetas.length} posts
            </Text>
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
