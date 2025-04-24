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
import { useEffect } from "react";
import ModalDeleteLead from "./modal_delete_lead";

const TableLeads = observer(() => {
  const { pageStore } = useStores();

  return (
    <>
      {pageStore.search_elements?.length != 0 && (
        <VStack width={"100%"} align={"flex-start"} marginTop={"20px"}>
          <Text color={"black"} fontWeight={"600"}>
            Результаты поиска
          </Text>
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
              {pageStore.search_elements?.length > 0 ? (
                pageStore.search_elements?.map((item, index) => (
                  <Tr color={"black"} key={index}>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.director?.phone ?? "-"}</Text>
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
                            border={"2px solid #4682B4"}
                            borderRadius={"4px"}
                            bg={"#4682B4"}
                          ></Stack>
                          <Stack
                            height={"10px"}
                            width={"100%"}
                            border={"2px solid #4682B4"}
                            borderRadius={"4px"}
                          ></Stack>
                          <Stack
                            height={"10px"}
                            width={"100%"}
                            border={"2px solid #4682B4"}
                            borderRadius={"4px"}
                          ></Stack>
                          <Stack
                            height={"10px"}
                            width={"100%"}
                            border={"2px solid #4682B4"}
                            borderRadius={"4px"}
                          ></Stack>
                        </HStack>

                        <Text>Новый лид</Text>
                      </VStack>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.CreatedAt}</Text>
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
                        <ModalDeleteLead obj={item} />
                      </HStack>
                    </Td>
                  </Tr>
                ))
              ) : pageStore.search_elements.length == 0 &&
                pageStore.searchValue != "" ? (
                <Text color={"black"} fontWeight={"600"}>
                  По Вашему запросу ничего не найдено
                </Text>
              ) : null}
            </Tbody>
          </Table>
        </VStack>
      )}
      <Text
        width={"100%"}
        color={"black"}
        fontWeight={"600"}
        marginTop={"20px"}
      >
        Все данные
      </Text>
      <HStack
        width={"100%"}
        overflow={"hidden"}
        overflowX={"scroll"}
        paddingBottom={"6px"}
      >
        <Table
          width={"100%"}
          padding={"10px"}
          border={"2px solid #4682B4"}
          align={"flex-start"}
        >
          <Thead bg={"#4682B4"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid #4682B4"}>
              <Th color={"white"}>
                <Text>Фамилия</Text>
              </Th>
              <Th color={"white"}>
                <Text>Имя</Text>
              </Th>
              <Th color={"white"}>
                <Text>Email</Text>
              </Th>
              <Th color={"white"}>
                <Text>Номер телефона</Text>
              </Th>
              <Th color={"white"}>
                <Text>Компания</Text>
              </Th>
              <Th color={"white"}>
                <Text>Доп. информация</Text>
              </Th>
              <Th color={"white"}>
                <Text>Создатель</Text>
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
                      <Text>{item?.last_name || "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.first_name || "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.email || "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.phone || "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.company?.name || "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.additions || "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.creator || "-"}</Text>
                    </Td>
                    <Td
                      width={"min-content"}
                      border={"1px solid rgba(200,200,200,1)"}
                    >
                      <HStack justify={"center"}>
                        <ModalEditLead obj={item} />
                        <ModalDeleteLead obj={item} />
                      </HStack>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableLeads;
