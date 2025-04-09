import {
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

const TableBase = () => {
  return (
    <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
      <Thead bg={"#4682B4"} borderBottom={"none"}>
        <Tr borderBottom={"2px solid #4682B4"}>
          <Th color={"white"}>
            <Text>Дата</Text>
          </Th>
          <Th color={"white"}>
            <Text>Сегмент</Text>
          </Th>
          <Th color={"white"}>
            <Text>ФИО</Text>
          </Th>
          <Th color={"white"}>
            <Text>Компания</Text>
          </Th>
          <Th color={"white"}>
            <Text>ИНН</Text>
          </Th>
          <Th color={"white"}>
            <Text>Добавить в СРМ</Text>
          </Th>
          <Th color={"white"}>
            <Text>Автор загрузки</Text>
          </Th>
          <Th color={"white"}>
            <Text>Номер телефона</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr color={"black"}>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>22.02.2022</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>База название</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Фамилия Имя Отчество</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>ООО Компания</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>12345678901</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            {/* временный VStack */}
            <VStack>
              <Stack
                cursor={"pointer"}
                color={"black"}
                bg={"rgba(121, 228, 155, 1)"}
                borderRadius={"4px"}
                padding={"4px 10px"}
              >
                <Text>Добавлено в СРМ</Text>
              </Stack>
              <Stack
                cursor={"pointer"}
                color={"white"}
                bg={"rgba(89, 89, 89, 1)"}
                borderRadius={"4px"}
                padding={"4px 10px"}
              >
                <Text>Добавить в СРМ</Text>
              </Stack>
            </VStack>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Фамилия Имя</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>+78005553535</Text>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TableBase;
