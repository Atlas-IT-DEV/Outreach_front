import {
  Button,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import ModalEditWork from "./modal_edit_work";

const TableJournal = observer(() => {
  const { pageStore } = useStores();
  return (
    <>
      {pageStore.search_elements?.length > 0 ? (
        <>
          <Text fontWeight={"600"} color={"black"}>
            Результаты поиска
          </Text>
          <HStack
            width={"100%"}
            overflow={"hidden"}
            overflowX={"scroll"}
            paddingBottom={"8px"}
            borderRadius={"8px"}
          >
            <Table
              width={"100%"}
              padding={"10px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
            >
              <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
                <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
                  <Th color={"white"}>
                    <Text>Название</Text>
                  </Th>

                  <Th color={"white"}>
                    <Text>Описание</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>Дата начала</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>Время работы</Text>
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
                  <Th color={"white"}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageStore.search_elements?.map((item, index) => (
                  <Tr color={"black"} key={index}>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.name}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Textarea disabled minW={"200px"}>
                        {item?.description}
                      </Textarea>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>
                        {new Date(item?.date_start).toLocaleDateString()}
                      </Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>
                        С {item?.time_start}:00 до {item?.time_finish}
                        :00
                      </Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Button
                        bg={"black"}
                        color={"white"}
                        _hover={{
                          bg: "rgba(200,200,200,1)",
                          color: "black",
                        }}
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
                      <HStack>
                        <ModalEditWork obj={item} />
                        {/* <ModalDeleteWork obj={item} /> */}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </HStack>
        </>
      ) : pageStore.search_elements.length == 0 &&
        pageStore.searchValue != "" ? (
        <Text color={"black"} fontWeight={"600"} width={"100%"}>
          По Вашему запросу ничего не найдено
        </Text>
      ) : null}
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
        borderRadius={"8px"}
      >
        <Table
          width={"100%"}
          padding={"10px"}
          border={"2px solid rgba(48, 141, 218, 1)"}
        >
          <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
              <Th color={"white"}>
                <Text>Название</Text>
              </Th>

              <Th color={"white"}>
                <Text>Описание</Text>
              </Th>
              <Th color={"white"}>
                <Text>Дата начала</Text>
              </Th>
              <Th color={"white"}>
                <Text>Время работы</Text>
              </Th>
              <Th color={"white"}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageStore.mail_works?.length > 0 &&
              pageStore.mail_works?.map((item, index) => (
                <Tr color={"black"} key={index}>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>{item?.name}</Text>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Textarea disabled minW={"200px"}>
                      {item?.description}
                    </Textarea>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>
                      {new Date(item?.date_start).toLocaleDateString()}
                    </Text>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>
                      С {item?.time_start}:00 до {item?.time_finish}:00
                    </Text>
                  </Td>

                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    {item.approved ? null : <ModalEditWork obj={item} />}

                    {/* <ModalDeleteWork obj={item} /> */}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableJournal;
