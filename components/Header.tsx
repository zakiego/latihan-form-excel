import { Box, Flex, Heading, Icon, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { GoMarkGithub } from "react-icons/go";
import { MdOutlineUpload } from "react-icons/md";

const Header = () => {
  return (
    <>
      <Flex>
        <Flex alignItems="center">
          <Icon as={MdOutlineUpload} w={10} h={10} mr="2" opacity="16%" />
          <Box>
            <Heading size="md">Upload Data</Heading>
            <Text opacity="64%">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Box>
        </Flex>
        <Spacer />
        <a
          href="https://github.com/zakiego/latihan-form-excel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            as={GoMarkGithub}
            height="10"
            width="10"
            opacity="70%"
            cursor="pointer"
            _hover={{ opacity: "90%" }}
          />
        </a>
      </Flex>

      <Link href="/static/example.xlsx" passHref>
        <Box
          alignSelf="a"
          mt="6"
          bg="yellow.500"
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
