import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import readXlsxFile from "read-excel-file";

import ConfirmationNotSubmitted from "~/components/ConfirmationNotSubmitted";
import Header from "~/components/Header";
import { CustomCheckbox } from "~/components/UI/checkbox/custom/CustomCheckbox";

const Index: NextPage = () => {
  const [file, setFile] = useState<File>();
  const [rawExcel, setRawExcel] = useState<Student[]>();
  const [isSubmitted, setIsSubmitted] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const finalRef = useRef();

  const [listChecked, setListChecked] = useState<Student[]>([]);

  function formInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null) {
      return;
    }

    readXlsxFile(event.target.files[0], { schema }).then(({ rows, errors }) => {
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
    });
  }

  return (
    <>
      <Head>
        <title>Upload File</title>
      </Head>
      <Flex minH="100vh" flexDir="column">
        <Container maxW="5xl" mt="7">
          <Header />

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
            <TableContainer mt="15px">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>
                      <CustomCheckbox
                        isChecked={listChecked.length === rawExcel.length}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            setListChecked(rawExcel);
                          }
                          if (!isChecked) {
                            setListChecked([]);
                          }
                        }}
                      />
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
                        <CustomCheckbox
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
                onClick={() => {
                  setIsSubmitted(true);
                  console.log(listChecked);
                }}
              >
                Submit
              </Button>
            </HStack>
          )}
        </Container>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Whoops!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Ada sesuatu yang salah. Silakan cek kembali file yang Anda
                upload. Pastikan format data sesuai dengan yang disediakan.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Coba Lagi
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default Index;

const schema = {
  Nama: {
    prop: "name",
    type: String,
    required: true,
  },
  "Tanggal Lahir": {
    prop: "birthDate",
    type: String,
    required: true,
  },
  "Tahun Lahir": {
    prop: "birthYear",
    type: Number,
    required: true,
  },
  Hobi: {
    prop: "hobby",
    type: String,
    required: true,
  },
  Alamat: {
    prop: "address",
    type: String,
    required: true,
  },
  Kelas: {
    prop: "class",
    type: String,
    required: true,
  },
  Sekolah: {
    prop: "school",
    type: String,
    required: true,
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
