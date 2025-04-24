import {
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TableReport = () => {
  return (
    <>
      <Text width={"100%"} color={"black"} fontWeight={"600"}>
        Все данные
      </Text>
      <HStack
        width={"100%"}
        overflow={"hidden"}
        overflowX={"scroll"}
        paddingBottom={"8px"}
      >
        <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
          <Thead bg={"#4682B4"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid #4682B4"}>
              <Th color={"white"}>
                <Text>Название скрипта</Text>
              </Th>
              <Th color={"white"}>
                <Text>Автор скрипта</Text>
              </Th>
              <Th color={"white"}>
                <Text>Всего звонков</Text>
              </Th>
              <Th color={"white"}>
                <Text>Сбросили</Text>
              </Th>
              <Th color={"white"}>
                <Text>Успешно</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr color={"black"}>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>АКЦИЯ</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>Автор</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>30</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>20</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>10</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </HStack>
    </>
  );
};

export default TableReport;
