import { Flex, Box, useColorMode, Link } from '@chakra-ui/react';

const thisYear = new Date().getFullYear();

const Footer = ({}) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <footer>
        <Flex
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
          maxWidth='800px'
          minWidth='356px'
          width='100%'
          px={[2, 6, 6]}
          py={2}
          mt={8}
          mb={[0, 0, 8]}
          mx='auto'
        >
          <Box>
            <span>Copyright © 2020-{thisYear} </span>
            <Link href='https://twitter.com/snicyme'>@snicyme</Link>
            <span>. All Rights Reserved.</span>
          </Box>
        </Flex>
      </footer>
    </>
  );
};

export default Footer;
