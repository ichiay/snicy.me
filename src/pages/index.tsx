import React, { useMemo, useState } from 'react';
import { Heading, Flex, Stack, Text, Box } from '@chakra-ui/react';

import Container from '../components/Container';

import Head from 'src/components/Head';

type staticProps = {};

const Index: React.FC<staticProps> = ({}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <Head title='snicy.me' />
      <Container>
        <Stack
          as='main'
          justifyContent='center'
          alignItems='flex-start'
          m='0 auto 4rem auto'
          maxWidth='700px'
        >
          <Flex
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='flex-start'
            maxWidth='700px'
            px={4}
          >
            <Stack alignItems='center' mb={8} w='100%'>
              <Heading
                letterSpacing='tight'
                as='h1'
                size='4xl'
                mb={6}
                fontFamily='Montserrat'
              >
                snicy.me
              </Heading>
              <Text fontSize='sm' whiteSpace='pre-wrap' align='center'>
                {
                  'プログラム? 動いてるからおk、しらんけど XD\nProgram? It ’s working, so it ’s okay, I guess so XD'
                }
              </Text>
              <Text fontSize='sm'></Text>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Index;
