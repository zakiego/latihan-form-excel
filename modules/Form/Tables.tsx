import {
  Button,
  HStack,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

import { CustomCheckbox } from "~/components/UI/checkbox/custom/CustomCheckbox";

import { Student } from "./types";

type TableProps = {
  rawExcel: Student[];
  setIsSubmitted: (isSubmitted: boolean) => void;
  listChecked: Student[];
  setListChecked: (listChecked: Student[]) => void;
};

export const Tables = ({
  rawExcel,
  setIsSubmitted,
  listChecked,
  setListChecked,
}: TableProps) => {
  return (
    <>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
    </>
  );
};
