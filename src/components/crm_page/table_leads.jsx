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
import ModalEditLead from "./modal_edit_lead";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

const TableLeads = observer(() => {
  const { pageStore } = useStores();

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
        {pageStore.leads?.length > 0
          ? pageStore.leads?.map((item, index) => (
              <Tr color={"black"} key={index}>
                <Td border={"1px solid rgba(200,200,200,1)"}>
                  <Text>{item?.number}</Text>
                </Td>
                <Td border={"1px solid rgba(200,200,200,1)"}>
                  <Text>{item?.callType}</Text>
                </Td>
                <Td border={"1px solid rgba(200,200,200,1)"}>
                  <Text>{item?.callStatus}</Text>
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
                  <Text>{item?.createDate}</Text>
                </Td>
                <Td border={"1px solid rgba(200,200,200,1)"}>
                  <Text>{item?.responsible}</Text>
                </Td>
                <Td
                  width={"min-content"}
                  border={"1px solid rgba(200,200,200,1)"}
                >
                  <HStack justify={"center"}>
                    <ModalEditLead obj={item} />
                  </HStack>
                </Td>
              </Tr>
            ))
          : null}
      </Tbody>
    </Table>
  );
});

export default TableLeads;
