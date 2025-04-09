import {
  Button,
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
import { MdNotStarted } from "react-icons/md";

const TableCalls = () => {
  return (
    <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
      <Thead bg={"#4682B4"} borderBottom={"none"}>
        <Tr borderBottom={"2px solid #4682B4"}>
          <Th color={"white"}>
            <Text>Дата звонка</Text>
          </Th>
          <Th color={"white"}>
            <Text>Звонок</Text>
          </Th>
          <Th color={"white"}>
            <Text>Кампания</Text>
          </Th>
          <Th color={"white"}>
            <Text>Транскрибация</Text>
          </Th>
          <Th color={"white"}>
            <Text>% успеха</Text>
          </Th>
          <Th color={"white"}>
            <Text>Добавить в СРМ</Text>
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
            <MdNotStarted size={"40px"} color="#4682B4" />
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>РК Акция</Text>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Button
              bg={"black"}
              color={"white"}
              _hover={{ bg: "rgba(200,200,200,1)", color: "black" }}
            >
              <Text>Транскрибировать</Text>
            </Button>
          </Td>
          <Td border={"1px solid rgba(200,200,200,1)"}>
            <Text>Диалог состоялся</Text>
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
            <Text>+78005553535</Text>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TableCalls;
