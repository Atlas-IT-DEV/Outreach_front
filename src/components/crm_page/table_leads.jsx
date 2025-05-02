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
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import ModalEditLead from "./modal_edit_lead";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import ModalDeleteLead from "./modal_delete_lead";

const TableLeads = observer(() => {
  const { pageStore } = useStores();
  console.log(pageStore.search_elements);

  return (
    <>
      {pageStore.search_elements?.length > 0 ? (
        <VStack width={"100%"} align={"flex-start"} marginTop={"20px"}>
          <Text color={"black"} fontWeight={"600"}>
            Результаты поиска
          </Text>
          <Table
            width={"100%"}
            padding={"10px"}
            border={"2px solid rgba(48, 141, 218, 1)"}
            borderRadius={"8px"}
          >
            <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
              <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
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
              {pageStore.search_elements?.map((item, index) => {
                let parse = JSON?.parse(item?.additions);
                console.log("parse", parse);
                return (
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
                    <Tooltip
                      label={
                        parse?.length > 0 &&
                        parse?.map((item2, index2) => (
                          <Text width={"max-content"} key={index2}>
                            {index2 + 1}. {item2?.key}: {item2?.value}
                          </Text>
                        ))
                      }
                      bg={"rgba(48, 141, 218, 1)"}
                      color={"white"}
                      borderRadius={"10px"}
                      placement="right"
                    >
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        {parse?.length > 1 ? (
                          <>
                            <Text width={"max-content"}>
                              1. {parse[0]?.key}: {parse[0]?.value}
                            </Text>
                            <Text width={"max-content"}>
                              2. {parse[1]?.key}: {parse[1]?.value}
                            </Text>
                          </>
                        ) : (
                          <Text width={"max-content"}>
                            1. {parse[0]?.key}: {parse[0]?.value}
                          </Text>
                        )}
                        {parse.length > 2 ? (
                          <Text fontWeight={"300"} fontSize={"14px"}>
                            Подсказка: наведитесь для отображения полного списка
                          </Text>
                        ) : null}
                      </Td>
                    </Tooltip>

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
                );
              })}
            </Tbody>
          </Table>
        </VStack>
      ) : pageStore.search_elements.length == 0 &&
        pageStore.searchValue != "" ? (
        <Text
          color={"black"}
          fontWeight={"600"}
          width={"100%"}
          marginTop={"20px"}
        >
          По Вашему запросу ничего не найдено
        </Text>
      ) : null}
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
        borderRadius={"8px"}
      >
        <Table
          width={"100%"}
          padding={"10px"}
          border={"2px solid rgba(48, 141, 218, 1)"}
          align={"flex-start"}
        >
          <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
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
              ? pageStore.leads?.map((item, index) => {
                  let parse = JSON?.parse(item.additions);
                  console.log("pasr", parse);
                  return (
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
                      <Tooltip
                        label={parse?.map((item2, index) => (
                          <Text width={"max-content"}>
                            {index + 1}. {item2?.key}: {item2?.value}
                          </Text>
                        ))}
                        bg={"rgba(48, 141, 218, 1)"}
                        color={"white"}
                        borderRadius={"10px"}
                        placement="right"
                      >
                        <Td border={"1px solid rgba(200,200,200,1)"}>
                          {parse.length > 1 ? (
                            <>
                              <Text width={"max-content"}>
                                1. {parse[0].key}: {parse[0].value}
                              </Text>
                              <Text width={"max-content"}>
                                2. {parse[1].key}: {parse[1].value}
                              </Text>
                            </>
                          ) : (
                            <Text width={"max-content"}>
                              1. {parse[0].key}: {parse[0].value}
                            </Text>
                          )}
                          {parse.length > 2 ? (
                            <Text fontWeight={"300"} fontSize={"14px"}>
                              Подсказка: наведитесь для отображения полного
                              списка
                            </Text>
                          ) : null}
                        </Td>
                      </Tooltip>

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
                  );
                })
              : null}
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableLeads;
