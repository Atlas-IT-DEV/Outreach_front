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

const TableJournal = () => {
  return (
    <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
      <Thead bg={"#4682B4"} borderBottom={"none"}>
        <Tr borderBottom={"2px solid #4682B4"}>
          <Th color={"white"}>
            <Text>ID</Text>
          </Th>
          <Th color={"white"}>
            <Text>email</Text>
          </Th>
          <Th color={"white"}>
            <Text>Название шаблона</Text>
          </Th>
          <Th color={"white"}>
            <Text>Статус отправки</Text>
          </Th>
          <Th color={"white"}>
            <Text>Прочитано</Text>
          </Th>
          <Th color={"white"}>
            <Text>Компания</Text>
          </Th>
          <Th color={"white"}>
            <Text>Добавить в СРМ</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr color={"black"}>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>1121</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>mailname@mail.ru</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Название шаблона</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Отправлено</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Не прочитано</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>ООО компания</Text>
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
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TableJournal;
