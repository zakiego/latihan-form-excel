import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlineUpload } from "react-icons/md";

const Header = () => {
  return (
    <>
      <Flex alignItems="center">
        <Icon as={MdOutlineUpload} w={10} h={10} mr="2" opacity="16%" />
        <Box>
          <Heading size="md">Upload Data</Heading>
          <Text opacity="64%">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
      </Flex>

      <Link href="/static/example.xlsx" passHref>
        <Box
          alignSelf="a"
          mt="6"
          bg="blue.500"
          w="max-content"
          px="2"
          rounded="sm"
          color="white"
          cursor="pointer"
        >
          <Text as="a">You can download sampe file here</Text>
        </Box>
      </Link>
    </>
  );
};

export default Header;
