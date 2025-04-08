import {
  Button,
  HStack,
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

const TableLeads = () => {
  return (
    <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
      <Thead bg={"#4682B4"} borderBottom={"none"}>
        <Tr borderBottom={"2px solid #4682B4"}>
          <Th color={"white"}>
            <Text>Лид</Text>
          </Th>
          <Th color={"white"}>
            <Text>Тип звонка</Text>
          </Th>
          <Th color={"white"}>
            <Text>Статус звонка</Text>
          </Th>
          <Th color={"white"}>
            <Text>Стадия</Text>
          </Th>
          <Th color={"white"}>
            <Text>Дата создания</Text>
          </Th>
          <Th color={"white"}>
            <Text>Ответственный</Text>
          </Th>
          <Th color={"white"}>
            <Text></Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr color={"black"}>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>8 800 555 35 35</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Входящий</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Пропущен</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <VStack align={"flex-start"} gap={"2px"}>
              <HStack width={"100%"} gap={0}>
                <Stack
                  height={"10px"}
                  width={"100%"}
                  border={"1px solid #4682B4"}
                  borderRadius={"4px"}
                  bg={"#4682B4"}
                ></Stack>
                <Stack
                  height={"10px"}
                  width={"100%"}
                  border={"1px solid #4682B4"}
                  borderRadius={"4px"}
                ></Stack>
                <Stack
                  height={"10px"}
                  width={"100%"}
                  border={"1px solid #4682B4"}
                  borderRadius={"4px"}
                ></Stack>
                <Stack
                  height={"10px"}
                  width={"100%"}
                  border={"1px solid #4682B4"}
                  borderRadius={"4px"}
                ></Stack>
              </HStack>

              <Text>Новый лид</Text>
            </VStack>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>10.10.2022</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Фамилия Имя</Text>
          </Td>
          <Td width={"min-content"}>
            <HStack justify={"center"}>
              <Button
                boxShadow={"-2px 2px 0 0 #4682B4"}
                borderRadius={"0px"}
                border={"1px solid #4682B4"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "#4682B4", color: "white" }}
                flexShrink={0}
              >
                <Text>Подробнее</Text>
              </Button>
            </HStack>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TableLeads;
