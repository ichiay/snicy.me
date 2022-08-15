import {
  useColorMode,
  Heading,
  Text,
  Stack,
  Avatar,
  Link,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import { FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa';

import JsGravatar from '@gravatar/js';
import { useMemo } from 'react';
import Container from 'src/components/Container';
import Head from 'src/components/Head';

const About = () => {
  const { colorMode } = useColorMode();
  const colorSecondary = {
    light: 'gray.700',
    dark: 'gray.400',
  };

  const avaterUrl = useMemo(
    () =>
      JsGravatar({
        email: 'dev@snicy.me',
        size: 200,
        protocol: 'https',
        defaultImage: 'blank',
      }),
    [],
  );

  return (
    <Container>
      <Head title='About | Synichi Yamashita' />

      <Stack
        as='main'
        justifyContent='center'
        alignItems='flex-start'
        m='0 auto 4rem auto'
        maxWidth='700px'
        spacing={8}
        px={2}
      >
        <Stack w='100%' justifyContent='center' alignItems='center' spacing={4}>
          <Avatar src={avaterUrl} size='2xl' />
          <Heading fontFamily='Montserrat' mb={2} size='lg'>
            ヤマシタシンイチ (いチ)
          </Heading>
          <Heading fontFamily='Montserrat' mb={2} size='md'>
            Shinichi Yamashita (ichi)
          </Heading>
          <Stack isInline>
            <Link href='https://www.twitch.tv/ichiay' isExternal>
              <IconButton
                variant='ghost'
                fontSize='28px'
                aria-label='snicyme@twitch'
                icon={<FaTwitch />}
              />
            </Link>
            <Link href='https://twitter.com/ichiayay' isExternal>
              <IconButton
                variant='ghost'
                fontSize='28px'
                aria-label='snicyme@twitter'
                icon={<FaTwitter />}
              />
            </Link>
            <Link href='https://github.com/ichiay' isExternal>
              <IconButton
                variant='ghost'
                fontSize='28px'
                aria-label='snicyme@github'
                icon={<FaGithub />}
              />
            </Link>
          </Stack>
        </Stack>
        <Text color={colorSecondary[colorMode]} whiteSpace='pre-wrap'>
          {`とりあえず動けばそれでおkなプログラマーです。\n\n私のコードは自分では真面目に書いてますが穴だらけですので、ご使用の場合は加筆修正モリモリでご使用ください。\n\n夜はTwitchで”たいくつな”ゲーム配信をしていますので、時間を無駄にしたい方は歓迎します:)`}
        </Text>
        <Divider variant='dashed' borderWidth='2px' />
        <Text
          color={colorSecondary[colorMode]}
          whiteSpace='pre-wrap'
        >{`I'm a sloppy programmer.\n\nMy Program Code is a buggy, so if you want to use it, please modify it.\n\nWe broadcast games on Twitch at night, so if you want to waste your time, we welcome you :)`}</Text>
      </Stack>
    </Container>
  );
};

export default About;
