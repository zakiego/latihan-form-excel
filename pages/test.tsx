import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { MdOutlineUpload } from "react-icons/md";
import readXlsxFile from "read-excel-file";

const Index: NextPage = () => {
  const [file, setFile] = useState<File>();
  const [rawExcel, setRawExcel] = useState<Student[]>();

  const [listChecked, setListChecked] = useState<Student[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files != null) {
      setFile(event.target.files[0]);
      readXlsxFile(event.target.files[0], { schema }).then((rows) => {
        setRawExcel(rows.rows as Student[]);
      });
    }
  }

  return (
    <>
      <Head>
        <title>Upload File</title>
      </Head>
      <Flex minH="100vh" flexDir="column">
        <Container maxW="5xl" mt="7">
          <Flex alignItems="center">
            <Icon as={MdOutlineUpload} w={10} h={10} mr="2" opacity="16%" />
            <Box>
              <Heading size="md">Upload Data</Heading>
              <Text opacity="64%">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </Box>
          </Flex>

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
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>
            <Text>{file?.name}</Text>

            <Spacer />
            <Button colorScheme="blue">Import</Button>
          </HStack>

          {file && (
            <Text mt="23px" ml="5">
              Please select the parameter calculation that you will import
            </Text>
          )}

          {rawExcel && (
            <TableContainer mt="15px">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>
                      <Box>
                        <Checkbox
                          as={Box}
                          isChecked={listChecked.length === rawExcel.length}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                              setListChecked(rawExcel);
                            }
                            if (!isChecked) {
                              setListChecked([]);
                            }
                          }}
                        />
                      </Box>
                    </Th>
                    <Th>Name</Th>
                    <Th>Birth Date</Th>
                    <Th>Birth Year</Th>
                    <Th>Hobby</Th>
                    <Th>Address</Th>
                    <Th>Class</Th>
                    <Th>School</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rawExcel.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <Checkbox
                          as={Box}
                          isChecked={listChecked.includes(item)}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                              setListChecked([...listChecked, item]);
                            }
                            if (!isChecked) {
                              setListChecked(
                                listChecked.filter((i) => i.name !== item.name),
                              );
                            }
                          }}
                        />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{item.birthDate}</Td>
                      <Td>{item.birthYear}</Td>
                      <Td>{item.hobby}</Td>
                      <Td>{item.address}</Td>
                      <Td>{item.class}</Td>
                      <Td>{item.school}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}

          {rawExcel && (
            <HStack mt="25px">
              <Spacer />
              <Button
                colorScheme="green"
                onClick={() => console.log(listChecked)}
              >
                Submit
              </Button>
            </HStack>
          )}
        </Container>
      </Flex>
    </>
  );
};

export default Index;

const schema = {
  Nama: {
    prop: "name",
    type: String,
  },
  "Tanggal Lahir": {
    prop: "birthDate",
    type: String,
  },
  "Tahun Lahir": {
    prop: "birthYear",
    type: Number,
  },
  Hobi: {
    prop: "hobby",
    type: String,
  },
  Alamat: {
    prop: "address",
    type: String,
  },
  Kelas: {
    prop: "class",
    type: String,
  },
  Sekolah: {
    prop: "school",
    type: String,
  },
};

export interface Student {
  name: string;
  birthYear: number;
  birthDate: number;
  hobby: string;
  address: string;
  class: string;
  school: string;
}
