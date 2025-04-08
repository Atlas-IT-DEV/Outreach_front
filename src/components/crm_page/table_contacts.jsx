import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const TableContacts = () => {
  return (
    <Table
      width={"100%"}
      padding={"10px"}
      border={"2px solid #4682B4"}
    >
      <Thead bg={"#4682B4"} borderBottom={"none"}>
        <Tr borderBottom={"2px solid #4682B4"}>
          <Th color={"white"}>
            <Text>ID</Text>
          </Th>
          <Th color={"white"}>
            <Text>ФИО</Text>
          </Th>
          <Th color={"white"}>
            <Text>Телефон</Text>
          </Th>
          <Th color={"white"}>
            <Text>Компания</Text>
          </Th>
          <Th color={"white"}>
            <Text>email</Text>
          </Th>
          <Th color={"white"}>
            <Text>ИНН</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr color={"black"}>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>1</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Фамилия Имя ОТчество</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>8 800 555 35 35</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>ООО Компания</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>mailname@mail.ru</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>12345678901</Text>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TableContacts;
