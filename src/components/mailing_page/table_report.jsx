import {
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
import { observer } from "mobx-react-lite";

const TableReport = observer(() => {
  return (
    <>
      <Text
        marginTop={"20px"}
        color={"black"}
        width={"100%"}
        fontWeight={"600"}
      >
        Все данные
      </Text>
      <HStack
        width={"100%"}
        overflow={"hidden"}
        overflowX={"scroll"}
        paddingBottom={"8px"}
      >
        <Table width={"100%"} padding={"10px"} border={"2px solid rgba(48, 141, 218, 1)"}>
          <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
              <Th color={"white"}>
                <Text>Название шаблона</Text>
              </Th>
              <Th color={"white"}>
                <Text>Отправлено</Text>
              </Th>
              <Th color={"white"}>
                <Text>Открыто</Text>
              </Th>
              <Th color={"white"}>
                <Text>Перешли по ссылкам</Text>
              </Th>
              <Th color={"white"}>
                <Text>Ответили</Text>
              </Th>
              <Th color={"white"}>
                <Text>Заблокировали</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr color={"black"}>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>Приветственное</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>100</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>50</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>20</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>10</Text>
              </Td>
              <Td border={"1px solid rgba(200,200,200,1)"}>
                <Text>120</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableReport;
