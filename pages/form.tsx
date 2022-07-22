import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import readXlsxFile from "read-excel-file";

import {
  Header,
  ModalErrorInput,
  schema,
  Student,
  Tables,
} from "~/modules/Form";

const Index: NextPage = () => {
  const [file, setFile] = useState<File>();
  const [rawExcel, setRawExcel] = useState<Student[]>();
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [listChecked, setListChecked] = useState<Student[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const finalRef = useRef();

  function formInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null) {
      return;
    }

    readXlsxFile(event.target.files[0], { schema: schema }).then(
      ({ rows, errors }) => {
        if (errors.length !== 0) {
          onOpen();
          return;
        }

        if (event.target.files === null) {
          return;
        }

        setFile(event.target.files[0]);
        setRawExcel(rows as Student[]);
        setIsSubmitted(false);
      },
    );
  }

  return (
    <>
      <Head>
        <title>Upload File</title>
      </Head>
      <Flex minH="100vh" flexDir="column">
        <Container maxW="5xl" mt="7">
          <Header />

          {JSON.stringify(file?.name)}

          {file && (
            <Text mt="5">
              Status: {isSubmitted ? "Submitted" : "Not submitted yet"}
            </Text>
          )}

          <HStack mt="39px" bg="gray.50" py="21px" px="20px">
            <HStack>
              <FormControl>
                <Button
                  as={FormLabel}
                  htmlFor="file"
                  colorScheme="blue"
                  variant="outline"
                  cursor="pointer"
                >
                  Choose
                </Button>
                <VisuallyHiddenInput
                  accept=".xlsx"
                  id="file"
                  type="file"
                  onChange={formInputHandler}
                />
              </FormControl>
            </HStack>
            <Text>{file?.name}</Text>

            <Spacer />
            <Button colorScheme="blue">Import</Button>
          </HStack>

          {rawExcel && file && (
            <Text mt="23px" ml="5">
              Please select the parameter calculation that you will import
            </Text>
          )}

          {rawExcel && (
            <Tables
              rawExcel={rawExcel}
              setIsSubmitted={setIsSubmitted}
              listChecked={listChecked}
              setListChecked={setListChecked}
            />
          )}
        </Container>

        <ModalErrorInput isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
};

export default Index;
